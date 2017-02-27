var Members = function(){
  this.options = {
    name: "M E M B E R S",
    tools: [
      {name: "Search",icon:'search'},
      {name: "Add",icon:'plus',inputs:[
        'First Name','Last Name','Email','Image','Roles','Teams','Projects'
      ]}
    ]
  }
};

Members.prototype = {
  assemble: function(){
    return new UtilityPanel(this.options).utilityPanel;
  },
};
