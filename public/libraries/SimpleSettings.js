var PrivateProperty = function(key,value,idNumber,pathName){

    this.prop = row().addClass('.propertyRow').attr('id',idNumber).attr('data-path',pathName);
    this.key = col(6).css('margin-top','40px').append(highlightTextLight(key+':&nbsp;').css('font-size','20px')).removeClass('text-center').addClass('text-left');
    this.value = col(6).css('margin-top','40px').append(text(value,'black','18px')).removeClass('text-center').addClass('text-left');

    return this.prop.append(this.key,this.value)
};

var PropertyTall = function(key,value,idNumber,pathName){

    this.prop = row().addClass('.propertyRow').attr('id',idNumber).attr('data-path',pathName);
    this.key = div().css('margin-top','40px').append(highlightText(key+' :&nbsp;').css('font-size','20px').css('color','white')).removeClass('text-center').addClass('text-left');
    this.value = div().css('margin-top','15px').append(text(value,'black','18px')).removeClass('text-center').addClass('text-left');

    this.edit = div().width('100%').append(button('Edit').css('color','white').addClass('text-center').css('margin-top','15px').click(function () {
        console.log($('body').find(this).parent().parent());
        $('body').find(this).parent().parent().replaceWith(new EditPropertyTall(key,value,idNumber,pathName));
    }));

    return this.prop.append(this.key,this.value,this.edit)
};

var SimpleArrayTitle = function (key,path,prototype) {
    this.titleRow = row().css('margin','10px').css('height','50px').css('background',transparentWhite());
    this.title = text(key,'black','26px').addClass('propTitle text-left').css('padding','5px').css('text-transform','capitalize');
    if(key.charAt( key.length-1 ) == "s" && key.charAt( key.length-2 ) != "s" ) {
        key = key.slice(0, -1)
    }
    this.addButton = buttonCol(' Add new '+capitalize(key),'6').click(function () {
        var configSection = $('body').find('.propType').attr('data-index');
        $('.eastNavi').replaceWith(new SimpleProtoForm(key,configSection,path,prototype));
    });

    return this.titleRow.append(
        col(6).append(this.title),
        this.addButton
    );
};

var SimpleProtoForm = function (key,configSection,path,prototype) {
    this.protoForm = panel();
    this.inputs = div();

    this.submit = button('Submit new '+key).css('font-size','18px').css('margin','0').css('max-width','100%').addClass('cta text-center').width('100%').click(function(){
        var SaveData = JSON.parse($('.eastNavi').attr('data-objectdata'));
        var panelTitle = $('.northNavi').text().replace(/ /g,'').toLowerCase();
        var inputs = $('input');
        var inputObject = {};
        $.each(inputs,function () { inputObject[ $(this).attr('placeholder') ] = $(this).val(); });
        var pathName = path.substring(1);
        var fullPath = pathName;
        console.log(fullPath);
        var existingData = SaveData[pathName];
        existingData.push(inputObject);
        _.set(SaveData,fullPath.split('.'),existingData);
        var data = { objectData:SaveData, token:Token };
        $.post('/'+panelTitle+'/update',data,function (response) {
            swal.resetDefaults();
            swal({title:response.message,type:response.type,timer:2000});
            $('.eastNavi').replaceWith(new DetailCard(SaveData));
        });
    });

    for(var k in prototype){
        this.inputs.append(new input(k))
    }

    return this.protoForm.append(
        this.inputs,
        this.submit
    )

};

var EditPropertyTall = function(key,value,idNumber,pathName){
    this.prop = row().attr('id',idNumber).attr('data-path',pathName);
    this.key = div().css('margin-top','40px').append(highlightText(key+' :&nbsp;').css('font-size','20px').css('color','white')).addClass('text-left').width('100%');
    var inputType = $('<input>').addClass('button ghost').attr('value',value).css('font-size','18px').css('margin','0');
    var saveClick = function () {
        var SaveData = JSON.parse($('.eastNavi').attr('data-objectdata'));
        var panelTitle = $('.northNavi').text().replace(/ /g,'').toLowerCase();
        var thisButton = $('body').find(this);
        var parentProp = thisButton.parent().parent();
        var inputVal = parentProp.find('input').val();
        var pathName = parentProp.attr('data-path').substring(1);
        var fullPath = ( pathName ? (pathName+'.'+key) : (key) );
        _.set(SaveData,fullPath.split('.'),inputVal);
        var data = { objectData:SaveData, token:Token };
        $.post('/'+panelTitle+'/update',data,function (response) { console.log(response); });
        parentProp.replaceWith(new PropertyTall(key,inputVal));
    };

    if(/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(value)){
        inputType = input(value,'file').attr('value',value).attr('name','file');
        saveClick = function(){
            var thisButton = $('body').find(this);
            var parentProp = thisButton.parent().parent();
            var inputVal = parentProp.find('input').get(0).files[0];
            var formData = new FormData();
            formData.append('file',inputVal);
            //formData.append('token',JSON.stringify({token:Token}));
            $.ajax({
                url:'/settings/upload',
                type: 'POST',
                data:formData,
                processData: false,
                contentType: false,
                success:function(data){
                    swal.resetDefaults();
                    swal({title:JSON.parse(data).message,type:JSON.parse(data).type});
                    var SaveData = JSON.parse($('.eastNavi').attr('data-objectdata'));
                    var panelTitle = $('.northNavi').text().replace(/ /g,'').toLowerCase();
                    var inputVal = 'public/uploads/'+JSON.parse(data).filename;
                    var pathName = parentProp.attr('data-path').substring(1);
                    var fullPath = ( pathName ? (pathName+'.'+key) : (key) );
                    _.set(SaveData,fullPath.split('.'),inputVal);
                    var updateData = { objectData:SaveData, token:Token};
                    $.post('/'+panelTitle+'/update',updateData,function (response) { console.log(response); });
                    parentProp.replaceWith(new PropertyTall(key,inputVal));
                }
            });
        }
    }

    if (isDate(value) ){
        inputType = input(value).focusin(function () {$(this).attr('type','date')}).focusout(function () {$(this).attr('type','text')});
    }

    this.value = col(7).css('margin-top','40px').removeClass('text-center').addClass('text-left').append(
        inputType
    );

    var self = this;

    this.save = div().removeClass('text-center').addClass('text-right').append(button('Save').removeClass('ghost').addClass('cta').addClass('text-center').click(saveClick));

    return this.prop.append(this.key,this.value,this.save);
}

var isDate = function(date) {
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
};
