var SettingsNav = function (panels) {
    //for every panel in the Config File, generate a navigation element
    this.navCol = col(3).css('padding','0');
    this.nav = div().css('font-size','16px').css('line-height','100px').css('min-height','400px').css('background',transparentWhiteHeavy()).css('margin-top','15px');
    var self = this;

    for (var key in Config) {
        if (Config.hasOwnProperty(key)) {
            console.log(key);
            self.nav.append(new NavElem(key));
        }
    }

    return this.navCol.append(this.nav);
};

var NavElem = function (key) {
    if(Config[key].name == 'Account'){postJSON('/members/find',{token:Token},function(newData){Config[key].data = newData}); }
    return $('<div>').append($('<div>').text(Config[key].name).css('cursor','pointer').css('width','100%').addClass('hvr-underline-from-left')).click(function(){
        $('.contentPanel').replaceWith(
            new Props(key)
        );
    });
};

var Props = function (key) {
    this.panel = panel().css('padding','10px');
    this.title = div().text(Config[key].name).css('color','white').addClass('propType').attr('data-index',key).css('padding','50px').css('font-size','24px')
        .css('font-family','Open Sans Condensed').css('text-transform','uppercase').css('letter-spacing','10px');
    this.props = div().css('padding','25px');//$('<pre>').addClass('text-left').text(JSON.stringify(Config[name], null, '\t'));
    var self = this;
    console.log(Config);
    console.log(key);
    console.log(Config[key]);
    var pathName = '';
    iterate(Config[key].data,0,pathName);

    function iterate(obj,count,pathName) {
        var count = count || 0;
        console.log('count'+count);
        for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
                if (obj[property] instanceof Array && obj[property].length>0) {
                    var propertyString = property;
                    propertyString = '.'+propertyString;
                    self.props.append(new ArrayTitle(property,pathName+propertyString,obj[property][0]));
                    iterate(obj[property],count,pathName+propertyString);
                }
                else if (typeof obj[property] == "object") {
                    self.props.append(new PropTitle(property));
                    var propertyString = property;
                    propertyString = '.'+propertyString;
                    iterate(obj[property],count,pathName+propertyString);
                }
                else {
                    console.log(property + "   " + obj[property]);
                    self.props.append(new Property(property,obj[property],count,pathName));
                    count+=1;
                }
            }
        }
    }

    return this.panel.append(
        this.title,
        this.props
    );
};

function capitalize(s) { return s[0].toUpperCase() + s.slice(1);}

var ArrayTitle = function (key,path,prototype) {
    this.titleRow = row().css('margin','10px').css('height','50px').css('background',transparentWhite());
    this.title = text(key,'black','26px').addClass('propTitle text-left').css('padding','5px').css('text-transform','capitalize');
    if(key.charAt( key.length-1 ) == "s" && key.charAt( key.length-2 ) != "s" ) {
        key = key.slice(0, -1)
    }
    this.addButton = buttonCol(' Add new '+capitalize(key),'<i class="fa fa-plus">',4,function () {
        var configSection = $('body').find('.propType').attr('data-index');
        $('.contentPanel').replaceWith(
            new ProtoForm(key,configSection,path,prototype)
        );
    });

    return this.titleRow.append(
        col(4).append(this.title),
        col(4),this.addButton
    );
};

var ProtoForm = function (key,configSection,path,prototype) {
    this.protoForm = panel();
    this.inputs = div();

    this.submit = button('Submit new '+key).css('font-size','18px').css('margin','0').css('max-width','100%').addClass('cta text-center').width('100%').click(function(){
        var inputs = $('input');
        var inputObject = {};
        $.each(inputs,function () { inputObject[ $(this).attr('placeholder') ] = $(this).val(); });
        var pathName = path.substring(1);
        console.log(pathName);

        var fullPath = configSection+'.data.'+pathName;
        console.log(fullPath);

        var configName = Config[configSection].name;
        var existingData = _.find(Config,{name:configName}).data[pathName];
        existingData.push(inputObject);

        _.set(Config,fullPath.split('.'),existingData);
        var parentTitle = Config[configSection].name;

        var data = {
            parentTitle:parentTitle,
            key:key,newConfig:Config,parentIndex:configSection,token:Token
        };
        console.log(data);

        $.post('/settings/update',data,function (data) {
            swal.resetDefaults();
            swal({title:data.message,type:'success',timer:2000});

            $('.contentPanel').replaceWith(
                new Props(configSection)
            );
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

var PropTitle = function (key) {
    return text(key,'black','26px').addClass('propTitle text-left').css('background',transparentWhite()).css('margin','10px').css('padding','5px').css('text-transform','capitalize');
};

var PrivateProperty = function(key,value,idNumber,pathName){

    this.prop = row().addClass('.propertyRow').attr('id',idNumber).attr('data-path',pathName);
    this.key = col(6).css('margin-top','40px').append(highlightTextLight(key+':&nbsp;').css('font-size','20px')).removeClass('text-center').addClass('text-left');
    this.value = col(6).css('margin-top','40px').append(text(value,'black','18px')).removeClass('text-center').addClass('text-left');

    return this.prop.append(this.key,this.value)
};

var Property = function(key,value,idNumber,pathName){

    this.prop = row().addClass('.propertyRow').attr('id',idNumber).attr('data-path',pathName);
    this.key = col(4).css('margin-top','40px').append(highlightText(key+' :&nbsp;').css('font-size','20px').css('color','white')).removeClass('text-center').addClass('text-left');
    this.value = col(6).css('margin-top','40px').append(text(value,'black','18px')).removeClass('text-center').addClass('text-left');

    this.edit = col(2).removeClass('text-center').addClass('text-right').append(button('Edit').css('color','white').addClass('text-center').css('min-width','50px').click(function () {
        console.log($('body').find(this).parent().parent());
        $('body').find(this).parent().parent().replaceWith(new EditProperty(key,value,idNumber,pathName));
    }));

    return this.prop.append(this.key,this.value,this.edit)
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

var EditProperty = function(key,value,idNumber,pathName,SaveData){
    this.prop = row().attr('id',idNumber).attr('data-path',pathName);
    this.key = col(3).css('margin-top','40px').append(highlightText(key+' :&nbsp;').css('font-size','20px').css('color','white')).removeClass('text-center').addClass('text-left');
    var inputType = $('<input>').addClass('button ghost').attr('value',value).css('font-size','18px').css('margin','0');
    var saveClick = function () {

        var thisButton = $('body').find(this);
        var parentProp = thisButton.parent().parent();
        console.log(parentProp);
        var inputVal = parentProp.find('input').val();
        console.log(inputVal);

        var configSection = $('body').find('.propType').attr('data-index');
        var pathName = parentProp.attr('data-path').substring(1);
        console.log(pathName);

        var fullPath = '';

        if(pathName){fullPath = (configSection+'.data.'+pathName+'.'+key) }
        else{ fullPath = (configSection+'.data.'+key) }


        _.set(Config,fullPath.split('.'),inputVal);
        console.log(Config);
        var parentTitle = Config[configSection].name;
        console.log(parentTitle);

        var data = {
            parentTitle:parentTitle,
            key:key,
            newConfig:JSON.stringify(Config),
            parentIndex:configSection,
            token:Token
        };
        console.log(data);

        $.post('/'+panelTitle+'/update',data,function (response) {
            console.log(response);
        });
        $('body').find(this).parent().parent().replaceWith(new Property(key,inputVal));

    };

    if(/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg)$/.test(value)){
        inputType = input(value,'file').attr('value',value).attr('name','file');
        saveClick = function(){
            var thisButton = $('body').find(this);
            var parentProp = thisButton.parent().parent();
            console.log(parentProp);
            var inputVal = parentProp.find('input').get(0).files[0];
            console.log(inputVal);
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

                    var inputVal = 'public/uploads/'+JSON.parse(data).filename;
                    var configSection = $('body').find('.propType').attr('data-index');
                    var fullPath = '';
                    if(pathName){fullPath = (configSection+'.data.'+pathName+'.'+key) }
                    else{ fullPath = (configSection+'.data.'+key) }

                    _.set(Config,fullPath.split('.'),inputVal);
                    console.log(Config);
                    var parentTitle = Config[configSection].name;

                    var requestData = {
                        parentTitle:parentTitle,
                        key:key,
                        newConfig:JSON.stringify(Config),
                        parentIndex:configSection,
                        token:Token
                    };
                    console.log(requestData);
                    $.post('/settings/update',requestData,function (response) {
                        console.log(response);
                    });
                    parentProp.replaceWith(new Property(key,inputVal));

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

    this.save = col(2).removeClass('text-center').addClass('text-right').append(button('Save').removeClass('ghost').addClass('cta').addClass('text-center').css('min-width','50px').click(saveClick));

    return this.prop.append(this.key,this.value,this.save)
};
