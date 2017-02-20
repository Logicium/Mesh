var ToolBar = function(contextTools){

  this.toolsList = [
      {name:'Search',icon:'search'},{name:'Add',icon:'plus'},
      {name:'Delete',icon:'trash-o'},{name:'Edit',icon:'pencil'},
      {name:'Back',icon:'arrow-left'},{name:'More',icon:'ellipsis-h'}
  ];

  this.toolBar = $('<div>').addClass('toolBar text-center col-xs-8').css('width','100%');
  self = this;

  $.each(contextTools,function(data){
      data = this;
      console.log(self);
      self.toolBar.css('padding-left','15px').css('padding-right','15px').css('margin-top','15px').css('background','rgba(246, 246, 246, 0.31)');
      self.toolBar.append(
        new ToolCard(data.name,data.icon,data.inputs).assemble()
      );
  });
}

var ToolCard = function(name,icon,inputs){
  self1 = this
  this.toolCard = $('<span>').height('95').css('margin-top','20px').addClass('text-center').append(
      $('<div>').css('color','white').addClass('toolCard animated fadeInRight button button--round-l button--sacnite').css('margin-top','10px').css('width','75px !important').css('height','75px !important').css('border-radius','50%').css('border','solid rgba(255, 255, 255, 0.79) 3px').append(
        $('<div>').css('padding-top','15px').addClass('toolIcon').prepend($('<i>').addClass('fa fa-'+icon)),
        $('<div>').css('padding-top','5px').addClass('toolName').text(name)
      )
    );
  this.toolCard.click(function(){return self1.clicked(this,inputs)});
}

ToolCard.prototype = {
  assemble: function(){
    return $(this.toolCard);
  },
  clicked: function(self,inputs){
    var name = $(self).find('.toolName').text();
    $('.activityPanel').append( $( this.routeClick(name,inputs) ) );
  },
  routeClick:function(name,inputs){
      $('.toolPanel').remove();
      if(name=="Search"){return new Search().assemble();}
      else if(name=="Add"||name=="New"){return new InputForm(inputs).assemble()}
      else if(name=="Send"){return new Send().assemble()}
      else if(name=="Delete"){return new Delete().assemble()}
      else if(name=="Edit"){return new Edit().assemble()}
      else if(name=="Back"){return new Back().assemble()}
      else if(name=="More"){return new More().assemble()}
      else{console.log(':/')}
  },
}

ToolBar.prototype = {
  assemble: function(){
    return $(this.toolBar);
  }
}

var ToolPanel = function(name,options){

}
