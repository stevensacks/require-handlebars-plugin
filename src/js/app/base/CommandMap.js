(function(){
    define(['underscore', 'app/utils/Dictionary'], function(_, Dictionary)
    {
        var CommandMap = Class.extend(
        {
            init: function(context)
            {
                this.context = context;
                this.eventTypeMap = {};
                this.commandClassMap = new Dictionary();
            },
            mapEvent: function(type, commandClass, eventClass)
            {
                if (type && commandClass && eventClass)
                {
                    if (!this.eventTypeMap[type]) this.eventTypeMap[type] = [];
                    if (!_.contains(this.eventTypeMap[type], commandClass))
                    {
                        this.eventTypeMap[type].push(commandClass);
                        this.commandClassMap.addItem(commandClass, eventClass);
                        if (this.eventTypeMap[type].length == 1) this.context.on(type, _.bind(this.execute, this));
                    }
                }
            },
            unmapEvent: function(type, commandClass, eventClass)
            {
                if (this.eventTypeMap[type])
                {
                    this.eventTypeMap[type] = _.without(this.eventTypeMap[type], commandClass);
                    if (this.eventTypeMap[type].length == 0)
                    {
                        this.eventTypeMap[type] = undefined;
                        this.commandClassMap.removeItem(commandClass, eventClass);
                        this.context.off(type);
                    }
                }
            },
            execute: function(event)
            {
                var self = this;
                if (this.eventTypeMap[event.type])
                {
                    _.each(this.eventTypeMap[event.type], function(commandClass)
                    {
                        if (event instanceof self.commandClassMap.getItem(commandClass)) new commandClass(event).execute();
                    })
                }
            }
        });
        return CommandMap;
    });
})();