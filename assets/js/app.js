$(document).ready(function() {

  $(".contentDiv").addClass("hide");
  $(".beaker").addClass("hide");


  // instanciate new modal 'are you 21?'
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
      $(".contentDiv").removeClass("hide");

      var audio = document.getElementsByTagName("audio")[0];
      audio.play();



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
            y:7,
            height:140
          },
          repeat: 0,
          yoyo:true,
          ease:Linear.easeNone
        });



  });

  // add another button
  modal.addFooterBtn('No', 'tingle-btn tingle-btn--danger', function() {
      // here goes some logic
      modal.close();
      console.log("you're not 21");
      $(".not21").removeClass('hide');
      
  });

  // open modal
  modal.open();

});







/**
  * Brewery DB & OMDB app
  *
  */


//object maps beer styles to rating ranges
const beerToRating = {
  "American Style Premium Lager" : {
        beerStyleId: 97,
        rating_min: 8.6,
        rating_max: 10.0
      },

  "South German Style Hefeweizen" : {
        beerStyleId: 48,
        rating_min: 8.1,
        rating_max: 8.5
      },

  "Belgian Style White" : {
        beerStyleId: 65,
        rating_min: 8.0,
        rating_max: 7.6
      },

  "American Style Lager" : {
        beerStyleId: 93,
        rating_min: 7.1,
        rating_max: 7.5
      },
  "Irish Style Red Ale" : {
        beerStyleId: 22,
        rating_min: 6.6,
        rating_max: 7.0
      },

  "American Style Pale Ale" : {
        beerStyleId: 25,
        rating_min: 6.1,
        rating_max: 6.5
      },

  "American Style IPA" : {
        beerStyleId: 30,
        rating_min: 5.6,
        rating_max: 6.0
      },

  "American Style Malt Liquor" : {
        beerStyleId: 100,
        rating_min: 5.1,
        rating_max: 5.5
      },

  "Imperial or Double IPA" : {
        beerStyleId: 31,
        rating_min: 4.1,
        rating_max: 5.0
      },

  "American Style Imperial Stout" : {
        beerStyleId: 43,
        rating_min: 0,
        rating_max: 4.0
      },

};


// this is the CORS workaround function
/**
  * Function for extracting the appropriate beer based on ratings
  * @param "requestUrl" {string} - Url for breweryDB api call
  * @return {object} - response from ajax call, need to handle .done() outside
  */
let proxyCall = (requestURL) => {
  return $.ajax({
    method: "POST",
    dataType: "json",
    url: "https://proxy-cbc.herokuapp.com/proxy",
    data: {
      url: requestURL
    }
  });
};


/**
  * function for extracting the appropriate beer based on ratings
  * @param "movie" {string} - query parameter for api call
  * @param "cb" {function} - callback to call on response
  * @return {void}
  */
var movieJax = function(movie, cb){
  var movieUrl = "http://www.omdbapi.com/?";//API key not necessary
  var movieParam = {
    t: movie,
  };
  movieUrl += $.param(movieParam);
  $.ajax({url: movieUrl, method:"GET"})
    // response and call back are passed as arguments in done function
    .done(function(response) {
    //call movie detail function
    var movieObj = {};
    //stored desired paramters in vars
    	movieObj.title = response.Title;
    	movieObj.posterURL = response.Poster;
    	movieObj.plot = response.Plot;
    	movieObj.rating = parseFloat(response.imdbRating);
      brewJax(movieObj.rating, createBeerDiv);
      cb(movieObj);
  });
}


/**
  * Function for extracting the appropriate beer based on ratings
  * @param "beerMap" {object} - The object we use for holding the beer values
  * @param "rate" {number} - the rating value we recieve from the OMBD api
  * @return {object} - the object stored at the style name key
  */
let extractStyle = function(beerMap, rate) {
  for(key in beerMap) {
    if(beerMap[key].rating_min <= rate && rate <= beerMap[key].rating_max) {
      return beerMap[key];
    }
  };
}


/**
  * Function for extracting the appropriate beer based on ratings
  * @param "rating" {number} - rating to base style extraction on, for api call
  * @param "cb" {function} - callback to call on response
  * @return {void}
  */
let brewJax = function(rating, cb) {
  var breweryUrl = "http://api.brewerydb.com/v2/beers/?"; //this is the base, the API endpoint will need to be specified
  var breweryAPIKey = "a2bbeb0349946cb230fb7cc9a584a5a4";
  var beerObj = extractStyle(beerToRating, rating);
  var queryStyleId = beerObj.beerStyleId;
  var beerSearchParams = {
    key: breweryAPIKey,
    order: "random",
    styleId: queryStyleId,
  };
  //send request to breweryDB for specific beer style.
  breweryUrl += $.param(beerSearchParams);
  proxyCall(breweryUrl).done(function(res){
    var beerRes = {};
    var styleRes = {};
    var r = res.data.data[0];
    beerRes.name = r.name;
    beerRes.description = r.description;
    beerRes.abv = r.abv || "No Abv Data";
    beerRes.labels = r.labels;
    styleRes = r.style;
    cb(beerRes, styleRes);
  })
}





/**
  * Below is where the controller logic will go
  * This will operate on the data for adding css classes.
  * changing elements, etc
  */

$("#movieSubmit").on("click", function(event){
    event.preventDefault();
    $("#wrapper").addClass("hide");
        $(".beaker").removeClass("hide");
        // $("#liquid").addClass("stout");
        // $(".pour").addClass("stout");
        // $(".foam").addClass("stout");
    var mov = $("#movieTitle").val().trim();
    movieJax(mov, createMovieDiv);
});


//Creating a div for the movie image
function createMovieDiv (object){
// Div is created to contain movie image and title
  var movieDiv = $("<div>");
  var movieDisplay = object.title;
  //New paragraph is created and displays the name of
  var movieP = $("<p>").text(movieDisplay);
  var moviePlotP = $("<p>").text(object.plot);
  var movieImg = $("<img>");
  movieImg.attr("src", object.posterURL);
  movieImg.attr("id", "movieImgId");
  movieDiv.append(movieImg)
    .append(movieP)
    .append(moviePlotP)
    .appendTo($("#results"));


};

//Creating a div for the beer image
function createBeerDiv(styleObj, beerObj){
// Div is created to contain beer image and title
  var beerDiv = $("<div>");
  var beerDisplay = styleObj.name;
  var beerP = $("<p>").text(beerDisplay);
  var beerDesc = $("<p>").text(styleObj.description);

  //var beerImg = $("<img>");

  //beerImg.attr("src", object.posterURL);
  //beerImg.attr("id", "beerImgId");
  beerDiv.append(beerP)
    .appendTo($("#results"));


};
//Movie IMG onclick function
$("#movieImgId").on("click", "img", function(object) {
  $("#results").empty();
  var movieInfoDiv = $("<div>");
  var movieName = $("<h1>").text(object.title);
  var movieDescription = $("<p>").text(object.plot);

  movieInfoDiv.append(movieName);
  movieInfoDiv.append(movieDescription);

  $("#results").append(movieInfoDiv);

});

//Beer IMG onclick function
$("#beerImgId").on("click", "img", function(object) {
  $("#results").empty();
  var beerInfoDiv = $("<div>");
  var beerName = $("<h1>").text(object.style);
  var beerDescription = $("<p>").text(object.description);
  var beerRecommendation = $("<p>").text("We recommend: " + beerName);


  beerInfoDiv.append(beerName);
  beerInfoDiv.append(beerDescription);
  beerInfoDiv.append(beerRecommendation);

  $("#results").append(beerInfoDiv);

});















