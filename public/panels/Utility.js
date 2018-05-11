var Config;
var Token = sessionStorage.getItem('token');

var UtilityPanel = function(options){

    postJSON("/settings/list",{token:Token}, function (data) {
        console.log(data);
        Config=data;
    });

    this.options = options;
    this.utilityPanel = div().addClass('utilityPanel');
    this.utilityPanel.css('width','100%').css('height','100%');
    var bgImage = div().addClass('backgroundImage');
    var homeImage = _.find(Config,{name:'Interface'}).data.backgroundImage;
    $(bgImage).css('background-image','linear-gradient(to left,rgba(0,164,216, 0.20), rgba(0,163,255,0.20)), url('+ homeImage +')');
    this.utilityPanel.append(bgImage);

    this.activityPanel = div().addClass('activityPanel col-xs-8').height('100vh').css('overflow-y','scroll');
    this.activityPanel.resizable();
    this.activityPanel.resize(function(){
       $('.eastNavi').width($(".utilityPanel").width()-$(".activityPanel").width()-$(".westNavi").width());
    });

    this.westNavi = div().addClass('westNavi col-xs-2');
    this.westNavi.css('height','100%').css('padding','0').css('min-width','150px');
    this.westNavi.append(new Navi().naviPanel);
    this.westNavi.css('background','rgba(246, 246, 246, 0.31)');

    this.tools = new ModernToolbar(options.tools);
    this.centeredText = div().css('padding-top','75px').addClass('centeredText topTitle text-center').text(this.options.name).css('font-family','Oswald').css('font-weight','300');
    this.northNavi = div().addClass('northNavi col-xs-8');
    this.northNavi.css('width','100%').css('height','200px').css('padding-left','0').css('padding-right','0');
    this.northNavi.css('background','rgba(246, 246, 246, 0.31)');
    this.northNavi.append(this.tools,this.centeredText);

    this.eastNavi = div().addClass('eastNavi col-xs-2');
    this.eastNavi.css('height','100vh').css('padding','0');
    this.eastNavi.append('<div>').text('DetailCard');
    this.eastNavi.css('background','rgba(246, 246, 246, 0.31)');
    $(window).resize(function(){
       $('.eastNavi').width($(".utilityPanel").width()-$(".activityPanel").width()-$(".westNavi").width());
    });

    this.cardPanel = new CardPanel(options.name).assemble();
    if(options.name === "A C T I V I T Y"){this.cardPanel = new ActivityPanel(options.name)}
    else if(options.name === "P R O F I L E"){ this.cardPanel = new ProfilePanel(options.name)}
    else if(options.name === "S E T T I N G S"){ this.cardPanel = new Settings(options.name)}

    if(options.name === "C O N V E R S A T I O N S"){
        this.activityPanel = new ConversationsPanel();
        this.utilityPanel.append(
            this.westNavi,
            this.activityPanel,
            this.eastNavi
        );
    }else{
        this.utilityPanel.append(
            this.westNavi,
            this.activityPanel.append(
              this.northNavi,
              this.cardPanel
            ),
            this.eastNavi
        );
    }
    console.log("Util panel.");
};
