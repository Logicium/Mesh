var Activity = function(){
    this.activtyPanel = $('<div>').addClass('activityPanel');
    this.actions = ['add,delete,']
};

Activity.prototype = {
  assemble: function(){
    var options = {
      name: "A C T I V I T Y",
      tools: [{name: "Search",icon:'search'}]
    }
    var U = new UtilityPanel(options);
    return U.utilityPanel;
  },
};

var ActivityPanel = function(name){
    this.activityPanel = col(8).addClass('animated fadeInUp').css('padding','0').css('margin-left','-15px');
    this.activityPanel.css('margin-top','15px').css('height','100%').css('width','calc(100% + 15px)');
    this.name = name.replace(/ /g,'').toLowerCase();
    this.cards = row().addClass('cards text-center');
    this.newMemberName = text('New Members:','white','20px').css('margin-right','-15px').css('background-color',transparentBlack());
    this.newMemberContent = div().addClass('newMembers');
    this.newMembers = col(4).append(this.newMemberName,this.newMemberContent);
    this.feed = col(8).addClass('feed');
    var self = this;
    $.post(''+self.name+'/list',{token:Token},function(data){
        console.log(data);
      $.each(data,function(){
          if(this.type != 'memberAdd'){ $(self.feed).append(new ActivityCard(this)); }
          else{ $(self.newMemberContent).append(new ActivityCard(this))}
      });
    });
    this.activityPanel.append(
        this.cards.append(this.feed,this.newMembers)
    );
    return $(this.activityPanel);
};
