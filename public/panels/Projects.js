var Projects = function(){



};

Projects.prototype={
  assemble: function(){
    var options = {
      name:"P R O J E C T S",
      tools: [
        {name: "Search",icon:'search'},
        {name: "New",icon:'plus',inputs:[
          'Name','Description','Invitees'
        ]}
      ]
    }
    return new UtilityPanel(options).utilityPanel;
  },

};
