var CardPanel = function(name){
  this.cardPanel = div().addClass('cardPanel col-xs-8 text-center animated fadeInUp').css('padding','0').css('margin-top','15px');
  this.cardPanel.css('height','100%').css('width','100%');
  this.cards = $('<div>').addClass('cards text-center');
  this.cardPanel.append(this.cards);
  this.name = name.replace(/ /g,'').toLowerCase();
};

CardPanel.prototype = {
  assemble:function(){
    var self = this;
    $.get('http://localhost:2101/'+self.name,function(data){
      $.each(data,function(){
        self.cards.append(new Card(this,self.name).assemble());
      });

    });
    return $(this.cardPanel);
  }
};

var Card = function(data,type){
  console.log(type);
  if(type=='messages'){this.card = new MessageCard(data).assemble()}
  else if(type=='tasks'){this.card = new TaskCard(data).assemble()}
  else if(type=='events'){this.card = new EventCard(data).assemble()}
  else if(type=='teams'){this.card = new TeamCard(data).assemble()}
  else if(type=='projects'){this.card = new ProjectCard(data).assemble()}
  else{
    this.card = $('<div>').addClass('card col-xs-3').css('min-height','125px').css('height','100%');
    this.card.css('background','rgba(246, 246, 246, 0.31)').css('margin-left','5px').css('margin-right','5px').css('margin-top','10px');
    this.card.append($('<div>').append(JSON.stringify(data, null, 4)));
  }
};

Card.prototype = {
  assemble:function(){
    return this.card;
  }
};

var MessageCard = function(data){
  console.log(data);
  this.card = $('<div>').addClass('card col-xs-3').css('min-height','75px').css('height','100%');
  this.card.css('background','rgba(246, 246, 246, 0.31)').css('margin-left','5px').css('margin-right','5px').css('margin-top','10px');
  this.card.append($('<div>').append(JSON.stringify(data, null, 4)));
};

MessageCard.prototype = {
  assemble:function(){
    return this.card;
  }
};

var TaskCard = function(data){
  console.log(data);
  this.card = $('<div>').addClass('card col-xs-3').css('min-height','75px').css('height','100%');
  this.card.css('background','rgba(246, 246, 246, 0.31)').css('margin-left','5px').css('margin-right','5px').css('margin-top','10px');
  this.card.append($('<div>').append(JSON.stringify(data, null, 4)));
};

TaskCard.prototype = {
  assemble:function(){
    return this.card;
  }
};

var EventCard = function(data){
  console.log(data);
  var self = this;
  this.card = $('<div>').addClass('card col-xs-5').css('min-height','75px').css('height','100%');
  this.innerCard= $('<div>').css('background','rgba(246, 246, 246, 0.31)').css('margin-left','5px').css('margin-right','5px').css('margin-top','10px');
  this.eventImageView = $('<div>').css('height','50');
  this.guestsView = $('<div>').addClass('row');
  $.each(data.guests,function(){self.guestsView.append($('<span>').text(this))});
  this.infoPanel = $('<div>').addClass('row text-center').append(
    $('<div>').addClass('col-xs-6 text-center').append(
      $('<i>').addClass('fa fa-clock-o'),
      $('<div>').text(data.startTime),
      $('<div>').text(data.endTime)
    ),

    $('<div>').addClass('col-xs-6 text-center').append(
      $('<i>').addClass('fa fa-map-marker'),
      $('<div>').text(data.address),
      $('<div>').text(data.city),
      $('<div>').text(data.zip)
    )
  );

  this.card.append(
    this.innerCard.append(
      this.eventImageView,
      this.guestsView,
      this.infoPanel
    )
  );
};

EventCard.prototype = {
  assemble:function(){
    return this.card;
  }
};

var TeamCard = function(data){
  console.log(data);
  this.card = $('<div>').addClass('card col-xs-4').css('min-height','75px').css('height','100%');
  this.card.css('background','rgba(246, 246, 246, 0.31)').css('margin-left','5px').css('margin-right','5px').css('margin-top','10px');
  this.card.append($('<div>').append(JSON.stringify(data, null, 4)));
};

TeamCard.prototype = {
  assemble:function(){
    return this.card;
  }
};

var ProjectCard = function(data){
  console.log(data);
  this.card = $('<div>').addClass('card col-xs-4').css('min-height','75px').css('height','100%');
  this.card.css('background','rgba(246, 246, 246, 0.31)').css('margin-left','5px').css('margin-right','5px').css('margin-top','10px');
  this.card.append($('<div>').append(JSON.stringify(data, null, 4)));
};

ProjectCard.prototype = {
  assemble:function(){
    return this.card;
  }
};
