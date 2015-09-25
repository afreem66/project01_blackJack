///creating event listeners for deal, hit, and stay buttons.
var dealButton = $('.deal'),
    hitButton = $('.hit')
    stayButton = $('.stay');
///this button deals cards to the players hands and looks for blackjack
dealButton.on("click", function (e) {
  deal(thePlayer, theDealer);
  console.log(thePlayer.value());
  console.log(theDealer.value());

  checkBlackJack(thePlayer.value(), theDealer.value());
})
///
hitButton.on("click", function(e) {
  thePlayer.add(deck[Math.floor(Math.random()*deck.length)])
    if(thePlayer.value() > 21) {
      alert("BUST!");
    } else {
      checkBlackJack(thePlayer.value(), theDealer.value());
    }
})

stayButton.on("click", function(e) {
  console.log(thePlayer.value());
  dealerRules(theDealer.value());
  console.log(theDealer.value());
})



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
///and dealt for used cards

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

    hand.aces.splice();
    hand.nonAces.splice();

}



///This section deals the original two cards to the player and dealer.

function deal(player, dealer) {

  for (var i = 0; i < 2; i++) {
    player.add(deck[Math.floor(Math.random()*deck.length)]);

    dealer.add(deck[Math.floor(Math.random()*deck.length)]);
  }
  console.log(player.hand);
  console.log(dealer.hand);
};

///This function checks the scores for any type of game ending outcomes

function checkBlackJack(playerScore, dealerScore) {
  if (playerScore == 21 && dealerScore == 21) {
    console.log("Both, have blackjack it is a push");
  } else if (playerScore == 21) {
    console.log("BLACKJACK! " + playerName + " wins!")
  } else if (dealerScore == 21) {
    console.log("BLACKJACK! Dealer wins");
  } else {
    console.log(playerName + ", you have " + playerScore + ". Do you want to hit or stay?")
  }
}
///this function lays out the rules for the dealer to stay and hit
///Does it need to be a function or variable??? can I attach to constructor object?

function dealerRules(dealerScore) {
    if (dealerScore > 17) {
      console.log("The dealer has " + dealerScore + " and has to stay")
    } else {
    while (dealerScore <= 17) {
      console.log("The dealer has " + dealerScore + " and has to hit");
      theDealer.add(deck[Math.floor(Math.random()*deck.length)]);
      console.log("The dealer now has " + dealerScore);
      return dealerScore;
      }
    }
}

function findWinner(playerScore, dealerScore) {
  if (playerScore == dealerScore) {
    console.log(playerName + " wins!");
  } else if (playerScore < dealerScore) {
    console.log("BOOOO the dealer wins");
  } else {
    console.log("It is a push, you get your maoney back " + playerName);
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
