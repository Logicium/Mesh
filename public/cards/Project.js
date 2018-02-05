var ProjectCard = function(newData){
    console.log(newData);
    var self = this;
    self.card = col(12).addClass('card').css('margin-top','10px');
    self.content = div().css('min-height','200px').css('padding-left','5px').css('margin-right','-15px').css('background-color',transparentWhite())
    self.eventNamedImage = div().css(Styles.backgroundImage(newData.icon)).css('background-position','50% 50%').height('100px');
    self.timeIcon = div().text(newData.startTime+' - '+newData.endTime);
    self.locationIcon = div().text(newData.location);
    //self.time = col(6).append(icon('clock-o').css('font-size','26px'),self.timeIcon);
    //self.location = col(6).append(icon('map-marker').css('font-size','26px'),self.locationIcon);
    self.statsRow = row().css('padding-top','10px').css('color','white').height('100px').css('background-color',transparentBlack());
    self.name = div().append(highlightText(newData.name).css('font-size','30px').css('margin','0 auto')).css('padding-top','15px');
    this.card.click(function(){ $('.eastNavi').replaceWith(new DetailCard(newData)); });
    self.card.append( self.content.append( self.eventNamedImage.append(self.name), self.statsRow.append(self.time,self.location)  ));
    return self.card;
};
