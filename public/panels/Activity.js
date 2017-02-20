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
    return new UtilityPanel(options).utilityPanel;
  },
};
