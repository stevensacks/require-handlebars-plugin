(function(){
    define(['underscore', 'backbone', 'app/base/CommandMap', 'app/commands/TestCommand', 'app/events/TestEvent'], function(_, Backbone, CommandMap, TestCommand, TestEvent)
    {
        var context = _.clone(Backbone.Events);
        var commandMap = new CommandMap(context);
        context.commandMap = commandMap;
        context.startup = function()
        {
            commandMap.mapEvent(TestEvent.UPDATE, TestCommand, TestEvent);
        };
        context.dispatch = function(event)
        {
            this.trigger(event.type, event);
        };
        return context;
    })
})();