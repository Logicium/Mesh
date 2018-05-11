var ModernTools = {}

ModernTools.search = function(toolData){
  this.searchCard = row().css({'position':'absolute','pointer-events':'none','padding-top':'130px','width':'100%'});
  this.searchInput = col(4).append(div().css({'z-index':'10'}).append(input('Search').css({'pointer-events':'initial','backgroundColor':transparentWhite()}).addClass('inputWhite')));
  return this.searchCard.append(col(8),this.searchInput);
}

ModernTools.add = function(toolData,ToolsData){
  this.addRow = row().css({'position':'absolute','pointer-events':'none','padding-top':'130px','width':'100%'});
  this.addIcon = col(1).css({'pointer-events':'initial'}).append(new roundIconSm('plus')).click(function(){
    $('.cardPanel').prepend(new InputForm(toolData.inputs,ToolsData).assemble() )
  });
  return this.addRow.append( this.addIcon);
}

ModernTools.new = ModernTools.add;

ModernTools.send = function(toolData){
  var formInputs = getAllValues('.toolPanel');
  console.log(formInputs);
  this.addRow = row().css({'position':'absolute','padding-top':'130px','width':'100%'});
  this.addIcon = col(1).append(new roundIconSm('arrow-right')).click(function(){
    $('.cardPanel').prepend(new Send(toolData.inputs));
  });
  return this.addRow.append( this.addIcon);
}
var ModernToolbar = function(ToolsData){
  var self = this;

  this.toolRow = col(8).css({'position':'abosolute','padding-left':'0','width':'100%'}).addClass('toolbar animated fadeIn');
  $.each(ToolsData,function(){
    var data = this;
    self.toolRow.append(ModernTools[data.name.toLowerCase()](data,ToolsData));
  });
  return this.toolRow;
};
