var MemberCard = function(newData){
    var self = this;
    this.card = col(4).addClass('card').css('margin-top','10px');
    this.content = div().css('min-height','200px').css('margin-right','-15px').css('background-color',transparentWhite());

    self.image = div().css(Styles.backgroundImage(newData.icon)).css('border','2px solid white')
    .height('100px').width('100px').css('margin','0 auto').css('border-radius','50%')
    self.name = highlightText(newData.fullName).css('font-size','20px').css('margin-bottom','15px');

    self.statsRow = row().append(
      new Stat('Roles',(newData.roles ? newData.roles.length : '0' )),
      new Stat('Teams',(newData.teams ? newData.teams.length : '0' )),
      new Stat('Projects',(newData.projects ? newData.projects.length : '0' )),
      new Stat('Events',(newData.events ? newData.events.length : '0' ))
    );

    self.viewFull = div().addClass('animated fadeIn viewFull').css(Styles.click()).css('background-color',transparentBlack()).css({'height':'100%','width':'calc( 100% - 15px )','position':'absolute','z-index':'10'}).append(
        text('View Full','white','24px').css('letter-spacing','6px').css('text-transform', 'uppercase')
            .css('font-family','Open Sans Condensed').css({'padding-top':'80px'})
    ).click(function(){$('.activityPanel').replaceWith(new MemberPage(newData));});

    this.card.click(function(){
        $('.viewFull').detach();
        self.card.prepend(self.viewFull);
        $('.eastNavi').replaceWith(new PrivateDetailCard(newData));
    });

    self.card.append(self.content.append( div().css('padding','15px').append(self.image),self.name,self.statsRow));

    return this.card;
};
