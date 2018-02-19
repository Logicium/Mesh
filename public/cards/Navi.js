
var Navi = function(){
    this.naviPanel = $('<div>').addClass('naviPanel');
    this.homeBox = $('<div>').addClass('homeBox');
    this.utilitiesSelection = $('<div>').addClass('utilitiesSelection').width('100%');
    this.utilitiesList = [
        {name:'Activity',icon:'rss'},
        {name:'Messages',icon:'comments'},
        {name:'Members',icon:'users'},
        {name:'Events',icon:'calendar'},
        {name:'Projects',icon:'cubes'},
        {name:'Teams',icon:'university'},
        {name:'Roles',icon:'briefcase'},
        {name:'Tasks',icon:'tasks'},
        {name:'Profile',icon:'user'},
        {name:'Settings',icon:'cog'}
    ];

    console.log("Navi component.");
    this.assemble();
};

Navi.prototype={
    assemble:function(){
        var $self = this;
        this.naviPanel.css('height','100vh');
        this.homeBox.css('height','100px').css('min-width','75px').css('margin','10px');
        this.homeBox.css('font-family','Oswald').css('font-weight','300').css('font-size','large').text("O R G A");
        $.each(this.utilitiesList,function(){
            $self.utilitiesSelection.append(new UtilitySelectionCard(this).utilitySelectionCard);
        });
        this.naviPanel.append(
            this.homeBox,
            this.utilitiesSelection
        );
    }
};

var UtilitySelectionCard = function(data){
    this.utilitySelectionCard = div().addClass('utilitySelectionCard').css('width','100%').hover(
        function(){$(this).animate({'background-color':transparentBlack(),'color':'white'},300);},
        function(){$(this).animate({'background-color':transparent(),'color':'black'},300)}
    );
    var self = this;
    this.utilitySelectionCard.click(function(){return self.clicked(this)});
    this.nameBox = row().append( buttonCol( data.name,12 ).removeClass('cta').addClass('nameBox').prepend($('<i>').addClass('fa fa-'+data.icon)) )
    this.assemble();
};

UtilitySelectionCard.prototype = {

    clicked:function(self){
      var name = $(self).find('.nameBox').text();
      $('.utilityPanel').replaceWith( $( this.clickedActivity(name) ) );
    },

    clickedActivity:function(name){
        if(name=="Activity"){return new Activity().assemble()}
        else if(name=="Messages"){return new Conversations()}
        else if(name=="Members"){return new Members().assemble()}
        else if(name=="Events"){return new Events().assemble()}
        else if(name=="Projects"){return new Projects().assemble()}
        else if(name=="Roles"){return new Roles().assemble()}
        else if(name=="Tasks"){return new Tasks().assemble()}
        else if(name=="Teams"){return new Teams().assemble()}
        else if(name=="Profile"){return new Profile().assemble()}
        else if(name=="Settings"){return new SettingsPanel()}
    },

    assemble:function(){
        this.utilitySelectionCard.append(
            this.nameBox
        );
    }
};
