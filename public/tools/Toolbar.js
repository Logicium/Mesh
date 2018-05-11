var ToolBar = function(contextTools){
  var self = this;
  this.toolsList = [
      {name:'Search',icon:'search'},{name:'Add',icon:'plus'},
      {name:'Delete',icon:'trash-o'},{name:'Edit',icon:'pencil'},
      {name:'Back',icon:'arrow-left'},{name:'More',icon:'ellipsis-h'}
  ];
  this.toolBar = $('<div>').addClass('toolBar text-center col-xs-8').css('width','100%');
  this.toolBar.css('padding','0').css('margin-top','15px').css('background','rgba(246, 246, 246, 0.30)');
  $.each(contextTools,function(data){
      data = this;
      var size = setColSize(contextTools.length);
      self.toolBar.append(
        new ToolCard(data.name,data.icon,data.inputs,size,contextTools).assemble()
      );
  });
}

var ToolCard = function(name,icon,inputs,size,toolData){
  self1 = this
  this.toolCard = buttonCol('',size).addClass('text-center').append(
      div().css('color','white').addClass('toolCard animated fadeIn').css('min-width','40px !important').append(
        span().css({'margin':'0 auto','padding-right':'15px','height':'25px','line-height':'30px'}).addClass('toolIcon').prepend($('<i>').addClass('fa fa-'+icon).css('color','white')),
        span().css({'margin':'0 auto','height':'25px','line-height':'25px'}).addClass('toolName').css('color','white').text(name)
      ).hover(
          function(){$(this).animate({'background-color':transparentBlack(),'color':'white'},300);},
          function(){$(this).animate({'background-color':transparent(),'color':'black'},300)}
      )
    );
  this.toolCard.click(function(){return self1.clicked(this,inputs,toolData)});
}

ToolCard.prototype = {
  assemble: function(){
    return $(this.toolCard);
  },
  clicked: function(self,inputs,toolData){
    var name = $(self).find('.toolName').text();
    $('.cardPanel').prepend( $( this.routeClick(name,inputs,toolData) ) );
  },
  routeClick:function(name,inputs,toolData){
      var formInputs = getAllValues('.toolPanel');
      console.log(formInputs);
      $('.toolPanel').remove();
      if(name=="Search"){return new Search().assemble();}
      else if(name=="Add"||name=="New"){return new InputForm(inputs,toolData).assemble()}
      else if(name=="Send"){return new Send(formInputs)}
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
