var CardPanel = function(name){
  this.cardPanel = div().addClass('cardPanel col-xs-8 text-center animated fadeInUp').css('padding','0').css('margin-left','-15px').css('margin-top','15px');
  this.cardPanel.css('height','100%').css('width','calc(100% + 15px)');
  this.cards = div().addClass('cards text-center');
  this.cardPanel.append(this.cards);
  this.name = name.replace(/ /g,'').toLowerCase();
};

CardPanel.prototype = {
  assemble:function(){
    var self = this;
    postJSON('/'+self.name+'/list',{token:Token},function(data){
        console.log(data)
      $.each(data,function(){
        self.cards.append(new Card(this,self.name));
      });
    });
    return $(this.cardPanel);
  }
};

var Card = function(data,type){
  console.log(type);
  if(type=='messages'){this.card = new MessageCard(data)}
  else if(type=='activity'){this.card = new ActivityCard(data)}
  else if(type=='members'){this.card = new MemberCard(data)}
  else if(type=='roles'){this.card = new RoleCard(data)}
  else if(type=='tasks'){this.card = new TaskCard(data)}
  else if(type=='events'){this.card = new EventCard(data)}
  else if(type=='teams'){this.card = new TeamCard(data)}
  else if(type=='projects'){this.card = new ProjectCard(data)}
  else{
    this.card = div().addClass('card col-xs-3').css('min-height','125px').css('height','100%');
    this.card.css('background','rgba(246, 246, 246, 0.31)').css('margin-left','5px').css('margin-right','-15px').css('margin-top','10px');
    this.card.append(div().append(JSON.stringify(data, null, 4)));
  }
  return this.card;
};
