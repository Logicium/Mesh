//Add top picture,
//View Full Page Button
//Title Over Top picture

var PrivateDetailCard = function(json){
    var self = this;
    this.card = col(2).addClass('eastNavi').css('height','100vh').css('padding','0').css('background-color',transparentWhite());
    this.props = div().css('padding','25px').height('100vh').css('overflow-y','scroll');
    var pathName = '';
    iterate(json,0,pathName);
    function iterate(obj,count,pathName) {
        var count = count || 0;
        console.log('count'+count);
        for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
                if (obj[property] instanceof Array && obj[property].length>0) {
                    var propertyString = property;
                    propertyString = '.'+propertyString;
                    self.props.append(new ArrayTitle(property,pathName+propertyString,obj[property][0]));
                    iterate(obj[property],count,pathName+propertyString);
                }
                else if (typeof obj[property] == "object") {
                    self.props.append(new PropTitle(property));
                    var propertyString = property;
                    propertyString = '.'+propertyString;
                    iterate(obj[property],count,pathName+propertyString);
                }
                else {
                    console.log(property + "   " + obj[property]);
                    self.props.append(new PrivateProperty(property,obj[property],count,pathName));
                    count+=1;
                }
            }
        }
    }

    return this.card.append(this.props);
};

var DetailCard = function(json){
    var self = this;
    this.card = col(2).addClass('eastNavi').css('height','100vh').css('padding','0').css('background-color',transparentWhite());
    this.card.attr('data-objectdata',JSON.stringify(json));
    this.props = div().css('padding','25px').height('100vh').css('overflow-y','scroll');
    var pathName = '';
    iterate(json,0,pathName);
    function iterate(obj,count,pathName) {
        var count = count || 0;
        console.log('count'+count);
        for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
                if (obj[property] instanceof Array && obj[property].length>0) {
                    var propertyString = property;
                    propertyString = '.'+propertyString;
                    self.props.append(new ArrayTitle(property,pathName+propertyString,obj[property][0]));
                    iterate(obj[property],count,pathName+propertyString);
                }
                else if (typeof obj[property] == "object") {
                    self.props.append(new PropTitle(property));
                    var propertyString = property;
                    propertyString = '.'+propertyString;
                    iterate(obj[property],count,pathName+propertyString);
                }
                else {
                    console.log(property + "   " + obj[property]);
                    self.props.append(new PropertyTall(property,obj[property],count,pathName));
                    count+=1;
                }
            }
        }
    }
    this.card.resizable();
    return this.card.append(this.props);
};
