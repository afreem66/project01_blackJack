///This section creates the card Constructor function to create the deck
///It pulls from the suits and ranks array to create A-K and adds a value
///using a conditional statement to combat the face card problem

var SUITS = ['hearts', 'spades', 'clubs', 'diamonds'];
var RANKS = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];

function Card (cardSuit, cardRank) {
  this.suit = cardSuit;
  this.rank = cardRank;

  if (typeof cardRank == "number") {
    this.value = cardRank;
  } else if (cardRank !== 'A') {
    this.value = 10;
  } else {
    this.value = 11;
  }
}

///these are the general arrays where cards are stored. deck for unused cards
///and dealt for usued cards

var deck = [];
var dealt = [];

///this section creates the deck using the Card Constructor function

for (var i = 0; i < SUITS.length; i++) {
    for (var j = 0; j < RANKS.length; j++) {
      var nextCard = new Card(SUITS[i], RANKS[j]);

      deck.push(nextCard);
    }
}

///this section creates a new player. the player has a hand object which holds cards
///there are 2 arrays for ace and non-ace cards

function Player (name) {
  this.name = name;
  this.hand = {
    aces: [],
    nonAces: []
  }

///this section creates the add method to the Player. It adds cards to the players hands.
///It also removes cards from the deck and adds them to the dealt array above

  this.add = function(card) {

    if (card.rank === 'A') {
      this.hand.aces.push(card);
    } else {
      this.hand.nonAces.push(card)
    }

    dealt.push(card);
    deck.splice(card, 1);
  }

///this section adds the method which sums a players hand to the PLayer object.

  this.value = function () {

      var points = 0;

      for (var i = 0; i < this.hand.nonAces.length; i++) {
        points += this.hand.nonAces[i].value;
      }

      for (var i = 0; i < this.hand.aces.length; i++) {
        if (points < 11) {
          points += 11;
        } else {
          points += 1;
        }
      }
      return points;
    }
}

///This Player method clears both hands and sends cards back to the deck array

  this.reset = function () {
      {
    hand.aces.splice();
    hand.nonAces.splice();
  }
}



///This section deals the original two cards to the player and dealer.

function deal(player, dealer) {

  for (var i = 0; i < 2; i++) {
    player.add(deck[Math.floor(Math.random()*deck.length)]);

    dealer.add(deck[Math.floor(Math.random()*deck.length)]);
  }
};

///This function checks the scores for any type of game ending outcomes

function checkWinner(playerScore, dealerScore) {
  if (playerScore == dealerScore) {
    console.log("push");
  } else if (playerScore == 21) {
    console.log("BLACKJACK!")
  } else if (playerScore > 21) {
    console.log(playerName + " busts! Dealer wins");
  } else if (dealerScore > 21) {
    console.log("the dealer busts!" + playerName + " wins!");
  } else if (playerScore > dealerScore) {
    console.log(playerName + " wins!");
  } else {
    console.log("Dealer wins!");
  }
}
///this function lays out the rules for the dealer to stay and hit
///Does it need to be a function or variable??? can I attach to constructor object?

function dealerRules(dealerScore) {
  while (dealerScore <= 17) {
    theDealer.add(deck[Math.floor(Math.random()*deck.length)]);
    return dealerScore;
    }
  }

/// Here is where I am trying to create the players and their hands.
playerName = prompt("Do you want to play BlackJack? What is your name?");
var thePlayer = new Player(playerName);
var theDealer = new Player('Dealer');

function game() {
  deal(thePlayer, theDealer);
  console.log(thePlayer.value());
  console.log(theDealer.value());

  dealerRules(theDealer.value());
  checkWinner(thePlayer.value(), theDealer.value());

  thePlayer.reset();
  theDealer.reset();
  for (var i = 0; i < dealt.length; i++) {
    deck.push(dealt[i]);
  }
}

///Whenever I add this section back in it just adds 4 cards to thePlayer
///not the Dealer
