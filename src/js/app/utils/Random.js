define(['Class'], function()
{
    var Random = Class.extend(
    {
        init: function()
        {
            this.newSeed();
        },
        newSeed: function()
        {
            this.seed = ~~(Math.random() * 0x7FFFFFFE);
        },
        double: function()
        {
            return (this.gen() / 2147483647);
        },
        integer: function(min, max)
        {
            min -= .4999;
            max += .4999;
            return Math.round(min + ((max - min) * this.double()));
        },
        float: function(min, max)
        {
            return min + ((max - min) * this.double());
        },
        gen: function()
        {
            return this.seed = (this.seed * 16807) % 2147483647;
        }
    });
    return Random;
});