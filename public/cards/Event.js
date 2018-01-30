var EventCard = function(data){
  console.log(data);
  var self = this;
  this.card = div().addClass('card col-xs-5').css('min-height','75px').css('height','100%');
  this.innerCard= div().css('background','rgba(246, 246, 246, 0.31)').css('margin-left','5px').css('margin-right','5px').css('margin-top','10px');
  this.eventImageView = div().css('height','50px');
  this.guestsView = div().addClass('row');
  $.each(data.guests,function(){self.guestsView.append($('<span>').text(this))});
  this.infoPanel = div().addClass('row text-center').append(
    div().addClass('col-xs-6 text-center').append(
      $('<i>').addClass('fa fa-clock-o'),
      div().text(data.startTime),
      div().text(data.endTime)
    ),

    div().addClass('col-xs-6 text-center').append(
      $('<i>').addClass('fa fa-map-marker'),
      div().text(data.address),
      div().text(data.city),
      div().text(data.zip)
    )
  );

  this.card.append(
    this.innerCard.append(
      this.eventImageView,
      this.guestsView,
      this.infoPanel
    )
  );
  return this.card;
};
