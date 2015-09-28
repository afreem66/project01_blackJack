///Here are where I have jQuery variables and the bank variable to be accessed
///by various functions

var dealButton = $('.deal'),
    hitButton = $('.hit'),
    stayButton = $('.stay'),
    playerDiv = $(".player"),
    dealerDiv = $(".dealer"),
    bankDiv = $(".bank"),
    bankRoll = 500;

///here are the event listeners on each of the buttons

///this button deals cards to the players hands and looks for blackjack
///I also included the reset function right at the beginning to make sure the
///hand was empty to start. This also automatically reduces your bank by your bet
///once dealt

dealButton.on("click", function (e) {
  reset(thePlayer, theDealer);

  if (bankRoll < $("#player-bet").val()) {
    alert("You do not have enough money to play! Make a smaller bet or go back to the bank.")
  }

    else if ($("#player-bet").val() == "" || $("#player-bet").val() < 10) {
    alert("you need to place the minimum bet of ten to play")
  }

    else {
  deal(thePlayer, theDealer);

  console.log(thePlayer.value());
  console.log(theDealer.value());

  bankRoll -= $("#player-bet").val();
  bankDiv.text("Bank: $" + bankRoll);

  checkBlackJack(thePlayer.value(), theDealer.value());
  }

})

///this button throws another card into the players hand and checks for a winner

hitButton.on("click", function(e) {
  thePlayer.add(deck[Math.floor(Math.random()*deck.length)])
  playerDiv.append(deckViews[Math.floor(Math.random()*deck.length)].el);


  checkBlackJack(thePlayer.value(), theDealer.value());
  findWinner(thePlayer.value(), theDealer.value());

})

///this button finishes the player turn and starts the dealer play
///it also checks for a winner or different outcomess based on the dealer rules

stayButton.on("click", function(e) {
  alert(playerName + " is staying with " + thePlayer.value());

  dealerRules(theDealer.value());

  findWinner(thePlayer.value(), theDealer.value());

  console.log(thePlayer.hand);
  console.log(theDealer.hand);

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

///HEre is the constructor function for the card values. This is something that
///I want to come to back to add actual card images to using a sprite sheet

function CardView (card) {
  var thisView = this;

  this.card = nextCard;
  this.render();
}

CardView.prototype.render = function () {
  this.el = $('<div class="card">');
  this.el.text(this.card.rank + " of " + this.card.suit);
}

///these are the general arrays where cards  and card views are stored.
///deck for unused cards and dealt for used cards

var deck = [],
    deckViews = [],

    dealt = [],
    dealtViews = [];

///this section creates the deck using the Card Constructor function by looping
///first over the suits array and eaach individual value, then pushes to the deck array
///it also creates the card views by passing through the card into the CardView
///constructor function

for (var i = 0; i < SUITS.length; i++) {
    for (var j = 0; j < RANKS.length; j++) {

      var nextCard = new Card(SUITS[i], RANKS[j]);
      var nextCardView = new CardView(nextCard);

      deck.push(nextCard);
      deckViews.push(nextCardView);
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
    dealtViews.push(card);
    deckViews.splice(card, 1);


  }

///this section adds the method which sums a players hand to the PLayer object.
///this function gets accessed a lot throughout the code
///I dealt with the ace problem here as well using an if/else statement depending
///on the variable points which temporarily stores the sum of the cards

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


///This section deals the original two cards to the player and dealer and appends
///the new card divs to the DOM, this is totally random.
///This is another thing I want to come back to because I am having difficulties
///dealing a second hand. After the first hands, the cards and cardViews do not
///correspond. I think it has to do with their position in their arrays.

///I tried to combat this by storing the random number in a variable so there could
///be no confusion. When I have the chance I might try and access the data stored
///in the card view since its created by using the card

///I also want to animate the cards moving from the deck to the playing areas as well

function deal(player, dealer) {

  for (var i = 0; i < 2; i++) {
    var randomNumOne = Math.floor(Math.random()*deck.length);
    var randomNumTwo = Math.floor(Math.random()*deck.length);

    player.add(deck[randomNumOne], deckViews[randomNumOne]);
    playerDiv.append(deckViews[randomNumOne].el);

    dealer.add(deck[randomNumTwo]);
    dealerDiv.append(deckViews[randomNumTwo].el);

  }
  console.log(player.hand);
  console.log(dealer.hand);
};

///This function contains the logic that determines the winner. It first checks
///for a push, then a bust, then 21, then whoever is closest to 21. It also updates
///the bankrll from the deal button based on the outcome.

function findWinner(playerScore, dealerScore) {
  if (playerScore == dealerScore) {
    alert("It is a push, you get your money back " + playerName);
    bankRoll += $("#player-bet").val();
    alert("click deal to play another hand")
  }
    else if (playerScore > 21) {
    alert("You bust, you lose.");
    alert("click deal to play another hand")

  } else if (dealerScore > 21) {
    alert("The dealer busts you win!");
    bankRoll += ($("#player-bet").val()*2);
    alert("click deal to play another hand")

  } else if (dealerScore == 21) {
    alert("The dealer has 21, you lose!");
    alert("click deal to play another hand")

  } else if (playerScore > dealerScore) {
    alert(playerName + " wins!");
    bankRoll += ($("#player-bet").val()*2);
    alert("click deal to play another hand")

  } else if (playerScore < dealerScore) {
    alert("BOOOO the dealer wins");
    bankRoll = bankRoll;
    alert("click deal to play another hand")

  }
  bankDiv.text("Bank: $" + bankRoll);
}

///This function checks for an intial blackjack after the deal or a hit for the player

function checkBlackJack(playerScore, dealerScore) {
  if (playerScore == 21 && dealerScore == 21) {
    alert("Both, have blackjack it is a push");
    bankRoll += $("#player-bet").val();
    alert("click deal to play another hand")
;

  } else if (playerScore == 21) {
    alert("BLACKJACK! " + playerName + " wins!")
    bankRoll += ($("#player-bet").val()*2.5);
    alert("click deal to play another hand")

  } else {
    alert(playerName + ", you have " + playerScore + ". Do you want to hit or stay?");
  }
}

///this function lays out the rules for the dealer to stay and hit based on classic
///casino rule of 17. I used a while loop to make the dealer hit until 17 is reached

function dealerRules(dealerScore) {
    if (dealerScore >= 17) {
      alert("The dealer has " + dealerScore + " and has to stay")
    } else {
    while (dealerScore < 17) {
      alert("The dealer has " + dealerScore + " and has to hit");
      theDealer.add(deck[Math.floor(Math.random()*deck.length)]);
      dealerDiv.append(deckViews[Math.floor(Math.random()*deck.length)].el);

      return dealerScore;
      }
    }
    bankDiv.text("Bank: $" + bankRoll);

}

///This function clears both hands and sends cards back to the deck array
///I call it in the deal button

  function reset (player, dealer) {
    if (player.hand.aces.length > 0) {
      player.hand.aces.splice(0, player.hand.aces.length);
    }
    player.hand.nonAces.splice(0, player.hand.nonAces.length);

    if (dealer.hand.aces.length > 0) {
      dealer.hand.aces.splice(0, dealer.hand.aces.length);
    }
    dealer.hand.nonAces.splice(0, dealer.hand.nonAces.length);

    $(".card").remove();
}

/// Here is where I am trying to create the players, the player name and bank views.
///These all initialize at the beginning of the game
playerName = prompt("Do you want to play BlackJack? What is your name?");
$(".name-div").text(playerName);
var thePlayer = new Player(playerName);
var theDealer = new Player('Dealer');
