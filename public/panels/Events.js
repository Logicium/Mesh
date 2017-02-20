var Events = function(){


};

Events.prototype={
  assemble: function(){
    var options = {
      name:"E V E N T S",
      tools: [
        {name: "Search",icon:'search'},
        {name: "New",icon:'plus',inputs:[
          'Name','Guests','Description','Location','Date'
        ]}
      ]
    }
    return new UtilityPanel(options).utilityPanel;
  },
};
