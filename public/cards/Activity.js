var ActivityCard = function(data){
    if(data.type == 'memberAdd'){this.card = new MemberActivityCard(this,data)}
    else if(data.type == 'roleAdd'){this.card = new RoleActivityCard(this,data)}
    return this.card;
};

var MemberActivityCard = function(self,data){
    self.card = div().addClass('card').css('margin-top','10px')
    postJSON('/members/find',{"_id":data.link},function(newData){
          self.content = div().append(JSON.stringify(newData, null, 4)).css('min-height','150px')
          .css('padding-left','5px').css('margin-right','-15px').css('background-color',transparentWhite()) ;
          self.card.append( self.content );
    })
    return self.card;
};

var RoleActivityCard = function(self,data){
  self.card = div().addClass('card')
  postJSON('/roles/find',{"_id":data.link},function(newData){
        self.content = div().append(JSON.stringify(newData, null, 4)).css('min-height','150px')
        .css('padding-left','5px').css('margin-right','-15px').css('background-color',transparentWhite()) ;
        self.card.append( self.content );
  })
  return self.card;
};
