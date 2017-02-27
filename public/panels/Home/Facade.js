var FacadePanel = function(){
    this.facadePanel = $('<div>').addClass('facadePanel');
    this.backgroundImage = $('<div>').addClass('backgroundImage');
    this.appName = $('<div>').addClass('appName').text('O R G A');
    this.appDescription = $('<div>').addClass('appDescription');
    this.loginPanel = $('<div>').addClass('loginPanel');
    this.options = {'backgroundImage':'','':''};
    console.log("Facade panel.");
    this.setProperties();
    this.applyBanner();
    this.applyHomePage();
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
        return this.facadePanel;
    },

    applyHomePage: function(){
      var homeImage = 'https://images.unsplash.com/photo-1424298397478-4bd87a6a0f0c?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=8bdec4a5365fabf1948d8f1e9039b47a';
      $('.backgroundImage').css('background-image','linear-gradient(to left,rgba(24, 90, 157, 0.65), rgba(67, 206, 162, 0.65)), url('+ homeImage +')');
      $('.backgroundImage').removeClass('blur');
      this.bannerContainer.css('background','rgba(246, 246, 246, 0.31)');
      var homeContainer = $('<div>').addClass('homeContainer text-center');
      var taglineContainer = $('<div>').addClass('appTaglineContainer');
      taglineContainer.append($('<div>').addClass('line1').append('<div>Build <span class=\'green\'>your</span> own organization</div>'));
      taglineContainer.append($('<div>').addClass('line2').append('<div>Bring your crew together. Automate messages, tasks, events and more. <div>'));
      var loginContainer = $('<div>').addClass('loginContainer animated fadeInUp').append(this.applyLoginContainer());

      $(this.homePageContainer)
        .append($(homeContainer)
          .append(taglineContainer)
          .append(loginContainer)
        );
    },

    applyLoginContainer: function(){
      var container = $('<div>');
      var loginButton = $('<div>').addClass('loginButton').append('<div class=\"sign-up animated fadeInRight\"> <button class=\"button button--naira button--round-s button--border-thin button--naira-up green-background\"> <i class=\"button__icon fa fa-plus\"></i><span>Sign Up</span></button> </div>');
      var signupButton = $('<div>').addClass('signupButton').append(' <div class=\"log-in animated fadeInLeft\"> <button class=\"button button--naira button--round-s button--border-thin blue-background\"><i class=\"button__icon fa fa-user\"></i><span>Log In</span></button> </div>');
      var loginForm = $('.loginForm').append('');
      var signUpForm = $('.signupForm').append('');
      var loggedIn = $('.loggedIn');
      return $(container
        .append(loginButton)
        .append(signupButton)
        .append($(loginForm).hide())
        .append($(signUpForm).hide())
        .append($(loggedIn).hide())
      )
    },

    applyBanner: function(){
      var pictureURL = this.options['bannerImage'];
      var bannerName = this.options['bannerTitle'];
      var bannerTextContainer = $('<div>').addClass('bannerTextContainer col-xs-7').text(bannerName);
      bannerTextContainer.prepend($('<i>').addClass('fa fa-book'));
      var relatedUsers = $('<div>').addClass('relatedUsers col-xs-5 text-right');
      var container = $('<div>').css('padding-left','50px');
      var relatedUser = $('<div>').addClass('relatedUser');
      this.bannerContainer.append(bannerTextContainer);
      this.bannerContainer.css('background-image','linear-gradient(to left,rgba(24, 90, 157, 0.65), rgba(67, 206, 162, 0.65)), url('+ pictureURL +')');
    }
};
