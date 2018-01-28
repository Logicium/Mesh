var ToolBar = function(contextTools){

  this.toolsList = [
      {name:'Search',icon:'search'},{name:'Add',icon:'plus'},
      {name:'Delete',icon:'trash-o'},{name:'Edit',icon:'pencil'},
      {name:'Back',icon:'arrow-left'},{name:'More',icon:'ellipsis-h'}
  ];

  this.toolBar = $('<div>').addClass('toolBar text-center col-xs-8').css('width','100%');
  self = this;
  console.log(contextTools);

  $.each(contextTools,function(data){
      data = this;
      console.log(self);
      var size = 12;
      if(contextTools.length==1){size=12}
      else if(contextTools.length==2){size=6}
      else if(contextTools.length==3){size=4}
      else if(contextTools.length==4){size=3}
      else if(contextTools.length==5){size=2}
      else if(contextTools.length==6){size=2}
      else {size == 1 }
      self.toolBar.css('padding','0').css('margin-top','15px').css('background','rgba(246, 246, 246, 0.31)');
      self.toolBar.append(
        new ToolCard(data.name,data.icon,data.inputs,size,contextTools).assemble()
      );
  });
}

var ToolCard = function(name,icon,inputs,size,toolData){
  self1 = this
  this.toolCard = buttonCol('',size).addClass('text-center').append(
      $('<div>').css('color','white').addClass('toolCard animated fadeInRight').css('min-width','40px !important').css('min-height','40px !important').append(
        div().css('margin','0 auto').addClass('toolIcon').prepend($('<i>').addClass('fa fa-'+icon).css('color','white')),
        div().css('margin','0 auto').addClass('toolName').css('color','white').text(name)
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
      else if(name=="Send"){return new Send().assemble(formInputs)}
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


var ToolPanel = function(name,options){

}
