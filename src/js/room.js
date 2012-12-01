(function(){
    require(['Class', 'jquery', 'underscore', 'backbone', 'hbs', 'app/base/Context', 'app/events/TestEvent'], function(c, $, _, Backbone, hbs, context, TestEvent) {
        $(function() {
            $('body')
                .append($('<div/>').text('jquery: ' + $().jquery))
                .append($('<div/>').text('backbone: ' + Backbone.VERSION))
                .append($('<div/>').text('underscore: ' + _.VERSION))
                .append($('<div/>').text('hbs: ' + hbs.version))
                .append($('<div/>').attr('id', 'container'));
            context.startup();
            context.dispatch(new TestEvent(TestEvent.UPDATE, 'hello world'));
        });
    });
})();