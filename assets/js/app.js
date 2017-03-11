/**
  * Brewery DB & OMDB app
  * this file so far a has mostly the back-end logic, middleware and front end
  */

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

//dummy variables, these will be addressed when the html pages start to take shape;




//send a request to OMDB and parse response


// create function taht renders movie details


// ajax is stored in a variable with movieurl and call back arguements
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

      cb(movieObj);
  });
}


//response from OMDB will need to be operated on to map it to a specific beer style.
//heavier beer for worse movies. Better movies, Lighter beer.
/**
  * Function for extracting the appropriate beer based on ratings
  * @param "beerMap" {object} - The object we use for holding the beer values
  * @param "rate" {number} - the rating value we recieve from the OMBD api
  * @return {object} - the object stored at
  */
let extractStyle = function(beerMap, rate) {
  for(key in beerMap) {
    if(beerMap[key].rating_min <= rate <= beerMap[key].rating_max) {
      return beerMap[key];
    }
  };
}


/**
  * Function for extracting the appropriate beer based on ratings
  * @param "breweryUrl" {string} - Url for api call
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
    //hasLabels: "Y"
  };
  //send request to breweryDB for specific beer style.
  breweryUrl += $.param(beerSearchParams);
  $.ajax({
    url:breweryUrl,
    method: "GET",
  //   crossDomain : true,
  //   xhrFields: {
  //     withCredentials: true
  //  }
  })
  .done(function(res){
    var beerRes = {};
    var styleRes = {};
    var r = res.data[0];
    beerRes.name = r.name;
    beerRes.description = r.description;
    beerRes.abv = r.abv || "No Abv Data";
    beerRes.labels = r.labels;
    styleRes = r.style;

    cb(beerRes, styleRes);


  })
}


//send data to controller/middleware logic.




//need to find a way to incorporate the firebase database.




/**
  * Below is where the controller logic will go
  * This will operate on the data for adding css classes.
  * changing elements, etc
  */

$("#movieSubmit").on("click", function(event){
    event.preventDefault();
    var mov = $("#movieTitle").val().trim();
    movieJax(mov, console.log);
});
