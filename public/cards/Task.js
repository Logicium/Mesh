var TaskCard = function(data){
  this.card = div().addClass('card col-xs-3').css('margin-top','10px');
  this.content = div().append(JSON.stringify(data, null, 4)).css('min-height','150px').css('padding-left','5px').css('margin-right','-15px').css('background-color',transparentWhite()) ;
  self.viewFull = div().addClass('animated fadeIn viewFull').css(Styles.click()).css('background-color',transparentBlack()).css({'height':'100%','width':'calc( 100% - 15px )','position':'absolute','z-index':'10'}).append(
      text('View Full','white','24px').css('letter-spacing','6px').css('text-transform', 'uppercase')
          .css('font-family','Open Sans Condensed').css({'padding-top':'75px'})
  ).click(function(){$('.activityPanel').replaceWith(new EventPage(newData));});
  this.card.click(function(){
      $('.viewFull').detach();
      self.card.prepend(self.viewFull);
      $('.eastNavi').replaceWith(new DetailCard(newData));
  });
  this.card.append( this.content );
  return this.card;
};
