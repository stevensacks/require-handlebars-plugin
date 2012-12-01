(function(){
    define(['app/base/AsyncCommand', 'underscore', 'jquery'], function(AsyncCommand, _, $)
    {
        var TestCommand = AsyncCommand.extend(
        {
            execute: function()
            {
                _.delay(_.bind(this.finish, this), 500);
            },
            finish: function()
            {
                $('#container').html('<br/><br/>' + this.event);
                this._super();
            }
        });
        return TestCommand;
    });
})();