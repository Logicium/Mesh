var Roles = function(){



};

Roles.prototype={
    assemble: function(){
      var options = {
        name:"R O L E S",
        tools: [
          {name: "Search",icon:'search'},
          {name: "New",icon:'plus',inputs:['Name','Hashtags','Description','Image','Members']}
        ]
      }
      return new UtilityPanel(options).utilityPanel;
    },
};
