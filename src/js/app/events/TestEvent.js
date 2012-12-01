(function(){
    define(['app/events/Event'], function(Event)
    {
        var TestEvent = Event.extend(
        {
            init: function(type, message)
            {
                this._super(type);
                this.message = message;
            }
        });
        TestEvent.UPDATE = 'update';
        TestEvent._name = 'TestEvent';
        return TestEvent;
    });
})()