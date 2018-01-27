var div = function(){return $('<div>')};
var text = function(string,color,size){return div().text(string).css('color',color).css('font-size',size);};
var highlightText = function(text){return $('<span style=\"background: rgba(0,0,0,0.71);\">&nbsp;'+text+'&nbsp;</span>').css('color','white');};
var highlightTextLight = function(text){return $('<span style=\"background:'+transparentWhiteHeavy()+'\">&nbsp;'+text+'&nbsp;</span>');};
var row = function(){return $('<div>').addClass('row').css('margin','0 auto');};
var col = function(colNum){ return  div().addClass('col-xs-'+colNum).addClass('text-center');};

var title = function(htmlText){
    return div().css('letter-spacing','12px').html(htmlText)
        .css('padding-top','25px').css('padding-left','25px').css('color','white').css('font-size','40px').css('font-family','Open Sans Condensed');
};

var subtitle = function (htmlText) {
    return div().css('padding','50px').css('padding-left','25px').css('font-style','italic').css('letter-spacing','4px').html(htmlText)
        .css('color','white').css('font-size','24px').css('font-family','Open Sans Condensed');
};

var button = function(name){
    return $('<div>').addClass('button ghost').css('line-height','40px').css('min-width','100%').css('margin-top','40px').text(name);
};

var buttonCol = function(name,colNum){
    return col(colNum).addClass('button cta').css('letter-spacing','6px').css('text-transform', 'uppercase')
        .css('font-family','Open Sans Condensed').text(name).css('margin',0).css('padding',0)
        .css('max-width','100%').css('height','100%').css('line-height','50px').css('font-size','16px');
};

var input = function (name,type) {
    var type = type || 'text';
    return $('<input>').attr('type',type).attr('placeholder',name).addClass('button ghost').css('max-width','100%').width('100%')
        .css('color','white').css('display','block').css('margin-top','10px').css('margin-bottom','10px').css('padding','10px')
};

var select = function(name,options){
    var sel = $('<select>').height('50px').css('letter-spacing','6px').css('text-transform', 'uppercase')
        .css('font-family','Open Sans Condensed').css('width','100%');
    for(var i in options){
        sel.append($('<option>').html(options[i]));
    }
    return sel;
}

var list = function(array){
    var list = div();
    for(var i in array){
        list.append(div().html(array[i]));
    }
    return list;
};
