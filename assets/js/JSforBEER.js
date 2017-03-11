document.addEventListener("DOMContentLoaded",function(){
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
