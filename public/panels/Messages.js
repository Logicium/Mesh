var Messages = function(){
    var messagePanel = $('<div>').addClass('activityCard');
};

Messages.prototype={
  assemble: function(){
    var options = {
      name:"M E S S A G E S",
      tools: [
        {name: "Search",icon:'search'},
        {name: "New",icon:'plus',inputs:[
          'To','From','Message','Media'
        ]}
      ]
    }
    return new UtilityPanel(options).utilityPanel;
  },
};
