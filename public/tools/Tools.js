var Search = function(){
  this.searchPanel = $('<div>').addClass('toolPanel col-xs-8 animated fadeInUp').css('padding-left','15px').css('padding-right','15px').css('margin-top','15px');
  this.searchPanel.height('125').css('width','100%');
  this.searchPanel.css('background','rgba(246, 246, 246, 0.31)');
  this.searchForm = $('<div>').addClass("searchForm");
  this.searchPanel.append(input('Find'));
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
        input(this).addClass('name-form delay-1 animated fadeInUp text-center')
    );
  });
  $.each($('.toolCard'),function(){if($(this).find('.toolName').text() == "Send"){$(this).remove()}});
  $('.toolBar').append(new ToolCard("Send",'arrow-right').assemble());

};
InputForm.prototype = {
    assemble: function () {
        return $(this.inputPanel);
    }
};

var Send = function(){
    this.sendPanel = $('<div>').addClass('toolPanel col-xs-8 text-center animated fadeInUp').css('padding-left','15px').css('padding-right','15px').css('margin-top','15px');
    this.sendPanel.css('height','100%').css('width','100%');
    this.sendPanel.css('background','rgba(246, 246, 246, 0.31)');
};

Send.prototype = {
    assemble: function(formInputs){
      var routeBase = $('.topTitle').text().replace(/ /g,'').toLowerCase();
      var self = this;
      self.sendMessage = $('<div>').addClass("sendPanel").text("Message sent!");
      $.post('http://localhost:2101/'+routeBase+'/add',{inputs:formInputs},function(data){
        console.log(data);
        $('.sendPanel').text(data.message);
      });
      return $(self.sendPanel).append(self.sendMessage);
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
