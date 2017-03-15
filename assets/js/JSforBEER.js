// $(document).ready(function() {


//   $(".contentDiv").addClass("hide");


//   // instanciate new modal 'are you 21?'
//   var modal = new tingle.modal({
//       footer: true,
//       stickyFooter: false,
//       closeLabel: "Close",
//       cssClass: ['custom-class-1', 'custom-class-2'],
//       onOpen: function() {
//           console.log('modal open');
//       },
//       onClose: function() {
//           console.log('modal closed');
//       },
//       beforeClose: function() {
//           // here's goes some logic
//           // e.g. save content before closing the modal
//           return true; // close the modal
//         return false; // nothing happens
//       }
//   });

//   // set content
//   modal.setContent('<h1>Are you 21 years of age or older?</h1>');

//   // add a button
//   modal.addFooterBtn('Yes', 'yesBtn tingle-btn tingle-btn--primary', function() {
//       // here goes some logic
//       modal.close();
//       $(".contentDiv").removeClass("hide");

//       var audio = document.getElementsByTagName("audio")[0];
//       audio.play();



//         var fill=document.querySelector(".water-fill");
//         TweenMax.fromTo(fill,0.8,{
//           attr:{
//             x:-400
//           }
//         },
//         {
//           attr:{
//             x:0,
//           },

//           repeat:-1,
//           ease:Linear.easeNone
//         });

//         TweenMax.fromTo(fill,10,{
//           attr:{
//             y:120,
//             height:0
//           },
//         },{
//           attr:{
//             y:7,
//             height:140
//           },
//           repeat: 0,
//           yoyo:true,
//           ease:Linear.easeNone
//         });



//   });

//   // add another button
//   modal.addFooterBtn('No', 'tingle-btn tingle-btn--danger', function() {
//       // here goes some logic
//       modal.close();
//       $(".not21").removeClass('hide');
      
//   });

//   // open modal
//   modal.open();

// });






//function to fade in the second half of title



