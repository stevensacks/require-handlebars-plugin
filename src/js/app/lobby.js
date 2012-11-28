require(['jquery', 'underscore', 'hbs', 'hbs!template/one', 'app/views/ChildView'], function($, _, hbs, template, ChildView) {
    $(function() {
        $('body')
            .append($('<div/>').text('jquery: ' + $().jquery))
            .append($('<div/>').text('underscore: ' + _.VERSION))
            .append($('<div/>').text('hbs: ' + hbs.version));
        var cv = new ChildView();
        $('#container').html(
            template({
                adjective : 'most awesome',
                listofstuff : ['apples', 'ice cream', 'rocket science']
            })
        );
    });
});