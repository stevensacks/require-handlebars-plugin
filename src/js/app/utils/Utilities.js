define(['app/utils/DateUtilities','app/utils/Random'], function(DateUtilities, Random)
{
    var Utilities = Class.extend(
    {
        init: function()
        {
            this.DateUtils = new DateUtilities();
            this.Rndm = new Random();
        },
        commafy: function(value)
        {
            value = String(value);
            return value.replace(/(^|[^\w.])(\d{4,})/g, function($0, $1, $2) {
                return $1 + $2.replace(/\d(?=(?:\d\d\d)+(?!\d))/g, '$&,');
            });
        },
        formatTime: function(secs, leadingZero)
        {
            if (isNaN(secs)) return (leadingZero ? '0' : '') + '0:00';
            secs = Math.ceil(secs);
            var h = String(~~(secs / 60 / 60));
            var m;
            if (h != '0')
            {
                m = String(~~(secs / 60) - (Number(h) * 60));
                leadingZero = true;
            }
            else m = String(~~(secs / 60));
            if (m.length == 1) m = (leadingZero ? '0' : '') + m;
            var s = String(secs % 60);
            if (s.length == 1) s = '0' + s;
            if (h == '0') return m + ':' + s;
            else return h + ':' + m + ':' + s;
        },
        getSecondsElapsed: function(value)
        {
            if (!value) return 0;
            return this.DateUtils.secondsSince(new Date(Number(value.substr(0, value.indexOf(',')))));
        },
        toHex:function (value)
        {
            var hex = value.toString(16).toUpperCase();
            return '0x' + String('00000000').substr(0, 8 - hex.length) + hex;
        },
        convertNumberStringToUnixDateString: function(value)
        {
            var spl = value.split(',');
            var date = new Date(Number(spl[0]));
            var micro = spl[1] || '0';
            if (micro.length == 10) micro = micro.substr(4);
            var month = String(date.getMonth() + 1);
            if (month.length == 1) month = '0' + month;
            var day = String(date.getDate());
            if (day.length == 1) day = '0' + day;
            var hour = String(date.getHours());
            if (hour.length == 1) hour = '0' + hour;
            var min = String(date.getMinutes());
            if (min.length == 1) min = '0' + min;
            var sec = String(date.getSeconds());
            if (sec.length == 1) sec = '0' + sec;
            if (!(month == 'NaN' || day == 'NaN' || hour == 'NaN' || min == 'NaN' || sec == 'NaN')) return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec + '.' + micro;
            return '0';
        },
        convertUnixDateStringToNumberString: function(value)
        {
            try
            {
                if (value)
                {
                    var date = new Date(value.substr(0, 4), Number(value.substr(5, 2)) - 1, value.substr(8, 2), value.substr(11, 2), value.substr(14, 2), value.substr(17, 2));
                    var dstr = String(date.getTime());
                    var zstr = '000000';
                    var micro = value.substr(20, 6);
                    zstr = zstr.substr(micro.length, 6) + micro;
                    return dstr + ',0000' + zstr;
                }
            }
            catch (e) { console.log('ConvertUnixDate', e); }
            return '0';
        },
        convertUnixDateStringToDate: function(value)
        {
            if (value) return new Date(value.substr(0, 4), Number(value.substr(5, 2)) - 1, value.substr(8, 2), value.substr(11, 2), value.substr(14, 2), value.substr(17, 2));
            return null;
        },
        convertDateToNumberString: function(value)
        {
            if (!value) return '0';
            var month = String(value.getMonth() + 1);
            if (month.length == 1) month = '0' + month;
            var day = String(value.getDate());
            if (day.length == 1) day = '0' + day;
            var hour = String(value.getHours());
            if (hour.length == 1) hour = '0' + hour;
            var min = String(value.getMinutes());
            if (min.length == 1) min = '0' + min;
            var sec = String(value.getSeconds());
            if (sec.length == 1) sec = '0' + sec;
            return value.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec + '.000000';
        },
        getSimpleTimestamp: function()
        {
            return this.convertDateToNumberString(new Date()).split('.').shift().split(' ').pop();
        },
        getChatTimestamp: function(is24)
        {
            var value = new Date();
            var min = String(value.getMinutes());
            if (min.length == 1) min = '0' + min;
            var ts, hour;
            if (is24)
            {
                hour = String(value.getHours());
                if (hour.length == 1) hour = '0' + hour;
                ts = hour + ':' + min;
            }
            else
            {
                var ampm = 'am';
                var hour = value.getHours();
                if (hour > 12)
                {
                    hour = hour - 12;
                    ampm = 'pm';
                }
                else if (hour == 0) hour = 12;
                ts = hour + ':' + min + ampm;
            }
            return ts;
        },
        convertTimestampToReadableDate:function (value, ago)
        {
            var timestamp = Number(value.split(',')[0]);
            var date = new Date(timestamp);
            var months = this.DateUtils.monthsSince(date);
            var days = this.DateUtils.daysSince(date);
            var result = '';
            var space = Models.user.data.language != 'ja' && Models.user.data.language.indexOf('zh') == -1 ? ' ' : '';
            if (months > 1 || (months == 1 && days >= 30))
            {
                if (months > 1) result = Lang.history.months;
                else result = Lang.history.month;
                result = months + space + result;
                if (ago) return Lang.history.ago.split('%TIME%').join(result);
                else return result;
            }
            var hours = this.DateUtils.hoursSince(date);
            if (days > 1 || (days == 1 && hours >= 24))
            {
                if (days > 1) result = Lang.history.days;
                else result = Lang.history.day;
                result = days + space + result;
                if (ago) return Lang.history.ago.split('%TIME%').join(result);
                else return result;
            }
            var minutes = this.DateUtils.minutesSince(date);
            if (hours > 1 || (hours == 1 && minutes >= 60))
            {
                if (hours > 1) result = Lang.history.hours;
                else result = Lang.history.hour;
                result = hours + space + result;
                if (ago) return Lang.history.ago.split('%TIME%').join(result);
                else return result;
            }
            var seconds = Math.max(this.DateUtils.secondsSince(date), 0);
            if (minutes > 1 || (minutes == 1 && seconds >= 60))
            {
                if (minutes > 1) result = Lang.history.minutes;
                else result = Lang.history.minute;
                result = minutes + space + result;
                if (ago) return Lang.history.ago.split('%TIME%').join(result);
                else return result;
            }
            if (seconds > 1) result = Lang.history.seconds;
            else result = Lang.history.second;
            result = seconds + space + result;
            if (ago) return Lang.history.ago.split('%TIME%').join(result);
            return result;
        },
        validateIncomingURL:function(value)
        {
            if (value)
            {
                var result;
                if (value.indexOf('youtube.com') > -1 && value.indexOf('v=') > -1) result = this.cleanYouTubeURL(value);
                else if (value.indexOf('youtu.be') > -1) result = this.cleanYouTubeURL('http://www.youtube.com/watch?v=' + value.split('/').pop());
                else if (value.indexOf('soundcloud.com') > -1) result = value;
                if (!result) return null;
                if (result.indexOf('#') == -1) return result;
                else return String(result.split('#')[0]);
            }
            return null;
        },
        cleanYouTubeURL: function(value)
        {
            return value.replace(/(.+?)[\#\!|\?].*?v=(.+?)(\&.*|\Z)/, '$1?v=$2');
        },
        cleanString: function(value)
        {
            return value.replace(/[\u25c4]/g, '');
        },
        cleanTypedString: function(value)
        {
            return value.split('<').join('&lt;').split('>').join('&gt;');
        },
        authorTitle: function(value)
        {
            if (value)
            {
                var author = '';
                var title = value;
                var idx = value.indexOf(' - ');
                if (idx > -1)
                {
                    author = value.substr(0, idx);
                    title = value.substr(idx + 3);
                }
                else
                {
                    idx = value.indexOf('-');
                    if (idx > -1)
                    {
                        author = value.substr(0, idx);
                        title = value.substr(idx + 1);
                    }
                    else
                    {
                        idx = value.indexOf(' "');
                        if (idx > -1)
                        {
                            var cidx = value.indexOf('"', idx + 2);
                            if (cidx > -1)
                            {
                                author = value.substr(0, idx);
                                title = value.substring(idx + 2, cidx);
                            }
                        }
                    }
                }
                author = this.cleanString(author);
                title = this.cleanString(title);
                return {author:author, title:title};
            }
            return {author:null, title:null};
        },
        clone: function(obj)
        {
            var copy = {};
            for (var a in obj)
            {
                copy[a] = obj[a];
            }
            return copy;
        },
        deserializeModified: function(item)
        {
            item.modified = this.convertUnixDateStringToNumberString(item.modified);
        },
        deserializeHistoryItem: function(item)
        {
            item.timestamp = this.convertUnixDateStringToNumberString(item.timestamp);
            item.cid = item.id;
        },
        serializeMediaItems: function(items)
        {
            var result = [];
            var len = items.length;
            var hash = {};
            for (var i = 0; i < len; ++i)
            {
                if (items[i].id)
                {
                    if (!hash[items[i].id])
                    {
                        hash[items[i].id] = true;
                        result.push(items[i].id);
                    }
                }
                else result.push({id:0, format:items[i].format, cid:items[i].cid, author:items[i].author, title:items[i].title, image:items[i].image, duration:items[i].duration});
            }
            return result;
        },
        quadEaseOut: function(t, b, c, d)
        {
            t /= d;
            return -c * t * (t - 2) + b;
        },
        quadEaseIn: function(t, b, c, d)
        {
            t /= d;
            return c * t * t + b;
        },
        randomizeArray: function(array)
        {
            var c = [].concat(array);
            this.Rndm.newSeed();
            try
            {
                var m = c.length - 1;
                var i = m + 1;
                while (--i)
                {
                    var j = this.Rndm.integer(0, i + 1);
                    if (j > m) j = m;
                    var tI = c[i];
                    var tJ = c[j];
                    c[i] = tJ;
                    c[j] = tI;
                }
                return c;
            }
            catch (e)
            {
                return this.randomizeArray(array);
            }
        },
        hexToRGB: function(hex)
        {
            if (hex[0]=='#') hex=hex.substr(1);
            if (hex.length==3)
            {
                var temp=hex; hex='';
                temp = /^([a-f0-9])([a-f0-9])([a-f0-9])$/i.exec(temp).slice(1);
                for (var i=0;i<3;i++) hex+=temp[i]+temp[i];
            }
            var triplets = /^([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/i.exec(hex).slice(1);
            return {
                red:   parseInt(triplets[0],16),
                green: parseInt(triplets[1],16),
                blue:  parseInt(triplets[2],16)
            }
        },
        pointWithinRect: function(point, rect)
        {
            return (point.x >= rect.x && point.y >= rect.y && point.x < rect.x + rect.w && point.y <= rect.y + rect.h);
        },
        forceRefresh: function()
        {
            window.location.reload();
        },
        getParameterByName: function(name)
        {
            var results = new RegExp('[\\?&]' + name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]') + '=([^&#]*)').exec(window.location.search);
            if(results == null) return '';
            else return decodeURIComponent(results[1].replace(/\+/g,' '));
        }
    });
    return Utilities;
});