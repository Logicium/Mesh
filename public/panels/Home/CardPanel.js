var CardPanel = function(name){
  this.cardPanel = $('<div>').addClass('cardPanel col-xs-8 text-center animated fadeInUp').css('padding-left','15px').css('padding-right','15px').css('margin-top','15px');
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
        self.cards.append(new Card(this).assemble());
      });

    });
    return $(this.cardPanel);
  }
};

var Card = function(data){
  this.card = $('<div>').addClass('card col-xs-3').css('height','100%');
  this.card.css('background','rgba(246, 246, 246, 0.31)').css('margin-left','5px').css('margin-right','5px').css('margin-top','10px');
  this.card.text(data);
};

Card.prototype = {
  assemble:function(){
    return this.card;
  }
};