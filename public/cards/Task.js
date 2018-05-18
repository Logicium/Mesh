var TaskCard = function(TaskData){

  var self = this;
  this.card = col(3).addClass('card').css('margin-top','10px');
  this.content = div().addClass('contentCard').css({'margin-right':'-15px'});
  var nameRowCss = {'margin':'0 auto','min-height':'50px','background':transparentBlack(),'letter-spacing':'6px','text-transform':'uppercase'};
  this.nameRow = div().append(text(TaskData.name.toUpperCase(),'white','large')).css(nameRowCss).css('font-family','Open Sans Condensed');
  this.description = row().append(text(TaskData.description,'white','14px').css({'margin':'0 auto'})).css({'padding':'5px','min-height':'50px','font-style':'italic', 'background':transparentBlack()});
  this.membersRow = row().css({'background':transparentBlack(),'padding':'5px'});
  postJSON('/members/find',{_id:TaskData.creator},function(newData){self.membersRow.append(new MemberIconMd(4,newData[0].image))});
  $.each(TaskData.members,function(){ postJSON('/members/find',{_id:this},function(newData){self.membersRow.append(new MemberIconMd(4,newData[0].image))}); });
  this.chartRow = row().css({'min-height':'75px','padding-bottom':'10px','padding-right':'20px','padding-left':'20px', 'background':transparentWhite()});
  this.chart = canvas().attr('id','chart-'+TaskData._id).css({'height':'75px','width':'75px'});
  self.viewFull = div().addClass('animated fadeIn viewFull').css(Styles.click()).css('background-color',transparentBlack()).css({'height':'100%','width':'calc( 100% - 15px )','position':'absolute','z-index':'10'}).append(
      text('View Full','white','24px').css('letter-spacing','6px').css('text-transform', 'uppercase')
          .css('font-family','Open Sans Condensed').css({'padding-top':'145px'})
  ).click(function(){$('.activityPanel').replaceWith(new TaskPage(TaskData));});

  this.card.click(function(){
      $('.viewFull').detach();
      $('.contentCard').css('filter','blur(0px)');
      self.content.css('filter','blur(5px)');
      self.card.prepend(self.viewFull);
      $('.eastNavi').replaceWith(new DetailCard(TaskData));
  });

  $(function(){
    var due = new Date(+TaskData.due);
    console.log(due.toString());
    var timeLeft = new Date();
    //timeLeft.setTime(due - timeLeft.getTime() );
    var diff =  new Date(due.getTime() - timeLeft.getTime());
    var days = diff.getUTCDate()-1;
    var ctx = $('#chart-'+TaskData._id);
    var options = {
      legend:{display:false},
      title:{display:true,fontSize:'16',fontStyle:'normal',fontColor:transparentBlack(),fontFamily:'Roboto Condensed',text:'Due  |  '+formatDate(new Date(+TaskData.due))},
    };
    var data = {
        datasets: [{ data: [days,30-days],backgroundColor: [transparentWhite(),transparentBlack()] }],
        labels: [ 'Days Left','Days Elapsed' ],
    };
    var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: options
    });
  });

  return  this.card.append(this.content.append(
    this.nameRow,
    this.membersRow,
    this.description,
    this.chartRow.append(this.chart)
  ));

};
