(function(){
    define(['app/base/Context'], function(context)
    {
        var Command = Class.extend(
        {
            init: function(event)
            {
                this.event = event;
                this.context = context;
            },
            dispatch: function(event)
            {
                this.context.dispatch(event);
            },
            execute: function() {}
        });
        return Command;
    });
})();
