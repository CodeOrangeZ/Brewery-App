/**
  * Brewery DB & OMDB app
  * this file so far a has mostly the back-end logic, middleware and front end
  */

var movieUrl = "http://www.omdbapi.com/?";//API key not necessary
var movieObj = {};
var breweryUrl = "http://api.brewerydb.com/v2/"; //this is the base, the API endpoint will need to be specified
var breweryAPIKey = "a2bbeb0349946cb230fb7cc9a584a5a4";
const beerToRating = {
  "American Style Premium Lager" : {
        "beerStyleId": 97,
        "rating_min": 8.6,
        "rating_max": 10.0
      },

  "South German Style Hefeweizen" : {
        "beerStyleId": 48,
        "rating_min": 8.1,
        "rating_max": 8.5
      },

  "Belgian Style White" : {
        "beerStyleId": 65,
        "rating_min": 8.0,
        "rating_max": 7.6
      },

  "American Style Lager" : {
        "beerStyleId": 93,
        "rating_min": 7.1,
        "rating_max": 7.5
      },
  "Irish Style Red Ale" : {
        "beerStyleId": 22,
        "rating_min": 6.6,
        "rating_max": 7.0
      },

  "American Style Pale Ale" : {
        "beerStyleId": 25,
        "rating_min": 6.1,
        "rating_max": 6.5
      },

  "American Style IPA" : {
        "beerStyleId": 30,
        "rating_min": 5.6,
        "rating_max": 6.0
      },

  "American Style Malt Liquor" : {
        "beerStyleId": 100,
        "rating_min": 5.1,
        "rating_max": 5.5
      },

  "Imperial or Double IPA" : {
        "beerStyleId": 31,
        "rating_min": 4.1,
        "rating_max": 5.0
      },

  "American Style Imperial Stout" : {
        "beerStyleId": 43,
        "rating_min": 0,
        "rating_max": 4.0
      },

};

//dummy variables, these will be addressed when the html pages start to take shape;




//send a request to OMDB and parse response

// var authKey ="4d1ad40435947a343ddbc3ef02f71d77";

// create function taht renders movie details




$.ajax({url: queryURLBase, method:"GET"})
.done(function(response) {

//call movie detail function 

//stored desired paramters in vars
	movieObj,title = response.title;
	movieObj.poster = response.poster;
	movieObj.plot = response.plot;
	movieObj.rating = response.rating;
	console.log(response);
});

//create another function that will make ajax call 
// to beer and pass those vars ars arguments



//response from OMDB will need to be operated on to map it to a specific beer style.
//heavier beer for worse movies. Better movies, Lighter beer.


 



//send request to breweryDB for specific beer style.




//send data to controller/middleware logic.




//need to find a way to incorporate the firebase database.




/**
  * Below is where the controller logic will go
  * This will operate on the data for adding css classes.
  * changing elements, etc
  */
