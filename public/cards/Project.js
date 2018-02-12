var ProjectCard = function(newData){
    console.log(newData);
    var self = this;
    self.card = col(12).addClass('card').css('margin-top','10px');
    self.content = div().css('min-height','225px').css('margin-right','-15px').css('background-color',transparentWhite())
    self.projectNamedImage = div().css(Styles.backgroundImage(newData.icon)).css('background-position','50% 50%').css('min-height','225px');
    self.infoRow = row();
    self.membersRow1 = row().css('padding-top','100px').css('color','white');
    $.each(['','','','','','','','','','','',''],function(){self.membersRow1.append(new MemberIconLong('public/images/demo/member.jpg'))});
    self.name = col(6).append(highlightText(newData.name).css('font-size','30px').css('margin','0 auto')).removeClass('text-center').addClass('text-left').css('padding-top','15px');
    self.desc = col(6).append(highlightTextLight(newData.description).css('font-size','18px').css('margin','0 auto')).removeClass('text-center').addClass('text-right').css('padding-top','15px');
    self.card.append( self.content.append( self.projectNamedImage.append(self.infoRow.append(self.name,self.desc), self.membersRow1 )));
    this.card.click(function(){ $('.eastNavi').replaceWith(new DetailCard(newData)); });
    return self.card;
};

var MemberIconLong = function(image){
    var css = {'border':'2px solid white','border-radius':'50%','margin':'0 auto'}
    return col(1).append( div().css(Styles.backgroundImage(image)).css(css).height('30px').width('30px') );
}
