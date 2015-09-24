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

function Player (playerName) {
  this.name = name;
  this.hand = {
    aces: [],
    nonAces: []
  }

  var card = deck[Math.floor(Math.random()*52)].rank;

  this.add = function (card) {
    if (card.rank === 'A') {
      Player.hand.aces.push(card)
    } else {
      Player.hand.nonAces.push(card)
    }
  }

  this.value = function () {

    var points = 0;

    // loop over this.hand.nonAces, add value of each to points ...
    // loop over this.hand.aces, add either 11 or 1 to points
  }

}
function initialize () {
  var firstPlayer = new Player();
  var dealer = new Player();

  firstPlayer.add(deck[Math.floor(Math.random()*52)])

}


// this.empty = function () {
//   this
// }
