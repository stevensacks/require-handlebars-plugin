define([], function()
{
    var RPCGateway = function(url)
    {
        this.url = url
        if (this.url.charAt(this.url.length - 1) != '/') this.url += '/';
    };
    RPCGateway.prototype.execute = function(name, responder)
    {
        var data = Array.prototype.slice.call(arguments).slice(2);
        $.ajax({
            url: this.url + name.replace(/\//g, '_'),
            type: 'POST',
            data: JSON.stringify({
                service: name,
                body: data
            }),
            async: this.async,
            dataType: 'json',
            contentType: 'application/json',
            success: function(data, textStatus, jqXHR)
            {
                if (data.status == 999)
                {
                    if (!responder)
                    {
                        console.log('RPC returned a fault status but there was no responder', data);

                        return;
                    }

                    responder.onFault(data.body);

                    return;
                }

                // success!
                if (!responder)
                    return;

                responder.onResult({
                    status: data.status,
                    data: data.body
                });
            },
            error: function(jqXHR, textStatus, errorThrown)
            {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    };
    return RPCGateway;
});