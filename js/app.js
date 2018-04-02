/*
 * This function run when the initial HTML document has been completely loaded
   and parsed, without waiting for stylesheets, images, and subframes
   to finish loading.
*/

document.addEventListener("DOMContentLoaded", function(ev) {

  /*
   * Create a list that holds all of your cards
   */

   const cardsList = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor",
      "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle",
      "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt",
      "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];


   const starsPnl = document.querySelector('.stars');
   const movesDisplay = document.querySelector('.moves');
   const restartBtn = document.querySelector('.restart');
   const deck = document.querySelector('.deck');
   const cards = document.querySelectorAll('.deck li');

   let shuffledCardsList = [];   // Holds all of the cards after shuffling



  /*
   * Display the cards on the page
   *   - shuffle the list of cards using the provided "shuffle" method below
   *   - loop through each card and create its HTML
   *   - add each card's HTML to the page
   */

  // Shuffle function from http://stackoverflow.com/a/2450976
  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  function init() {

    //Shuffling the deck
    shuffledCardsList = shuffle(cardsList);

    // Clean HTML (remove 'i' nodes from the DOM)
    for (let card = 0; card < cards.length; card++) {

      cards[card].setAttribute("data-card-number", card);
      cards[card].firstElementChild.remove();
    }
  }

  init();


  /*
   * set up the event listener for a card. If a card is clicked:
   *  - display the card's symbol (put this functionality in another function that you call from this one)
   *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
   *  - if the list already has another card, check to see if the two cards match
   *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
   *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
   *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
   *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
   */


   // This function add a card to the deck.

   // It uses the cardNumber as an index for 'shuffledCardsList'. Then,
   // it appends a new html element to the li element (target parameter)
   // that fired the 'click' event.
   function addCardHTML(cardNumber, target) {

     let card = document.createElement("i");
     console.log("shuffledCardsList[cardNumber] >>>", shuffledCardsList[cardNumber]);
     card.className=shuffledCardsList[cardNumber];

     target.appendChild(card);
   }

});
