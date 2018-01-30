var RoleCard = function(data){
  this.card = col(4).addClass('card').css('margin-top','10px');
  this.content = div().append(JSON.stringify(data, null, 4)).css('min-height','150px').css('padding-left','5px').css('margin-right','-15px').css('background-color',transparentWhite()) ;
  this.card.append( this.content );
  return this.card;
};
