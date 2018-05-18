var EventPage = function(EventData){
    self.self = this;
    self.page = col(8).addClass('activityPanel jarallax').height('100vh').css('overflow-y','scroll');
    self.banner = div().addClass('jarallax-image').css(Styles.gradientImage({c1:'rgba(241,241,241,0.4)',c2:'rgba(194,194,194,0.4)',image:EventData.icon})).height('400px');
    self.name = title(EventData.name);
    self.desc = text(EventData.description,'white','18px').css('margin-top','75px');
    self.eventTime = div().append(highlightTextLight(EventData.startTime + ' - ' + EventData.endTime)).css('margin-top','75px');
    self.locationRow = row().attr('id', 'map').height('200px').css('background-color',transparentWhite()).text('Location');
    self.signInRow = row();
    var time = new Date();
    self.signInButon = buttonCol('Sign In @ '+ ("0" + time.getHours()).slice(-2) + ":" +("0" + time.getMinutes()).slice(-2),'12')
    self.streamingRow = row().height('200px').css('background-color',transparentWhite()).text('Streaming');
    self.socialRow = row().css('min-height','400px');
    self.guestCol = col(6).height('100%').css('background-color',transparentWhiteHeavy());
    self.messagesCol = col(6);
    self.addMessageRow = new addMessageRow().css('padding-left','0');
    //$.each(EventData.messages,function(id){postJSON('/messages/find',{_id:id},function(data){self.messagesCol.append(commentCard(data))})})
    self.guestsLabel = text('Guests','black','20px');
    self.hostsLabel = text('Hosts','black','20px');

    self.guestsRow = row().css('padding-bottom','15px');
    self.addGuestButton = col(3).append(new roundIconSm('plus'));
    self.guestsRow.append(self.addGuestButton);
    self.hostsRow = row().css('padding-bottom','15px');;
    self.addHostButton = col(3).append(new roundIconSm('plus'));
    self.hostsRow.append(self.addHostButton);
    var splicedGuestList = EventData.guests[0].split(', ').filter(Boolean);
    var idList1 = []; for(var i=0;i<splicedGuestList.length;i++){idList1.push( splicedGuestList[i].split(' - ')[1] )}
    $.each(idList1,function(){postJSON('/members/find',{_id:this},function(MemberData){self.guestsRow.append(MemberIconWide(MemberData[0].icon))});});
    for(var i = 0;i<11-idList1.length;i++){self.guestsRow.append(MemberIconWide())}
    var splicedHostList = EventData.hosts[0].split(', ').filter(Boolean);
    console.log(splicedHostList);
    var idList2 = []; for(var i=0;i<splicedHostList.length;i++){idList2.push( splicedHostList[i].split(' - ')[1] )}
    $.each(idList2,function(){postJSON('/members/find',{_id:this},function(MemberData){self.hostsRow.append(MemberIconWide(MemberData[0].icon))});});
    for(var i = 0;i<3-idList2.length;i++){self.hostsRow.append(MemberIconWide())}

    return self.page.append(
        self.banner.append(self.name,self.desc,self.eventTime),
        self.locationRow,
        self.signInRow.append(self.signInButon),
        self.streamingRow,
        self.socialRow.append(
            self.guestCol.append(self.guestsLabel,self.guestsRow,self.hostsLabel,self.hostsRow),
            self.messagesCol.append(self.addMessageRow)
        )

    );
};
