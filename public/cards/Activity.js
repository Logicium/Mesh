var ActivityCard = function(data){
    if(data.type == 'memberAdd'){this.card = new MemberActivityCard(this,data)}
    else if(data.type == 'roleAdd'){this.card = new RoleActivityCard(this,data)}
    else if(data.type == 'eventAdd'){this.card = new EventActivityCard(this,data)}
    else if(data.type == 'projectAdd'){this.card = new ProjectActivityCard(this,data)}
    return this.card;
};

var Stat = function(name,count){
    this.statCol = col(3).css('padding','0');
    this.count = text(count,'black','28px');
    this.name = text(name,'white','16px').css('background-color',transparentBlack());
    return this.statCol.append(this.count,this.name)
}

var MemberActivityCard = function(self,data){
    self.card = div().addClass('card').css('margin-top','10px').css('margin-right','-15px').css('background-color',transparentWhite());
    postJSON('/members/find',{"_id":data.link},function(newData){
        console.log(newData);
        newData = newData[0];
        self.image = div().css(Styles.backgroundImage(newData.icon)).css('border','2px solid white')
        .height('100px').width('100px').css('margin','0 auto').css('border-radius','50%')
        self.name = highlightText(newData.fullName).css('font-size','20px').css('margin-bottom','15px');
        self.statsRow = row().append(
            new Stat('Roles',newData.roles.length),
            new Stat('Teams',newData.teams.length),
            new Stat('Projects',newData.projects.length),
            new Stat('Events',newData.events.length)
        );
        self.content = div().append(JSON.stringify(newData, null, 4)).css('min-height','150px')
        .css('padding-left','5px').css('background-color',transparentWhite()) ;
        self.card.append( div().css('padding','15px').append(self.image),self.name,self.statsRow);
        self.card.click(function(){ $('.eastNavi').replaceWith(new PrivateDetailCard(newData)); });
    })
    return self.card;
};

var RoleActivityCard = function(self,data){
  self.card = div().addClass('card').css('margin-right','-15px').css('margin-bottom','15px');
  postJSON('/roles/find',{"_id":data.link},function(newData){
        newData = newData[0];
        self.roleRow = row();
        self.name = highlightText(newData.name).css('font-size','30px').css('margin','0 auto');
        self.roleNamedImage = div().css(Styles.backgroundImage(newData.icon)).height('150px').css('padding-top','50px').append(self.name);
        self.sideA = col(6).css('min-height','150px').css('padding','0').append(self.roleNamedImage);
        self.description = div().append(text(newData.description,'white','16px')).css('padding-top','40px');
        self.sideB = col(6).css('min-height','150px').css('background-color',transparentBlack()).append(self.description);
        self.card.append( self.roleRow.append(self.sideA,self.sideB) );
        self.card.click(function(){ $('.eastNavi').replaceWith(new DetailCard(newData)); });
  })
  return self.card;
};

var EventActivityCard = function(self,data){
  self.card = div().addClass('card').css('margin-right','-15px').css('margin-bottom','15px');
  postJSON('/events/find',{"_id":data.link},function(newData){
        newData = newData[0];
        self.eventNamedImage = div().css(Styles.backgroundImage(newData.icon)).css('background-position','50% 50%').height('75px');
        self.timeIcon = div().text(newData.startTime+' - '+newData.endTime);
        self.locationIcon = div().text(newData.location);
        self.time = col(6).append(icon('clock').css('font-size','26px'),self.timeIcon);
        self.location = col(6).append(icon('map-marker').css('font-size','26px'),self.locationIcon);
        self.statsRow = row().css('padding-top','10px').css('color','white').height('75px').css('background-color',transparentBlack());
        self.name = div().append(highlightText(newData.name).css('font-size','30px').css('margin','0 auto')).css('padding-top','15px');
        self.card.append( self.eventNamedImage.append(self.name), self.statsRow.append(self.time,self.location) );
        self.card.click(function(){ $('.eastNavi').replaceWith(new DetailCard(newData)); });
  })
  return self.card;
};

var ProjectActivityCard = function(self,data){
  self.card = div().addClass('card').css('margin-right','-15px').css('margin-bottom','15px');
  postJSON('/projects/find',{"_id":data.link},function(newData){
        newData = newData[0];
        self.projectNamedImage = div().css(Styles.backgroundImage(newData.icon)).css('background-position','50% 50%').height('150px');
        self.infoRow = row();
        self.membersRow = row().css('padding-top','50px').css('color','white');
        $.each(['','','','','',''],function(){self.membersRow.append(new MemberIcon('public/images/demo/member.jpg'))});
        self.name = col(6).append(highlightText(newData.name).css('font-size','30px').css('margin','0 auto')).removeClass('text-center').addClass('text-left').css('padding-top','15px');
        self.desc = col(6).append(highlightTextLight(newData.description).css('font-size','18px').css('margin','0 auto')).removeClass('text-center').addClass('text-left').css('padding-top','15px');
        self.card.append( self.projectNamedImage.append(self.infoRow.append(self.name,self.desc), self.membersRow ));
        self.card.click(function(){ $('.eastNavi').replaceWith(new DetailCard(newData)); });
  });
  return self.card;
};
