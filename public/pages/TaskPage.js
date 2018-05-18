var TaskPage = function(TaskData){
    var self = this;
    self.page = col(8).addClass('activityPanel').height('100vh').css('overflow-y','scroll');
    self.name = panelTitle(TaskData.name).css('margin-bottom','0');
    self.description = row().append(subtitle(TaskData.description).css('color','black')).css({'background':transparentWhiteHeavy()});
    self.membersButton = col(2).append(new roundIconSm('plus'));
    this.membersRow = row().css({'background':transparentWhite(),'padding':'5px'}).append(self.membersButton);
    postJSON('/members/find',{_id:TaskData.creator},function(newData){self.membersRow.append(new MemberIconMd(2,newData[0].image))});
    self.utilRow = row();
    self.commentsCol = col(12).css({'background-color':transparentWhite()});
    self.addCommentRow = row();
    self.addCommentInputCol = col(8);
    self.commentCards = row();
    self.addCommentInput = input('Add Comment','text').addClass('sendMessageInput inputWhite');
    self.addCommentSend = buttonCol('Post',4).css({'margin-top':'10px','height':'45px','line-height':'45px'}).click(function(){
        var newMessage = {message:$('.sendMessageInput').val(),task:TaskData._id};
        $('.sendMessageInput').val('');
        postJSON('/tasks/addComment',{token:Token,message:newMessage},function(messageData){
            if( TaskData.messages ) { TaskData.messages.push(messageData.data._id) }
            else{ TaskData.messages = []; TaskData.messages.push(messageData.data._id) };
            postJSON('/tasks/update',{token:Token,updateObject:TaskData},function(updatedTask){console.log(updatedTask)});
            postJSON('/members/find',{token:Token},function(memberData){
                self.commentCards.prepend(new MessageCard(messageData.data,memberData[0]));
            });
        });
    });

    $.each(TaskData.messages,function(){
        postJSON('/messages/find',{_id:this},function(MessageData){
            postJSON('/members/find',{_id:MessageData[0].from},function(memberData){
                self.commentCards.prepend(new MessageCard(MessageData[0],memberData[0]));
            });
        });
    });


    return self.page.append(
        self.name,
        self.description,
        this.membersRow,
        self.utilRow.append(
            self.commentsCol.append(
                self.addCommentRow.append(self.addCommentInputCol.append(self.addCommentInput),self.addCommentSend),
                self.commentCards
            )
        )
    );

}
