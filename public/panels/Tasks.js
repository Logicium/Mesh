var Tasks = function(){


};

Tasks.prototype={
  assemble: function(){
    var options = {
      name:"T A S K S",
      tools: [
        {name: "Search",icon:'search'},
        {name: "New",icon:'plus',inputs:[
          'Name','Description','Due Date','Assignees'
        ]}
      ]
    }
    return new UtilityPanel(options).utilityPanel;
  },
};
