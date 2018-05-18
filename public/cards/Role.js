var RoleCard = function(newData){
    var self = this;
    self.card = col(6).addClass('card').css('margin-top','10px');
    self.content = div().css('min-height','225px').css('padding-left','5px').css('margin-right','-15px').css('background-color',transparentWhite());
    self.roleRow = row();
    self.name = highlightText(newData.name).css('font-size','30px').css('margin','0 auto');
    self.hashtags = div().append(highlightTextLight(newData.hashtags).css('font-size','18px').css('margin','0 auto')).css('padding','15px').css('padding-top','75px');
    self.roleNamedImage = div().css(Styles.backgroundImage(newData.icon)).height('225px').css({'padding-top':'50px'}).append(self.name,self.hashtags);
    self.sideA = col(6).css('min-height','150px').css('padding','0').append(self.roleNamedImage);
    self.description = div().append(text(newData.description,'white','16px')).css('padding-top','75px');
    self.sideB = col(6).css('min-height','225px').css('background-color',transparentBlack()).append(self.description);
    self.viewFull = div().addClass('animated fadeIn viewFull').css(Styles.click()).css('background-color',transparentBlack()).css({'height':'100%','width':'calc( 100% - 15px )','position':'absolute','z-index':'10'}).append(
        text('View Full','white','24px').css('letter-spacing','6px').css('text-transform', 'uppercase')
            .css('font-family','Open Sans Condensed').css({'padding-top':'75px'})
    ).click(function(){$('.activityPanel').replaceWith(new EventPage(newData));});
    this.card.click(function(){
        $('.viewFull').detach();
        self.card.prepend(self.viewFull);
        $('.eastNavi').replaceWith(new DetailCard(newData));
    });
    self.card.append( self.content.append( self.roleRow.append(self.sideA,self.sideB) ));
    return self.card;
};
