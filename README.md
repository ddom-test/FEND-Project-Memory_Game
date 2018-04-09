# Memory Game Project

## Table of Contents

* [Instructions](#instructions)
* [Installation](#installation)
* [Gameplay](#gameplay)
* [Score](#score)
* [Version](#version)
* [Contributing](#contributing)

## Instructions

The starter project has some HTML and CSS styling to display a static version of the Memory Game project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the [Udacity Classroom](https://classroom.udacity.com/me).

# Installation

The game can be played on a normal web browser. Download the package and open the index.html file. Enjoy!

## Gameplay

The game board consists of sixteen "cards" arranged in a grid. The deck is made up of eight different pairs of cards, each with different symbols on one side. The cards are arranged randomly on the grid with the symbol face down.

The gameplay rules are very simple: flip over two hidden cards at a time to locate the ones that match!

* The player flips one card over to reveal its underlying symbol.
* The player then turns over a second card, trying to find the corresponding card with the same symbol.
* If the cards match, both cards stay flipped over.
* If the cards do not match, both cards are flipped face down.

The game ends once all cards have been correctly matched.

The player can restart the game hitting the 'r' key on the keyboard or clicking on the restart button as well.

## Score

The game displays a star rating (from 1-3) that reflects the player's performance. Amount of stars depends from moves:

* 3 stars: less then 15 moves
* 2 stars: until 30 moves
* 1 star: between 30 and 50

When the player starts a game, a displayed timer will also start.

The score board displays the current number of moves a player has made.

## Version
1.0

## Contributing

This repository is the starter code for _all_ Udacity students.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
