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
function setColSize(length){
  var size = 12;
  if(length==1){size=12}
  else if(length==2){size=6}
  else if(length==3){size=4}
  else if(length==4){size=3}
  else if(length==5){size=2}
  else if(length==6){size=2}
  else {size == 1 }
  return size;
}

function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

function getAllValues(element){
    var inputValues = [];
    var datum = {};
    $(element).find('input').each(function () {
        var type = $(this).attr("type");
        datum = {};
        if ((type == "checkbox" || type == "radio") && this.checked) {
            datum[$(this).next('label').find('span').text().toLowerCase()] = $(this).val();
            inputValues.push(JSON.parse(JSON.stringify(datum)));
        }
        else if (type != "button" || type != "submit") {
            datum[$(this).next('label').find('span').text().toLowerCase()] = $(this).val();
            inputValues.push(JSON.parse(JSON.stringify(datum)));
        }
    });
    return inputValues;
}

var searchForMatches = function searchForMatches(){

        $('.card').show();
        var searchKey = $('.search').find('input').val().toLowerCase();
        var providerCards = $('.card');
        console.log(searchKey);

        if(searchKey.length > 0) {

            for (var i = 0; i < providerCards.length; i++) {
                console.log($(providerCards[i]).attr('data-info'));
                var cardData = JSON.parse($(providerCards[i]).attr('data-info'));
                if(
                    (String(cardData["name"]).toLowerCase().indexOf(searchKey) >= 0 ) ||
                    (String(cardData["description"]).toLowerCase().indexOf(searchKey) >= 0) ||
                    (String(cardData["email"]).toLowerCase().indexOf(searchKey) >= 0) ||
                    (String(cardData["firstName"]).toLowerCase().indexOf(searchKey) >= 0) ||
                    (String(cardData["lastName"]).toLowerCase().indexOf(searchKey) >= 0)
                ){ console.log('Adding search Result: ',cardData); }
                else {
                    console.log('Not Matched: ',cardData);
                    $(providerCards[i]).hide();
                }
            }
        }
    };
    $('body').on('keyup', '.search', searchForMatches);


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
