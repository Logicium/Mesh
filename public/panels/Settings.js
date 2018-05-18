var Config;
var Token = sessionStorage.getItem('token');

var SettingsPanel = function(){
    var options = {
      name: "S E T T I N G S",
      tools: [{name: "Search",icon:'search'}]
    }
    var U = new UtilityPanel(options);
    return U.utilityPanel;
};

var Settings = function(){

    postJSON("/settings/list",{token:Token}, function (data) {
        console.log(data);
        Config=data;
    });

    this.settings = div().addClass('settingsPanel').css('height','100%').css('width','100%');
    this.contentRow = row();
    this.nav = new SettingsNav();
    this.propCol = div();
    this.props = new Props(0);

    return this.settings.append(
        this.contentRow.append(
            this.nav,
            this.propCol.append(this.props)
        )
    );

};
