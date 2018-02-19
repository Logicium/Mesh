var ConversationsPanel = function(){
    var ConversationsData = {};
    postJSON('/conversations/list',{token:Token},function(newData){ConversationsData = newData});
    var self = this;
    self.page = col(8).addClass('activityPanel').height('100vh');

    self.cardsRow = row();
    self.conversationsCol = col(5).css({'height':'100vh','overflow-y':'scroll','background-color':transparentWhite()});
    self.toolsRow = row();

    var newEmptyConvo = {name:'New Conversation',members:[],events:[],teams:[],roles:[],messages:[]};
    self.newMessageCol = col(3).append(new roundIconSm('plus')).click(function(){
        postJSON('/conversations/add',{token:Token,convo:newEmptyConvo},function(newConvo){
            $('.messagesPanel').replaceWith(new MessagesPanel(newConvo.data,[]));
        });
    });
    self.inputCol = col(9);
    self.searchInput = input('Search','text');

    self.unreadSection = new ConversationSection('Unread','envelope',ConversationsData);
    self.snoozedSection = new ConversationSection('Snoozed','clock',ConversationsData);
    self.archivedSection = new ConversationSection('Archived','check',ConversationsData);

    self.messagesCol = col(7).addClass('messagesPanel').css({'height':'100vh','overflow-y':'scroll','background-color':transparentWhiteHeavy()}); // Click a conversation card to view

    return self.page.append(

        self.cardsRow.append(
            self.conversationsCol.append(
                self.toolsRow.append(self.newMessageCol,self.inputCol.append(self.searchInput)),
                self.unreadSection,
                self.snoozedSection,
                self.archivedSection
            ),
            self.messagesCol
        )
    );

};

var ConversationSection = function(name,iconName,convos){
    var self = this;
    this.section = row();
    this.titleBar = row().addClass('text-left').css({'border-top-left-radius':'5px','border-top-right-radius':'5px','height':'50px','background-color':transparentWhiteHeavy()});
    this.icon = col(2).append(div().append(icon(iconName)).css('margin','0 auto').css('padding','10px'));
    this.title = col(8).append(text(name,'black','18px').css({'letter-spacing':'6px','line-height':'50px'}).css('text-transform', 'uppercase').css('font-family','Open Sans Condensed'));
    self.messagesRow = row().css({'border-bottom-left-radius':'5px','border-bottom-right-radius':'5px','min-height':'200px','margin-bottom':'15px','background-color':transparentWhite()});
    $.each(convos,function(){self.messagesRow.append(new ConversationPreviewCard(this, (this.messages ? this.messages[0] : {} ) ))});

    return this.section.append(this.titleBar.append(this.icon,this.title),self.messagesRow);
};

var ConversationPreviewCard = function(ConversationData,MessageId){
    var self = this;
    var MemberData = {};
    var MessageData = {};
    postJSON('/messages/find',{_id:MessageId,token:Token},function(message){ MessageData = message });
    postJSON('/members/find',{_id:MessageData.from},function(member){ MemberData = member[0];});

    self.card = row().click(function(){
        $('.messagesPanel').replaceWith(new MessagesPanel(ConversationData,ConversationData.messages));
    });
    self.textCol = col(6).removeClass('text-center').addClass('text-left');
    self.oppositeImageCol = col(3);
    self.image = new MemberIconWide(MemberData.icon);
    self.subject = text(ConversationData.name,'black','16px');
    self.fullName = text(MemberData.fullName,'black','16px').css('font-weight','500');
    self.messageText = text(MessageData.message,'black','14px');
    self.time = text(MessageData.time,'grey','12px');

    return self.card.append(
        self.image,
        self.textCol.append(self.fullName,self.subject,self.messagePreview,self.time),
        self.oppositeImageCol
    );
}
