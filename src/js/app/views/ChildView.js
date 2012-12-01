(function(){
    define(['app/views/TestView', 'app/utils/Random'], function(TestView, Random)
    {
        var ChildView = TestView.extend(
        {
            init: function()
            {
                this._super();
                this.Rndm = new Random();
                console.log('ChildView Instantiated');
                console.log('integer = ' + this.Rndm.integer(1, 100));
                console.log('integer = ' + this.Rndm.integer(1, 100));
            }
        });
        return ChildView;
    });
})();