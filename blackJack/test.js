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

var deck = [];

for (var i = 0; i < SUITS.length; i++) {
    for (var j = 0; j < RANKS.length; j++) {
      var nextCard = new Card(SUITS[i], RANKS[j]);

      deck.push(nextCard);
    }
}

function Player (name) {
  this.name = name;
  this.hand = {
    aces: [],
    nonAces: []
  }

  var card = deck[Math.floor(Math.random()*52)].rank;

  this.add = function () {
    if (card.rank === 'A') {
      player.hand.aces.push(card)
    } else {
      player.hand.nonAces.push(card)
    }
  }

  this.value = function () {

    var points = 0;

    // loop over this.hand.nonAces, add value of each to points ...
    // loop over this.hand.aces, add either 11 or 1 to points
  }

}
function deal () {
  playerName = prompt("Do you want to play BlackJack? What is your name?")
  var player = new Player(playerName);
  // var dealer = new Player(dealer);

  for (var i = 0; i < 2; i++) {
    player.add(deck[Math.floor(Math.random()*52)])
    // dealer.add(deck[Math.floor(Math.random()*52)])
  }

}
deal()


// this.empty = function () {
//   this
// }
