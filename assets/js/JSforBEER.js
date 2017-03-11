
$(document).ready(function() {
  // instanciate new modal 'are you 21?'
$('#wrapper').addClass('hide');

  var modal = new tingle.modal({
      footer: true,
      stickyFooter: false,
      closeLabel: "Close",
      cssClass: ['custom-class-1', 'custom-class-2'],
      onOpen: function() {
          console.log('modal open');
      },
      onClose: function() {
          console.log('modal closed');
      },
      beforeClose: function() {
          // here's goes some logic
          // e.g. save content before closing the modal
          return true; // close the modal
      	return false; // nothing happens
      }
  });

  // set content
  modal.setContent('<h1>Are you 21 years of age or older?</h1>');

  // add a button
  modal.addFooterBtn('Yes', 'yesBtn tingle-btn tingle-btn--primary', function() {
      // here goes some logic
      modal.close();
  });

  // add another button
  modal.addFooterBtn('No', 'tingle-btn tingle-btn--danger', function() {
      // here goes some logic
      modal.close();
  });

  // open modal
  modal.open();
  $('#wrapper').removeClass('hide');
  $('.yesBtn').on('click',function(){
    var fill=document.querySelector(".water-fill");
    TweenMax.fromTo(fill,0.8,{
      attr:{
        x:-400
      }
    },
    {
      attr:{
        x:0,
      },
      repeat:-1,
      ease:Linear.easeNone
    });

    TweenMax.fromTo(fill,10,{
      attr:{
        y:120,
        height:0
      },
    },{
      attr:{
        y:-20,
        height:140
      },
      repeat:00,
      yoyo:true,
      ease:Linear.easeNone
    });

  });
});
