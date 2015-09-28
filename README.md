# project01_blackJack
I created a blackjack game using html css and javascript. This game can be installed using the link below.

http://afreem66.github.io/project01_blackJack/blackJack/

My thought process when creating this game was to using a construcotr functions to create a deck of card objects, views, and players. Each card had a rank, value, and suit property. From there I added methods to each instance of the cards to find the value of the cards, and add them to a players hand. 

Each player has a hand object, which contained 2 seperate arrays for aces and non-aces. I did this so I could deal with the issue of aces having multiple values depending on the sum of the hand. 

Lastly, I created a few functions that included the logic that dictate the game. Rules for the dealer, and to determine winners and losers. 

ALl of these functions are callable by pressing the hit, stay, or deal buttons, which I have added event listeners to listen for clicks.

Some of the issues  I had were creating the card views. If I could do this differently I would make sure to use a sprite sheet to create card images. This was very difficult and I wish to go back to this and work on. I also want to add animations to announce winners and show the cards moving to a players hand. Most importantly, I need to make the dealer's first card and also make the game able to deal more than 1 hand and have the card views and values correspond.

This project was incredibly gratifying and terrifying. I impressed myself but aso know I can do more to make this a better project and look forward to doing so in the coming days./
