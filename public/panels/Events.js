var Events = function(){


};

Events.prototype={
  assemble: function(){
    var options = {
      name:"E V E N T S",
      tools: [
        {name: "Search",icon:'search'},
        {name: "New",icon:'plus',inputs:[
          'Name','Hosts','Guests','Description','Location','Start Time','End Time','Image'
        ]}
      ]
    }
    return new UtilityPanel(options).utilityPanel;
  },
};
