# Brewery-App

Beer and a Movie App is a application designed to help you find a style of beer to drink based on what movie you're watching.

## Technologies used
Here are some technologies used:

- BreweryDB
- OMDB API
- tingle.js
- CSS3 Animations
- Firebase
- Html5
- Javascript
- Jquery

## Getting Started

Heroku Link

1. Search for a movie in the search-bar
2. receive results regarding that movie
3. click on the beer or movie poster for more information
4. search again




## Built With

* Atom - Sublime Text is pretty cool too I guess
* Firebase - The Database
* HTML - The Content
* CSS3 - Lots and lots of CSS3
* Tingle.js - The Modals

## Walk throughs of code
Here's some code for one of our modals.

```
var modal = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeLabel: "Close",
    cssClass: ['custom-class-1', 'custom-class-2', 'firstModal'],
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
   // Code for the push
   over21++
    firebase.database().ref().set({
      under21: under21,
      over21: over21
    });

    // here goes some logic
    modal.close();
    $(".contentDiv").removeClass("hide");
```

## Authors

Built with a love for beer by:
Iman Hamidi
Gregory Lee
Oscar Luna
Zackery Rilling


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to robin parisi for his tingle.js that gave us modals
* Thanks to the alcohol i was drinking that gave me the idea
* Thanks Mom and Dad
