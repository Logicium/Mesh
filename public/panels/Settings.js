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

    this.settings = $('<div>').addClass('settingsPanel').css('height','100%').css('width','100%');
    var bg = '';//default
    bg = _.find(Config,{name:'Interface'}).data.backgroundImage;
    this.contentRow = row();
    this.nav = new SettingsNav();
    this.propCol = div();
    this.props = new Props(0);

    swal.setDefaults({
        input: 'text',
        confirmButtonText: 'Next &rarr;',
        showCancelButton: false,
        showLoaderOnConfirm:true,
        animation: false,
        allowOutsideClick: false,
        progressSteps: ['1', '2']
    });

    var steps = [
        {
            title: 'Login',
            text: 'Enter your username below'
        },
        {
            title: 'Password',
            input:'password',
            showLoaderOnConfirm: true,
            text: 'Enter your password below'
        }
    ];

    if(Token === null || Token === 'null') {
        swal.queue(steps).then(function (result) {
            swal.resetDefaults();
            $.post('/settings/login', {username: result[0], password: result[1]})
                .done(function (data) {
                    console.log(data);
                    if (data.success) {
                        Token = data.token;
                        sessionStorage.setItem('token',data.token);
                        swal({title: data.message, type: 'success'})
                    }
                    else {
                        swal({title: data.message, type: 'error'})
                    }
                });
        }, function () {
            swal.resetDefaults();
        });
    }

    return this.settings.append(
        this.contentRow.append(
            this.nav,
            this.propCol.append(this.props)
        )
    );

};
