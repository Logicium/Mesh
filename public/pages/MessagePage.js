
var MessagesPanel = function(ConversationData,MessageIds){
    var self = this;
    self.panel = col(7).addClass('messagesPanel').css({'height':'100vh','background-color':transparentWhiteHeavy()});

    self.infoRow = row().css({'height':'10vh'});
    self.nameCol = col(9);
    self.settingsCol = col(3);
    self.convoName = titleSm(ConversationData.name).addClass('text-left');
    self.membersSettings = new roundIconSm('user');

    self.conversationMembers = row().css({'height':'10vh'});
    //$.each every member & postJSON find to get all member's icons and append
    $.each(ConversationData.members,function(){
        postJSON('/members/find',{_id:this},function(memberData){
            self.conversationMembers.append(new MemberIconLg(memberData[0].icon))
        });
    });

    self.messageCardsRow = row().css({'height':'70vh','overflow-y':'scroll'});
    //$.each every messageId & postJSON find to get MessageData for cards and append
    $.each(ConversationData.messages,function(){
        postJSON('/messages/find',{_id:this},function(messageData){
            postJSON('/members/find',{_id:messageData[0].from},function(memberData){
                self.messageCardsRow.append(new MessageCard(messageData[0],memberData[0]))
            });
        });
    });

    self.sendMessageRow = row().css({'height':'10vh'});
    self.inputCol = col(10);
    self.input = input('Write message','text').addClass('inputBlack sendMessageInput');
    self.mediaButtonCol = col(1).append(div().append(icon('paperclip')).css({'line-height':'10vh','font-size':'20px','margin':'0 auto'}));
    self.sendButtonCol = col(1).append(div().append(icon('arrow-circle-right')).css({'line-height':'10vh','font-size':'20px','margin':'0 auto'})).click(function(){
        var newMessage = {message:$('.sendMessageInput').val(),conversation:ConversationData._id};
        postJSON('/messages/add',{token:Token,message:newMessage},function(messageData){
            postJSON('/members/find',{_id:messageData.data.from},function(memberData){
                self.messageCardsRow.append(new MessageCard(messageData.data,memberData[0]));
            });
        });
    });

    return self.panel.append(
        self.infoRow.append(
            self.nameCol.append(self.convoName),
            self.settingsCol.append(self.membersSettings)
        ),
        self.conversationMembers,
        self.messageCardsRow,
        self.sendMessageRow.append(
            self.inputCol.append(self.input),self.mediaButtonCol,self.sendButtonCol
        )
    );
}

var MessageCard = function(MessageData,MemberData){
    var self = this;
    self.card = row();
    self.textCol = col(8).removeClass('text-center').addClass('text-left');
    self.newMessagesCol = col(2);
    self.image = new MemberIconLg(MemberData.icon);
    self.fullName = text(MemberData.fullName,'black','16px').css('font-weight','500');
    self.messageText = text(MessageData.message,'black','14px');
    self.time = text(MessageData.time,'grey','12px');

    return self.card.append(
        self.image,
        self.textCol.append(self.fullName,self.messageText,self.time),
        self.newMessagesCol
    );
};
