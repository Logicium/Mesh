var Teams = function(){



};

Teams.prototype={
  assemble: function(){
    var options = {
      name:"T E A M S",
      tools: [
        {name: "Search",icon:'search'},
        {name: "New",icon:'plus',inputs:[
          'Name','Description','Members','Projects'
        ]},
      ]
    }
    return new UtilityPanel(options).utilityPanel;
  },
};
