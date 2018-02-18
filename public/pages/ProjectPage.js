var ProjectPage = function(ProjectData){
    var self = this;
    self.page = col(8).addClass('activityPanel').height('100vh').css('overflow-y','scroll');
    self.banner = div().css(Styles.gradientImage({c1:'rgba(241,241,241,0.4)',c2:'rgba(194,194,194,0.4)',image:ProjectData.icon})).height('400px');
    self.infoCol = col(6);
    self.name = title(ProjectData.name);
    self.taskCount = new HorizonalStat('Tasks',(ProjectData.tasks ? ProjectData.tasks.length : '0'));
    self.eventCount = new HorizonalStat('Events',(ProjectData.events ? ProjectData.events.length : '0'));
    self.descCol = col(6).append(highlightTextLight(ProjectData.description));
    self.tasksRow = row().height('200px').css('background-color',transparentWhiteHeavy()).text('Tasks');
    self.addNewTaskCard = col(2);
    self.viewAllTasksCard = col(2);
    self.membersRow = row().height('200px').css('background-color',transparentWhite()).text('Members');
    self.utilRow = row();
    self.eventsCol = col(6);
    self.messagesCol = col(6);
    self.addMessageRow = new addMessageRow();

    return self.page.append(
        self.banner.append(
            self.infoCol.append(self.name,self.taskCount,self.eventCount),
            self.descCol
        ),
        self.membersRow,
        self.tasksRow,
        self.utilRow.append(
            self.messagesCol.append(self.addMessageRow),
            self.eventsCol
        )
    )
};

var HorizonalStat = function(label,value){
    this.statRow = row();
    this.statValue = col(6).append(text(value,'white','22px'));
    this.label = col(6).append(text(label,'white','18px'));
    return this.statRow.append(this.statValue, this.label);
};
