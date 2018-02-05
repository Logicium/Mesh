var MemberCard = function(newData){
    var self = this;
    this.card = col(4).addClass('card').css('margin-top','10px');
    this.content = div().css('min-height','200px').css('padding-left','5px').css('margin-right','-15px').css('background-color',transparentWhite());

    self.image = div().css(Styles.backgroundImage(newData.icon)).css('border','2px solid white')
    .height('100px').width('100px').css('margin','0 auto').css('border-radius','50%')
    self.name = highlightText(newData.fullName).css('font-size','20px').css('margin-bottom','15px');

    self.statsRow = row().append(
      new Stat('Roles',newData.roles.length),
      new Stat('Teams',newData.teams.length),
      new Stat('Projects',newData.projects.length),
      new Stat('Events',newData.events.length)
    );

    self.card.append(self.content.append( div().css('padding','15px').append(self.image),self.name,self.statsRow));

    this.card.click(function(){ $('.eastNavi').replaceWith(new DetailCard(newData)); });

    return this.card;
};
