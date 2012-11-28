define(['Class'], function()
{
    var DateUtilities = Class.extend(
    {
        init: function()
        {
            this.MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            this.SERVER_TIME = null;
            this.OFFSET = 0;
        },
        setServerTime: function(date)
        {
            this.SERVER_TIME = date;
            this.OFFSET = this.SERVER_TIME.getTime() - new Date().getTime();
        },
        yearsSince: function(date)
        {
            return this.ServerDate().getFullYear() - date.getFullYear();
        },
        monthsSince: function(date)
        {
            var d = this.ServerDate();
            return ((d.getFullYear() - date.getFullYear()) * 12) + (d.getMonth() - date.getMonth());
        },
        daysSince: function(date)
        {
            var d = this.ServerDate();
            var curTime = d.getTime();
            var theTime = date.getTime();
            var aDay = 1000 * 60 * 60 * 24;
            var days = (curTime - theTime) / aDay;
            var daysRemainder = ((curTime - theTime) % aDay) / aDay;
            if (daysRemainder > 0 && (daysRemainder * aDay) > (this.secondsSinceMidnight(d) * 1000)) days++;
            return ~~(days);
        },
        hoursSince: function(date)
        {
            return ~~((this.ServerDate().getTime() - date.getTime()) / (1000 * 60 * 60));
        },
        minutesSince: function(date)
        {
            return ~~((this.ServerDate().getTime() - date.getTime()) / (1000 * 60));
        },
        secondsSince: function(date)
        {
            return ~~((this.ServerDate().getTime() - date.getTime()) / 1000);
        },
        monthName: function(date, full)
        {
            var month = this.MONTHS[date.getMonth()];
            if (!full) return month.substr(0, 3);
            else return month;
        },
        secondsSinceMidnight: function(date)
        {
            var d = new Date(date.getTime());
            this.midnight(d);
            return ~~((date.getTime() - d.getTime()) / 1000);
        },
        midnight: function(date)
        {
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
        },
        minutesUntil: function(date)
        {
            return ~~((date.getTime() - this.ServerDate().getTime()) / (1000 * 60));
        },
        millisecondsUntil: function(date)
        {
            console.log(' media = ' + date.getTime());
            console.log('server = ' + this.ServerDate().getTime());
            return date.getTime() - this.ServerDate().getTime();
        },
        ServerDate: function()
        {
            return new Date(new Date().getTime() + this.OFFSET);
        }
    });
    return DateUtilities;
});