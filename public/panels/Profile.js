var Profile = function(){};

Profile.prototype={
  assemble: function(){
    return new UtilityPanel({name:"P R O F I L E"}).utilityPanel;
  },
};

var ProfilePanel = function(name){
    var self = this;
    this.profilePanel = col(8).addClass('animated fadeInUp').css('padding','0');
    this.profilePanel.css('margin-top','15px').css('height','100%').css('width','calc( 100% - 15px )');
    this.headerSection = row().css('margin-right','-15px').css('background-color',transparentWhite());
    this.sideA = col(4).css('padding','0').css('min-height','200px');
    this.sideB = col(8).css('padding','0');

    postJSON('/members/find',{token:Token},function(newData){
        newData = newData[0];
        console.log(newData);
        self.image = div().append(div().css(Styles.backgroundImage(newData.icon)).css('border','2px solid white')
        .height('125px').width('125px').css('margin','0 auto').css('border-radius','50%')).css('padding','15px')
        self.name = div().append(text(newData.fullName,'white','24px'));
        self.statsRow1 = row().append(
            new StatWide('Projects',newData.projects.length),
            new StatWide('Teams',newData.teams.length),
            new StatWide('Roles',newData.roles.length)
        );
        self.statsRow2 = row().append(
            new StatWide('Comments',newData.messages.length),
            new StatWide('Events',newData.events.length),
            new StatWide('Tasks',newData.tasks.length)
        );
    });

    this.addMessageRow = row().css('margin-top','10px').height('100px').css('margin-right','-15px');
    this.addMessageCol = col(8).css('background-color',transparentWhiteHeavy()).css('padding','0').append(input('Type message:','text').height('100px').css('margin','0'));
    this.sendButtonCol = buttonCol('Add Comment',4).css('padding','0').css('line-height','100px')

    this.activityRow = div().addClass('cards').css('margin-right','-15px');

    postJSON('/members/activities',{token:Token},function(data){
    console.log(data);
      $.each(data,function(){
          if(this.type != 'memberAdd'){ $(self.activityRow).append(col(12).css('padding-left','0px').css('margin-top','10px').append(new ActivityCard(this))); }
          //else{ $(self.newMemberContent).append(new ActivityCard(this))}
      });
    });

    return this.profilePanel.append(
        this.headerSection.append(
            this.sideA.append(this.image,this.name),
            this.sideB.append(this.statsRow1,this.statsRow2)
        ),
        this.addMessageRow.append(this.addMessageCol,this.sendButtonCol),
        this.activityRow
    );
}

var StatWide = function(name,count){
    this.statCol = col(4).css('padding','0').css('border-left','1px solid white');
    this.count = text(count,'black','28px').css('padding-top','15px').height('75px');
    this.name = text(name,'white','16px').height('25px').css('background-color',transparentBlack());
    return this.statCol.append(this.count,this.name)
}
