var MemberPage = function(MemberData){
    var self = this;
    self.page = col(8).addClass('activityPanel').height('100vh').css('overflow-y','scroll');

    self.header = div().height('500px').css(Styles.gradientImage({c1:'rgba(241,241,241,0.3)',c2:'rgba(0,0,0,0.4)',image:(MemberData.banner || '/public/images/demo/banner.jpg')}))
    self.headerInfoRow = row();
    self.headerInfoCol = col(6);
    self.name = title(MemberData.fullName).css('padding-top','100px');
    self.bio = div().append(text(MemberData.bio || 'I\'m a sample bio: Short, sweet, to the point.', 'white','18px')).css('padding','15px');
    self.addMessageButton = new roundIconButton('envelope');
    self.imageCol = col(6).css('padding','15px');
    self.memberImage = div().height('350px').width('350px').css({'border':'2px solid white','border-radius':'50%','margin':'0 auto'}).css('background-position','50% 70%').css(Styles.backgroundImage(MemberData.icon));

    self.statsRow = row();
    self.activitiesStat = new roundValueButton('Activities',MemberData.activity.length);
    self.rolesStat = new roundValueButton('Roles',MemberData.roles.length);
    self.projectsStat = new roundValueButton('Projects',MemberData.projects.length);
    self.eventsStat = new roundValueButton('Events',MemberData.events.length);
    self.teamsStat = new roundValueButton('Teams',MemberData.teams.length);
    self.tasksStat = new roundValueButton('Tasks',MemberData.tasks.length);

    self.utilRow = row();
    self.activityCol = col(8).css({'background-color':transparentWhiteHeavy()});
    self.activityToolsRow = row();
    self.activityTitleCol = col(6).removeClass('text-center').addClass('text-left');
    self.activitySearchCol = col(6);
    self.activityTitle = text((MemberData.firstName+'\'s Activity'),'black','26px').css('padding-top','10px');
    self.activitySearch = input('Search','text');
    self.activityCards = row();

    postJSON('/members/activities',{token:Token,_id:MemberData._id},function(data){
    console.log(data);
      $.each(data,function(){
          if(this.type != 'memberAdd'){ $(self.activityCards).append(col(12).css('padding-left','0px').css('margin-top','10px').append(new ActivityCard(this))); }
      });
    });

    self.commentsCol = col(4).css({'background-color':transparentBlack()});
    self.addCommentRow = row();
    self.addCommentInputCol = col(8);
    self.addCommentInput = input('Add Comment','text').addClass('inputWhite');
    self.addCommentSend = buttonCol('Post',4).css({'margin-top':'10px','height':'45px','line-height':'45px'});
    self.commentsCards = row();

    return self.page.append(
        self.header.append(
            self.headerInfoRow.append(
                self.headerInfoCol.append(self.name,self.bio,self.addMessageButton),
                self.imageCol.append(self.memberImage)
            ),
            self.statsRow.append(self.activitiesStat,self.rolesStat,self.projectsStat,self.eventsStat,self.teamsStat,self.tasksStat)
        ),
        self.utilRow.append(
            self.activityCol.append(
                self.activityToolsRow.append(
                    self.activityTitleCol.append(self.activityTitle),
                    self.activitySearchCol.append(self.activitySearch)
                ),
                self.activityCards
            ),
            self.commentsCol.append(
                self.addCommentRow.append(self.addCommentInputCol.append(self.addCommentInput),self.addCommentSend),
                self.commentsCards
            )
        )
    );

}

var roundIconButton = function(iconName){
    this.button = div().height('120px').css('padding','10px');
    this.round = div().height('50px').width('50px').css({'border':'2px solid white','border-radius':'50%','margin':'0 auto','line-height':'50px'});
    this.icon = icon(iconName).css({'color':'white','font-size':'20px'});
    //this.name = text(name,'white','20px').css('font-family','Open Sans Condensed').css('margin-top','10px').css('letter-spacing','6px').css('text-transform', 'uppercase');
    return this.button.append(
        this.round.append(this.icon),
        //this.name
    );
};

var roundValueButton = function(name,value){
    this.button = col(2).height('120px').addClass('hvr hvr-underline-reveal').css('padding','10px');
    this.round = div().height('50px').width('50px').css({'border':'2px solid white','border-radius':'50%','margin':'0 auto'});
    this.value = text(value,'white','20px').css({'line-height':'50px'});;
    this.name = text(name,'white','20px').css('font-family','Open Sans Condensed').css('margin-top','25px').css('letter-spacing','6px').css('text-transform', 'uppercase');
    return this.button.append(
        this.round.append(this.value),
        this.name
    );
};
