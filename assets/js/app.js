
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
        rating_min: 7.6,
        rating_max: 8.0
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
    plot: "full"
  };
  movieUrl += $.param(movieParam);
  $.ajax({url: movieUrl, method:"GET"})
    // response and call back are passed as arguments in done function
    .done(function(response) {
    //call movie detail function
    console.log(response);
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
  console.log(beerObj);
  var queryStyleId = beerObj.beerStyleId;
  var beerSearchParams = {
    key: breweryAPIKey,
    order: "random",
    styleId: queryStyleId,
  };

  if (queryStyleId === 30) {
    $("#liquid").addClass("ipa")
    $(".pour").addClass("ipa")
    $(".foam").addClass("ipa")
  }
  if (queryStyleId === 97) {
    $("#liquid").addClass("premium")
    $(".pour").addClass("premium")
    $(".foam").addClass("premium")
  }

  if (queryStyleId === 48) {
    $("#liquid").addClass("hef")
    $(".pour").addClass("hef")
    $(".foam").addClass("hef")
  }
 if (queryStyleId === 65) {
    $("#liquid").addClass("white")
    $(".pour").addClass("white")
    $(".foam").addClass("white")
  }
 if (queryStyleId === 93) {
    $("#liquid").addClass("lager")
    $(".pour").addClass("lager")
    $(".foam").addClass("lager")
  }
 if (queryStyleId === 22) {
    $("#liquid").addClass("redale")
    $(".pour").addClass("redale")
    $(".foam").addClass("redale")
  }
 if (queryStyleId === 25) {
    $("#liquid").addClass("pale")
    $(".pour").addClass("pale")
    $(".foam").addClass("pale")
  }
 if (queryStyleId === 100) {
    $("#liquid").addClass("malt")
    $(".pour").addClass("malt")
    $(".foam").addClass("malt")
  }
 if (queryStyleId === 31) {
    $("#liquid").addClass("dipa")
    $(".pour").addClass("dipa")
    $(".foam").addClass("dipa")
  }
 if (queryStyleId === 43) {
    $("#liquid").addClass("stout")
    $(".pour").addClass("stout")
    $(".foam").addClass("stout")
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
    console.log(beerRes);
    console.log(styleRes);
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
    $('#results').removeClass('hide');

});


//Creating a div for the movie image
function createMovieDiv (object){

$(".moviePoster").append(movieImg);


$(".movieTitle").append(movieP);


  // Div is created to contain movie image and title
// <<<<<<< HEAD
  // var movieDiv = $("<div>").addClass("col col-md-6");
  //New paragraph is created and displays the name of

// =======
  var movieDiv = $(".movieResults");
  //New paragraph is created and displays the name of
  var movieP = $("<h1>").addClass("col col-md-12 movieTitle")
// >>>>>>> master
    .text(object.title);

  $(".movieTitle").append(movieP);
  //var moviePlotP = $("<p>")addClass("col col-md-12")
    //.text(object.plot);
  var movieImg = $("<img>");
  movieImg.attr("src", object.posterURL);
  movieImg.attr("class", "img-responsive");
  $(".moviePoster").append(movieImg);

  movieImg.attr("id", "movieImgId")
    .data("plot", object.plot);
  movieDiv.append(movieImg)
    .append(movieP)
    //.append(moviePlotP)
    .insertBefore($("#buttonWrapper"));


};

//Creating a div for the beer image
function createBeerDiv(beerObj, styleObj){
  // Div is created to contain beer image and title

  $("#beerAnimationId").removeClass("hide");
  $('.searchA').removeClass('hide');

// <<<<<<< HEAD
//   // var beerDiv = $("<div>")
//   //   .append($("#beerAnimationId"))
//   //   .attr("id", "beerImgId");


//   var beerP = $("<h2>")
//     .text(styleObj.name);

//   $(".beerTitle").append(beerP);


//   // var beerDesc = $("<p>").addClass("col col-md-12")
//   //   .text(styleObj.description);

// =======
  var beerDiv = $(".beerResults")
    .append($("#beerAnimationId"))
    .data("description", styleObj.description)
    .attr("id", "beerImgId");

  var beerP = $("<h1>").addClass("col col-md-12 beerTitle")
    .text(styleObj.name);

// >>>>>>> master
  $("#wrapper").addClass("hide");


  beerDiv.append(beerP)
    // beerDiv.append(beerDesc)
    beerDiv.insertBefore($("#buttonWrapper"));
};
//Movie IMG onclick function


$("#results").on("click", "img", function(object) {
   var modal = new tingle.modal({
     footer: false,
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
 modal.setContent($(this).data('plot'));



 // open modal
 modal.open();
});



//Beer IMG onclick function
$("#beerAnimationId").on("click", function(object) {
  var modal = new tingle.modal({
    footer: false,
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
  modal.setContent(
    $('#beerImgId').data('description')


    );

  // open modal
  modal.open();
  });



$('.searchA').on("click", function() {
  $('.movieResults').empty();
  // $('.beerResults').empty();

  $(".beerTitle").remove();
  $("#results").addClass('hide');
  $("#wrapper").removeClass('hide');
  resetBeer();
});

function resetBeer() {
  $('.pour').css('height', '0px');
  $('#liquid').css('height', '0px');
  $('.beer-foam').css('bottom', '10px');
  $('.pour').css('display', 'block');

  $("#liquid").removeClass("redale stout dipa malt pale white hef premium lager ipa")
  $(".pour").removeClass("redale stout dipa malt pale white hef premium lager ipa")
  $(".foam").removeClass("redale stout dipa malt pale white hef premium lager ipa")


};
