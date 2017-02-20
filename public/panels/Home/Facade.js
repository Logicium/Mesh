var FacadePanel = function(){
    this.facadePanel = $('<div>').addClass('facadePanel');
    this.backgroundImage = $('<div>').addClass('backgroundImage');
    this.appName = $('<div>').addClass('appName');
    this.appDescription = $('<div>').addClass('appDescription');
    this.loginPanel = $('<div>').addClass('loginPanel');
    console.log("Facade panel.");
    this.setProperties();
    this.assemble();
};

FacadePanel.prototype = {
    setProperties:function(){
        this.facadePanel.css('height','100%').css('width','100%');
        this.backgroundImage.css('background-size','cover');
    },

    assemble:function(){
        this.facadePanel.append(
            this.backgroundImage.append(
                this.appName,
                this.appDescription,
                this.loginPanel
            )
        );
    }
};
