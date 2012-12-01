(function(){
    define([], function()
    {
        var Event = Class.extend(
        {
            init: function(type)
            {
                this.type = type;
            }
        });
        Event.prototype.toString = function()
        {
            var str = '';
            for (var a in this)
            {
                if (a != 'toString' && a != 'init' && a != 'constructor' && a != '_super' && a != '_name')
                {
                    str += a + '=' + this[a] + ', ';
                }
            }
            var p = this.__proto__;
            while (!p.constructor._name) { p = p.__proto__; }
            return '[' + p.constructor._name + ': ' + str.substr(0, str.length - 2) + ']';
        };
        Event._name = 'Event';
        return Event;
    });
})();