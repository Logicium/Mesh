
var Home = function(){
    this.homePanel = $('<div>').addClass('homePanel');
    this.facadePanel = new FacadePanel().facadePanel;
    var options = {name:"A C T I V I T Y",tools: [{name: "Search",icon:'search'}]}
    this.utilityPanel = new UtilityPanel(options).utilityPanel;
    this.chooseLandingPage();
    console.log("Home panel.");
};

Home.prototype={

    assemble:function(){
        return this.homePanel;
    },

    chooseLandingPage:function(){
        //SessionStorage.loginToken = {token:abc123}
        if(sessionStorage.getItem('loginToken')===undefined){
            this.homePanel = this.facadePanel;
        }
        else{
            this.homePanel = this.utilityPanel;
        }
    }
};
