(function(){
    define(['app/base/Command', 'app/base/Context', 'app/utils/Dictionary'], function(Command, context, Dictionary)
    {
        var AsyncCommand = Command.extend(
        {
            init: function(event)
            {
                this._super(event, context);
                AsyncCommand.commands.addItem(this, true);
            },
            finish: function()
            {
                AsyncCommand.commands.removeItem(this);
            }
        });
        AsyncCommand.commands = new Dictionary();
        return AsyncCommand;
    });
})();
