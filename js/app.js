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
   let openCards = [];
   let clickable = true;
   let moves = 0;
   let matchedCards = 0;
   let starCounter = 3;

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

  function init() {

    matchedCards = 0;
    openCards = [];

    //Shuffling the deck
    shuffledCardsList = shuffle(cardsList);

    // Clean HTML (remove 'i' nodes from the DOM)
    for (let card = 0; card < cards.length; card++) {

      cards[card].setAttribute('data-card-number', card);
      cards[card].className = 'card';

      if (cards[card].firstElementChild) cards[card].firstElementChild.remove();
    }

    for (let star = 0; star < stars.length; star++) {

      stars[star].removeAttribute('class');
    }

    // Initializes the move counter
    moves = 0;
    movesDisplay.innerHTML = moves;
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

       hideInstr();
       startTimer();
       showCard(evt);
       addAndCheck(evt);
       incrementMoveCounter();
       manageStars();
       checkGameOver();
     }
   });   //deck.addEventListener

   function showCard(evt) {

     let cardNumber = evt.target.dataset.cardNumber;

     addCardHTML(cardNumber, evt.target);
     evt.target.classList.toggle("open");
     evt.target.classList.toggle("show");
   }

   function hideInstr() {

     instructions.innerHTML = "";
   }

   function showInstr() {

     instructions.innerHTML = "Click on a card to start the game!";
   }

   function addAndCheck(evt) {

     const firstCard = 0;
     const secondCard = 1;
     let firstCardName;
     let secondCardName;

     openCards.push(evt.target);

     if (openCards.length > 1) {

       firstCardName = openCards[firstCard].firstElementChild.className;
       secondCardName = openCards[secondCard].firstElementChild.className;

       if (firstCardName === secondCardName) {

         openCards[firstCard].className = "card match";
         openCards[secondCard].className = "card match";
         matchedCards++;
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

       firstCardName = openCards[firstCard].firstElementChild.remove();
       firstCardName = openCards[secondCard].firstElementChild.remove();
       openCards = [];
       clickable = true;

     }, 1200);
   }

   function incrementMoveCounter() {

     moves++;
     movesDisplay.innerHTML = moves;
   }

   function manageStars() {

     const thirdStar = 2;
     const secondStar = 1;
     const firstStar = 0;

     if (moves == 15) {
       stars[thirdStar].classList.add('hide');
       starCounter--;
     }

     if (moves == 30) {
       stars[secondStar].classList.add('hide');
       starCounter--;
     }

     if (moves == 50) {
       stars[firstStar].classList.add('hide');
       starCounter--;
     }
   }

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

   restartBtn.addEventListener('click', function (evt) {

     if(clickable) {

       stopTimer();
       init();
       showInstr();
     }
   });   // restartBtn.addEventListener


   /*
   * Event listener and functions for the restart button (the one on
   * the congratulations modal)
   */

   congrModalRestartBtn.addEventListener('click', function (evt) {

     congrModal.classList.toggle('show');
     stopTimer();
     init();
     showInstr();
   });   // congrModalRestartBtn.addEventListener


   /*
   * Timer functions below
   */

   // Set the timer
   function startTimer() {

     if (!timerIsActive) {

       let timerHTML = document.createElement("div");
       timerHTML.className = "timer";
       timerHTMLElement = scorePanel.appendChild(timerHTML);
       timerInterval = setInterval (timer, 1000);
       timerIsActive = true;
     }
   }

   // Stop the timer
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

     if (timerIsActive) {

       let secString, minString;

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



   // This function add a card to the deck.

   // It uses the cardNumber as an index for 'shuffledCardsList'. Then,
   // it appends a new html element to the li element (target parameter)
   // that fired the 'click' event.
   function addCardHTML(cardNumber, target) {

     let card = document.createElement("i");

     card.className=shuffledCardsList[cardNumber];
     target.appendChild(card);
   }

});
