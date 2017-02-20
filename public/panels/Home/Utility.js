
var UtilityPanel = function(options){
    this.options = options;
    this.utilityPanel = $('<div>').addClass('utilityPanel');
    this.activityPanel = $('<div>').addClass('activityPanel col-xs-8');
    this.northNavi = $('<div>').addClass('northNavi col-xs-8').css('height','125px');
    this.westNavi = $('<div>').addClass('westNavi col-xs-2');
    this.eastNavi = $('<div>').addClass('eastNavi col-xs-2');
    this.toolBar = new ToolBar(options.tools).assemble();
    console.log("Util panel.");
    this.setProperties();
    this.applyBanner();
    this.assemble();
};

UtilityPanel.prototype={
    setProperties: function(){
        this.utilityPanel.css('width','100%').css('height','100%');
        var bgImage = $('<div class="backgroundImage"></div>');
        var homeImage = 'https://images.unsplash.com/photo-1476908965434-f988d59d7abd?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&s=264e52cf5b973f5da848ee12dca724f2';
        $(bgImage).css('background-image','linear-gradient(to left,rgba(24, 90, 157, 0.45), rgba(67, 206, 162, 0.45)), url('+ homeImage +')');
        this.utilityPanel.append(bgImage);
        this.westNavi.css('height','100%').css('padding','0').css('min-width','150px');
        this.westNavi.append(new Navi().naviPanel);
        this.centeredText = $('<div>').css('padding-top','75px').addClass('centeredText text-center').text(this.options.name).css('font-family','Oswald').css('font-weight','300');
        this.northNavi.append(this.centeredText);
        this.northNavi.css('width','100%').css('height','200px').css('padding-left','0').css('padding-right','0');
        this.eastNavi.css('height','100vh').css('padding','0');
        this.eastNavi.append('<div>').text('DetailCard');
    },
    applyBanner: function(){
        this.westNavi.css('background','rgba(246, 246, 246, 0.31)');
        this.northNavi.css('background','rgba(246, 246, 246, 0.31)');//'linear-gradient(to left,rgba(24, 90, 157, 0.65), rgba(67, 206, 162, 0.65))');
        this.eastNavi.css('background','rgba(246, 246, 246, 0.31)');
    },
    assemble:function(){
        this.utilityPanel.append(
            this.westNavi,
            this.activityPanel.append(
              this.northNavi,
              this.toolBar
            ),
            this.eastNavi
        );
    }
};
