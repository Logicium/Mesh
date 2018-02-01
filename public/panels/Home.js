
var Home = function(){
    this.homePanel = $('<div>').addClass('homePanel');
    this.options = {name:"A C T I V I T Y",tools: [{name: "Search",icon:'search'}]}
    this.chooseLandingPage();
    console.log("Home panel.");
};

Home.prototype = {

    assemble:function(){
        return this.homePanel;
    },

    chooseLandingPage:function(){
        //SessionStorage.loginToken = {token:abc123}

        if(sessionStorage.getItem('token')===null){
          console.log(sessionStorage.getItem('token'));
            var s = new Signup();
        }
        else{
            this.homePanel = new UtilityPanel(this.options).utilityPanel;
        }
    }
};
