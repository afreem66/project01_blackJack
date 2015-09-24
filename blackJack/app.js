var deck = {
  spades : ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"],
  clubs : ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"],
  diamonds : ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"],
  hearts : ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"],
  dealtCards : []
}

var player = {
  cards : [],

  dealCard : function() {


      var randomSuit = Math.floor((Math.random()*4));
      var randomCard = Math.floor((Math.random()*13));

      if (randomSuit == 0) {
        var randomCard = Math.floor((Math.random()*deck.spades.length));

        this.cards.push(deck.spades[randomCard]);
        deck.dealtCards.push(deck.spades[randomCard]);
        deck.spades.splice(randomCard, 1);

      } else if (randomSuit == 1) {
        var randomCard = Math.floor((Math.random()*deck.clubs.length));

        this.cards.push(deck.clubs[randomCard]);
        deck.dealtCards.push(deck.clubs[randomCard])
        deck.clubs.splice(randomCard, 1);

      } else if (randomSuit == 2) {
        var randomCard = Math.floor((Math.random()*deck.diamonds.length));

        this.cards.push(deck.diamonds[randomCard]);
        deck.dealtCards.push(deck.diamonds[randomCard]);
        deck.diamonds.splice(randomCard, 1);

      } else {
        var randomCard = Math.floor((Math.random()*deck.hearts.length));

        this.cards.push(deck.hearts[randomCard]);
        deck.dealtCards.push(deck.hearts[randomCard]);
        deck.hearts.splice(randomCard, 1);

      }
    },

  dealHand : function() {
    for (var i = 0; i < 2; i++) {
      this.dealCard();
    }
  },

  playerScore : function() {
    
  }
}

var dealer = {
  cards : [],

  dealCard : function() {

      var randomSuit = Math.floor((Math.random()*4));
      var randomCard = Math.floor((Math.random()*13));

      if (randomSuit == 0) {
        var randomCard = Math.floor((Math.random()*deck.spades.length));

        this.cards.push(deck.spades[randomCard]);
        deck.dealtCards.push(deck.spades[randomCard]);
        deck.spades.splice(randomCard, 1);

      } else if (randomSuit == 1) {
        var randomCard = Math.floor((Math.random()*deck.clubs.length));

        this.cards.push(deck.clubs[randomCard]);
        deck.dealtCards.push(deck.clubs[randomCard]);
        deck.clubs.splice(randomCard, 1);

      } else if (randomSuit == 2) {
        var randomCard = Math.floor((Math.random()*deck.diamonds.length));

        this.cards.push(deck.diamonds[randomCard]);
        deck.dealtCards.push(deck.diamonds[randomCard]);
        deck.diamonds.splice(randomCard, 1);

      } else {
        var randomCard = Math.floor((Math.random()*deck.hearts.length));

        this.cards.push(deck.hearts[randomCard]);
        deck.dealtCards.push(deck.hearts[randomCard]);
        deck.hearts.splice(randomCard, 1);

      }
      console.log(randomSuit);
      console.log(randomCard);
    },

  dealHand : function() {
    for (var i = 0; i < 2; i++) {
      this.dealCard();
    }
    console.log(this.cards);
  }
}
