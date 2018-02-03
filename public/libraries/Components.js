var div = function(){return $('<div>')};
var text = function(string,color,size){return div().text(string).css('color',color).css('font-size',size);};
var highlightText = function(text){return $('<span style=\"background: rgba(0,0,0,0.71);\">&nbsp;'+text+'&nbsp;</span>').css('color','white');};
var highlightTextLight = function(text){return $('<span style=\"background:'+transparentWhiteHeavy()+'\">&nbsp;'+text+'&nbsp;</span>');};
var row = function(){return $('<div>').addClass('row').css('margin','0 auto');};
var col = function(colNum){ return  div().addClass('col-xs-'+colNum).addClass('text-center');};
var icon = function(icon){return $('<i>').addClass('fa fa-'+icon)};
var panel = function(){return div().addClass('contentPanel animated fadeIn').css('overflow','auto').css('padding','100px').css('padding-top','25px');}

var title = function(htmlText){
    return div().css('letter-spacing','12px').html(htmlText)
        .css('padding-top','25px').css('padding-left','25px').css('color','white').css('font-size','40px').css('font-family','Open Sans Condensed');
};

var subtitle = function (htmlText) {
    return div().css('padding','50px').css('padding-left','25px').css('font-style','italic').css('letter-spacing','4px').html(htmlText)
        .css('color','white').css('font-size','24px').css('font-family','Open Sans Condensed');
};

var panelTitle = function(name){
    var appName = row().css('color','black').css('line-height','60px').css('padding','10px').css('background-color',transparentWhiteHeavy()).css('margin-bottom','10px');
    return appName.append(
        div().width('100%').addClass('text-center').text(name).css('font-size','24px').css('letter-spacing','8px')
            .css('text-transform', 'uppercase').css('display','inline-block').css('font-family','Open Sans Condensed')
    );
};

var button = function(name){
    return $('<div>').addClass('button ghost').css('line-height','40px').css('min-width','100%').css('margin-top','40px').text(name);
};

var buttonCol = function(name,colNum){
    this.bCol = col(colNum);
    if(name){this.bCol.text(name||'.')}
    return this.bCol.addClass('button cta').css('letter-spacing','6px').css('text-transform', 'uppercase')
        .css('font-family','Open Sans Condensed').css('margin',0).css('padding',0)
        .css('max-width','100%').css('height','100%').css('line-height','50px').css('font-size','16px');
};

var dimensionalPanel = function() {
    return div().css('position', 'absolute').addClass('facePanel').css('background', transparentWhite())
        .css('padding', '10px').css('margin', '10px').css('min-height', '600px').css('width', '95%');
};

var dimensionalWindow = function(perspective){
    return div().css('transform-style','preserve-3d').css('perspective', perspective || '50em');
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

var siteBar = function (name,buttonName,click) {
    buttonName = buttonName || 'Logout';
    click = click || function(){
            sessionStorage.setItem('token',null);
            sessionStorage.setItem('folder',null);
            swal({title:'Logged out',type:'success',onClose:function(){
                var S = new Signup();
            }});
        };
    var appName = row().css('line-height','75px').height('80px');
    var logoutButton = buttonCol(buttonName,'','1').height('100%').css('line-height','75px').click(click);
    var styledText = div().addClass('appName col-xs-3').text(name).css('font-size','26px').css('color','black').css('letter-spacing','10px')
        .css('text-transform', 'uppercase').css('display','inline-block').css('font-family','Open Sans Condensed').height('100%').css('background-color',transparentWhiteHeavy());

    return appName.append(
        styledText,
        col('8').height('100%').css('background-color',transparentWhiteHeavy()),
        logoutButton
    );
};
