/*
 * This function runs when the initial HTML document has been completely loaded
 * and parsed, without waiting for stylesheets, images, and subframes
 * to finish loading.
 */

document.addEventListener("DOMContentLoaded", function(ev) {

  /*
   * Create a list that holds all of your cards
   */

   const cardsList = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor",
      "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle",
      "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt",
      "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];


   const stars = document.querySelectorAll('.stars li');
   const movesDisplay = document.querySelector('.moves');
   const restartBtn = document.querySelector('.restart');
   const congrModalRestartBtn = document.querySelector('.congr-modal-footer .restart');
   const deck = document.querySelector('.deck');
   const cards = document.querySelectorAll('.deck li');
   const scorePanel = document.querySelector('.score-panel');
   const congrModal = document.querySelector('.congr-modal');
   const instructions = document.querySelector('.container p');
   const modal_time = document.querySelector('.congr-score-time');
   const modal_moves = document.querySelector('.congr-score-moves');
   const modal_stars = document.querySelector('.congr-score-stars');

   let shuffledCardsList = [];   // Holds all of the cards after shuffling
   let openCards = [];   // "Open" cards list
   let clickable = true;
   let moves = 0;   // Moves counter
   let moves_incrementOrNot = false;
   let matchedCards = 0;   // Matched cards (16 cards in the deck -> maximum is 8)
   let starCounter = 3;   // Initial stars number

   // Variables for timer
   let timerIsActive = false;
   let timerInterval;
   let sec = 0;
   let min = 0;
   let timerHTMLElement;


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


  /*
  * First function to be executed: initializes the game variables
  */

  function init() {

    matchedCards = 0;   // Still no matched cards!
    openCards = [];

    //Shuffling the deck
    shuffledCardsList = shuffle(cardsList);

    // Removing 'i' nodes from the DOM (hiding the deck's configuration
    // to the 'shrewd' player!)
    for (let card = 0; card < cards.length; card++) {

      // Now a number identifies the card ('data-card-number')
      cards[card].setAttribute('data-card-number', card);
      cards[card].className = 'card';

      if (cards[card].firstElementChild) cards[card].firstElementChild.remove();
    }

    for (let star = 0; star < stars.length; star++) {

      stars[star].removeAttribute('class');
    }

    // Initializes the moves counter
    moves_incrementOrNot = false;   // Not strictly necessary!
    moves = 0;
    movesDisplay.innerHTML = moves;   // Initializes the moves display
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

   deck.addEventListener('click', function (evt) {

     if (evt.target.className === 'card' && clickable) {

       hideInstr();   // Hides the instructions
       startTimer();   // Starts the timer
       showCard(evt);   // Shows clicked card
       addAndCheck(evt);   // Adds the card to the 'open' list and checks if matches
       incrementMoveCounter();   // Increments the moves counter
       manageStars();   // Manages the stars display
       checkGameOver();   // If all cards have matched displays a congr modal
     }
   });   //deck.addEventListener

   function showCard(evt) {

     let cardNumber = evt.target.dataset.cardNumber; // Retrieves the clicked card number

     addCardHTML(cardNumber, evt.target);   // Adds the clicked card to the DOM
     evt.target.classList.toggle("open");
     evt.target.classList.toggle("show");
   }

   function hideInstr() {

     instructions.innerHTML = "";
   }

   function showInstr() {

     instructions.innerHTML = "Click on a card to start the game!";
   }

   /*
    * Adds the card to a *list* of "open" cards.
    * If the list already has another card, checks to see if the two cards match.
    * If the cards do match, locks the cards in the open position.
    * If the cards do not match, removes the cards from the list and hides the card's symbol.
    * Finally, increments the move counter.
    */

   function addAndCheck(evt) {

     const firstCard = 0;
     const secondCard = 1;
     let firstCardName;
     let secondCardName;

     openCards.push(evt.target);   // Note: the 'open' list contains a maximum of two cards

     if (openCards.length > 1) {   // If the list contains a card, checks if they match

       firstCardName = openCards[firstCard].firstElementChild.className;
       secondCardName = openCards[secondCard].firstElementChild.className;
       moves_incrementOrNot = true;

       if (firstCardName === secondCardName) {

         openCards[firstCard].className = "card match";
         openCards[secondCard].className = "card match";
         matchedCards++;   // Incrementing the number of matched cards
         openCards = [];
       }

       else hideCards();
     }
   }

   function hideCards() {

     const firstCard = 0;
     const secondCard = 1;

     // Avoids variables inconsistency
     clickable = false;

     setTimeout( function () {

       openCards[firstCard].className ="card";
       openCards[secondCard].className ="card";

       openCards[firstCard].firstElementChild.remove();
       openCards[secondCard].firstElementChild.remove();
       openCards = [];
       clickable = true; // After the animation ends, the game can continue

     }, 1200);
   }

   // Increments the moves counter and updates it
   // Notice that the number of moves will be incremented when
   // 2 cards are clicked
   function incrementMoveCounter() {

     // Moves counter will be incremented only if two cards are clicked
     if (moves_incrementOrNot) {

       moves++;
       movesDisplay.innerHTML = moves;
     }

     moves_incrementOrNot = false;
   }

   function manageStars() {

     const thirdStar = 2;
     const secondStar = 1;

     if (moves == 20) {
       stars[thirdStar].classList.add('hide');
       starCounter--;
     }

     if (moves == 35) {
       stars[secondStar].classList.add('hide');
       starCounter--;
     }
   }

   /*
    * If all cards have matched, stops the timer and displays a message with the
    * final score.
    */

   function checkGameOver() {

     if (matchedCards == 8) {

       let time = stopTimer();

       modal_time.innerHTML += " " +time;
       modal_moves.innerHTML += " " +moves;
       modal_stars.innerHTML += " " +starCounter;

       congrModal.classList.toggle('show');
     }
   }


   /*
   * Event listener and functions for the restart button (the one on
   * the score panel)
   */

   restartBtn.addEventListener('click', restartGameScorePanel);

   // Manages the restart of the game
   function restartGameScorePanel () {

     if(clickable) {

       stopTimer();   // Stops the timer
       init();   // Initializes the game
       showInstr();   // Shows instructions
     }
   }


   /*
   * Event listener and functions for the restart button (the one on
   * the congratulations modal)
   */

   congrModalRestartBtn.addEventListener('click', function () {

     restartGameCongrPanel();
   });   // congrModalRestartBtn.addEventListener


   // Manages the restart of the game from the congratulations modal
   function restartGameCongrPanel() {

     congrModal.classList.toggle('show');   // Hides the modal
     stopTimer();
     init();
     showInstr();
   }


   /*
   * Timer functions below
   */

   // Sets the timer
   function startTimer() {

     if (!timerIsActive) {

       let timerHTML = document.createElement("div");
       timerHTML.className = "timer";
       timerHTMLElement = scorePanel.appendChild(timerHTML);
       timerInterval = setInterval (timer, 1000);
       timerIsActive = true;
     }
   }

   // Stops the timer
   function stopTimer() {

     if (timerIsActive) {

       let elapsed = timerHTMLElement.innerHTML;

       clearInterval(timerInterval);
       sec = 0;
       min = 0;
       timerIsActive = false;
       timerHTMLElement.remove();

       return elapsed;
     }

     // else console.log("Timer is not active. Nothing to stop!");
   }

   // Game timer
   function timer() {

     let secString = "";
     let minString = "";

     if (timerIsActive) {

       sec++;

       if (sec > 59) {
         sec = 0;
         min++;
       }
     }

     if (min < 10) minString = "0" +min;
     else minString = min;

     if (sec < 10) secString = "0" +sec;
     else secString = sec;

     timerHTMLElement.innerHTML = minString +":" +secString;
   }


   /*
   * Shortcuts code
   */

   // Restarts the game when the player presses the 'r' key on the keyboard
   document.addEventListener('keypress', function (evt) {

     if (evt.key === 'r' && !congrModal.classList.contains('show')) {
       evt.preventDefault();
       restartGameScorePanel();
     }
   });

   document.addEventListener('keypress', function (evt) {

     if (evt.key === 'r' && congrModal.classList.contains('show')) {
       evt.preventDefault();
       restartGameCongrPanel();
     }
   });

   /*
   * The player can flip the cards over by pressing the keys from 'a' to 'k'
   * and from 'z' to ',' on the keyboard.
   */
   document.addEventListener('keypress', function (evt) {

     const keys = [97, 115, 100, 102, 103, 104, 106, 107, 122, 120, 99, 118, 98, 110, 109, 44];
     let index;

     if (keys.includes(evt.keyCode)) {

       index = keys.indexOf(evt.keyCode);
       cards[index].click();
     }

     else console.log("Not assigned key");
   });


   // This function adds a card to the deck.

   // It uses the cardNumber as an index for 'shuffledCardsList'. Then,
   // it appends a new html element to the li element (target parameter)
   // that fired the 'click' event.
   function addCardHTML(cardNumber, target) {

     let card = document.createElement("i");

     card.className=shuffledCardsList[cardNumber];
     target.appendChild(card);
   }

});   // document.addEventListener("DOMContentLoaded", function(ev) {
