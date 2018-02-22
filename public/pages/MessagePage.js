
var MessagesPanel = function(ConversationData,MessageIds){
    var self = this;
    self.panel = col(7).addClass('messagesPanel').css({'height':'100vh','background-color':transparentWhiteHeavy()});

    self.infoRow = row().css({'height':'10vh'});
    self.nameCol = col(10);
    self.convoName = titleSm(ConversationData.name).addClass('text-left');
    self.deleteSettings = col(1).append( div().append(icon('trash-alt')).css({'line-height':'10vh','font-size':'20px','margin':'0 auto'})).click(function(){
        //$('.viewFull').detach();
    });
    self.conversationSettings = new ConversationSettings(ConversationData);
    self.membersSettings = col(1).append(div().append(icon('user-plus')).css({'line-height':'10vh','font-size':'20px','margin':'0 auto'})).click(function(){
        $('.conversationSettings').detach();
        self.panel.prepend(self.conversationSettings);
    });

    self.conversationMembers = row().css({'height':'10vh'});
    //$.each every member & postJSON find to get all member's icons and append
    $.each(ConversationData.members,function(){
        postJSON('/members/find',{_id:this},function(memberData){
            self.conversationMembers.append(new MemberIconLg(memberData[0].icon).click(function(){ $('.eastNavi').replaceWith(new PrivateDetailCard(memberData[0]));}));
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
            self.deleteSettings,
            self.membersSettings
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
    self.image = new MemberIconLg(MemberData.icon).click(function(){ $('.eastNavi').replaceWith(new PrivateDetailCard(MemberData));});
    self.fullName = text(MemberData.fullName,'black','16px').css('font-weight','500');
    self.messageText = text(MessageData.message,'black','14px');
    self.time = text(MessageData.time,'grey','12px');

    return self.card.append(
        self.image,
        self.textCol.append(self.fullName,self.messageText,self.time),
        self.newMessagesCol
    );
};

var MemberCardWide = function(MemberData){
    var self = this;
    self.card = row();
    self.image = col(3).append( new MemberIconLg(MemberData.icon).click(function(){ $('.eastNavi').replaceWith(new PrivateDetailCard(MemberData));}) );
    self.name = col(6).append( text(MemberData.fullName,'white','18px') );
    self.delete = col(3).height('10vh').append( div().append(icon('unlink')).css({'line-height':'10vh','font-size':'20px','color':'white','margin':'0 auto'})).click(function(){
        //Modify ConversationData and post update, then remove member elem from panel
    });

    return self.card.append(self.image,self.name,self.delete)
}

var ConversationSettings = function(ConversationData){
    var self = this;
    self.panel = col(7).addClass('conversationSettings').css({'position':'absolute','z-index':'10','height':'100%','width':'calc( 100% )','margin-left':'-15px','background-color':transparentBlack()});
    self.title = col(6).append( text('Members','white','20px').css('line-height','10vh').addClass('text-center') );
    self.closeBar = row().height('10vh');
    self.closeButton = col(3).height('10vh').append( div().append(icon('times')).css({'line-height':'10vh','font-size':'20px','margin':'0 auto','color':'white'})).click(function(){ self.panel.detach(); });
    self.addBar = row();
    var linkedData = new LinkedData();
    self.addInput = input('Add Member','text').addClass('inputWhite');//Give member autocomplete.
    $(self.addInput).autocomplete({
        minLength: 0,
        source: function( request, response ) {
            response( $.ui.autocomplete.filter(
               linkedData.Members.data, extractLast( request.term ) ) );
        },
        focus: function() {
          return false;
        },
        select: function (event, ui) {
            event.preventDefault();
            //Clear the input and post the value to the Conversation update object.
            $(self.addInput).val('');
            var id = ui.item.value.split(' - ')[1];
            ConversationData.members.push(id);
            postJSON('/conversations/update',{token:Token,objectData:ConversationData},function(updatedConvo){
                console.log(updatedConvo);
                postJSON('/members/find',{_id:id},function(memberData){
                    self.memberCards.append(new MemberCardWide(memberData[0]));
                });
            });
            return false;
        }
    });
    $(self.addInput).data("ui-autocomplete")._renderItem = autocompleteCard;

    self.memberCards = row();
    $.each(ConversationData.members,function(){
        postJSON('/members/find',{_id:this},function(memberData){
            self.memberCards.append( new MemberCardWide(memberData[0]));
        });
    });

    return self.panel.append(self.closeBar.append(self.closeButton,self.title,col(3)),self.addBar.append(self.addInput),self.memberCards);
}
