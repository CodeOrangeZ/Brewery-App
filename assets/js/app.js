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
      brewJax(movieObj.rating, console.log);
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
  var movieImg = $("<img>");
  movieImg.attr("src", object.posterURL);
  movieImg.attr("id", "movieImgId");
  movieDiv.append(movieImg);
  movieDiv.append(movieP);

  $("#results").append(movieDiv);


};

//Creating a div for the beer image
function createBeerDiv (object){
// Div is created to contain beer image and title
  var beerDiv = $("<div>");
  var beerDisplay = object.title;
  var beerP = $("<p>").text(beerDisplay);
  var beerImg = $("<img>");

  beerImg.attr("src", object.posterURL);
  beerImg.attr("id", "beerImgId");
  beerDiv.append(beerImg);
  beerDiv.append(beerP);

  $("#results").append(beerDiv);


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
