var Search = function(){
  this.searchPanel = $('<div>').addClass('toolPanel col-xs-8 animated fadeInUp').css('padding-left','15px').css('padding-right','15px').css('margin-top','15px');
  this.searchPanel.height('125').css('width','100%');
  this.searchPanel.css('background','rgba(246, 246, 246, 0.31)');
  this.searchForm = $('<div>').addClass("searchForm");
  this.searchPanel.append(
    $('<div class="addForm">'+
        '<div class="add-form-status-text"></div>'+
        '<div class="name-form delay-1 animated fadeInUp text-center">'+
          '<span class="input input--kozakura" css="width:60%">'+
          '<input class="input__field input__field--kozakura" type="text" id="input-1" />'+
          '<label class="input__label input__label--kozakura" for="input-1">'+
            '<span class="input__label-content input__label-content--kozakura" data-content="Find">Find</span>'+
          '</label>'+
          '<svg class="graphic graphic--kozakura" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">'+
            '<path d="M1200,9c0,0-305.005,0-401.001,0C733,9,675.327,4.969,598,4.969C514.994,4.969,449.336,9,400.333,9C299.666,9,0,9,0,9v43c0,0,299.666,0,400.333,0c49.002,0,114.66,3.484,197.667,3.484c77.327,0,135-3.484,200.999-3.484C894.995,52,1200,52,1200,52V9z"/>'+
          '</svg>'+'</span>'+'</div>'+'<div>'+
        '</div>'+
      '</div>'
    )
  );
};
Search.prototype = {
  assemble: function(){
    return $(this.searchPanel);
  }
};

var InputForm = function(inputs){
  this.inputPanel = $('<div>').addClass('toolPanel col-xs-8 animated fadeInUp').css('padding-left','15px').css('padding-right','15px').css('margin-top','15px');
  this.inputPanel.css('height','100%').css('width','100%');
  this.inputPanel.css('background','rgba(246, 246, 246, 0.31)');
  this.inputForm = $('<div>').addClass("inputForm");
  var self2 = this;
  $.each(inputs,function(inputName){
    self2.inputPanel.append(
      $('<div class="inputForm">'+
          '<div class="add-form-status-text"></div>'+
          '<div class="name-form delay-1 animated fadeInUp text-center">'+
            '<span class="input input--kozakura" css="width:60%">'+
            '<input class="input__field input__field--kozakura" type="text" id="input-1" />'+
            '<label class="input__label input__label--kozakura" for="input-1">'+
              '<span class="input__label-content input__label-content--kozakura" data-content="'+this+'">'+this+'</span>'+
            '</label>'+
            '<svg class="graphic graphic--kozakura" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">'+
              '<path d="M1200,9c0,0-305.005,0-401.001,0C733,9,675.327,4.969,598,4.969C514.994,4.969,449.336,9,400.333,9C299.666,9,0,9,0,9v43c0,0,299.666,0,400.333,0c49.002,0,114.66,3.484,197.667,3.484c77.327,0,135-3.484,200.999-3.484C894.995,52,1200,52,1200,52V9z"/>'+
            '</svg>'+'</span>'+'</div>'+'<div>'+
          '</div>'+
        '</div>'
      )
    );
  });
};
InputForm.prototype = {
    assemble: function () {
        return $(this.inputPanel);
    }
};

var Send = function(){
    this.sendPanel = $('<div>').addClass('toolPanel');
    this.inputPanel.css('height','100%').css('width','100%');
    this.inputPanel.css('background','rgba(246, 246, 246, 0.31)');
    this.inputForm = $('<div>').addClass("sendMessage");

};

Send.prototype = {
    assemble: function(){
        return $(this.sendPanel);
    }
};

var Delete = function(){
  this.deletePanel = $('<div>').addClass('toolPanel');
}
Delete.prototype = {
  assemble: function(){
    return $(this.deletePanel);
  }
}

var Edit = function(){
  this.editPanel = $('<div>').addClass('toolPanel');
}
Edit.prototype = {
  assemble: function(){
    return $(this.assemblePanel);
  },
}

var Back = function(){
  this.backPanel = $('<div>').addClass('toolPanel');
}
Back.prototype = {
  assemble: function(){
    return $(this.backPanel);
  },
}

var More = function(){
  this.morePanel = $('<div>').addClass('toolPanel');
}
More.prototype = {
  assemble: function(){
    return $(this.morePanel);
  },
}
