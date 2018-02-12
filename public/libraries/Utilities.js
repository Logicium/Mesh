String.prototype.trunc = String.prototype.trunc ||
    function(n){
        return (this.length > n) ? this.substr(0, n-1) + '&hellip;' : this;
    };

function camelCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
}

function split( val ) {
   return val.split( /,\s*/ );
 }

function extractLast( term ) {
    return split( term ).pop();
}

function syncJSON(i_url,callback) {
    $.ajax({
        type: "GET",
        async: false,
        url: i_url,
        contentType: "application/json",
        dataType: "json",
        success: function (msg) { callback(msg) },
        error: function (msg) { alert('error : ' + msg.d); }
    });
}

function postJSON(i_url,data,callback) {
    $.ajax({
        type: "POST",
        async: false,
        data:data,
        url: i_url,
        //contentType: "application/json",
        dataType: "json",
        success: function (msg) { callback(msg) },
        error: function (msg) { alert('error : ' + msg.d); }
    });
}
