#Pass-the-Pig

---

## Synopsis

Pass-the-Pig built by [Erin Collins](https://github.com/theeerincollins) and [Courtney Phillips](https://github.com/courtneymaepdx). Crafted as part of the Spring 2015 JavaScript curriculum at [Epicodus](https://www.epicodus.com/).

## Background

Pass-the-Pig is a pre-existing spin on the on the traditional game of "Pig Dice" that utilizes small plastic pigs instead of dice. As described in the [Wikipedia Article](http://en.wikipedia.org/wiki/Pass_the_Pigs): 

*Each turn involves one player throwing two model pigs, each of which has a dot on one side. The player gains or loses points based on the way the pigs land. Each turn lasts until the player throwing either rolls the pigs in a way that wipes out their current turn score or decides to stop their turn, add their turn score to their total score and pass the pigs to the next player. The winner is the first player to reach a predetermined total score.*

## Scoring

### Game Rules:

The Pass-the-Pigs application follows the same scoring principles as the traditional game. Also described in the [Wikipedia Article](http://en.wikipedia.org/wiki/Pass_the_Pigs): 

#### Single pig
  -   The pig is lying on its side - 0 Points
  -   _Razorback_ - The pig is lying on its back - 5 Points
  -   _Trotter_ - The pig is standing upright - 5 Points
  -   _Snouter_ - The pig is leaning on its snout - 10 Points
  -   _Leaning Jowler_ - The pig is resting on its snout and ear - 15 Points
  
#### Both pigs
  -   _Sider_ - The pigs are on their sides, either both with the spot facing upward or both with the spot facing downward - 1 Point
  -   _Double Razorback_ - The pigs are both lying on their backs - 20 Points
  -   _Double Trotter_ - The pigs are both standing upright - 20 Points
  -   _Double Snouter_ - The pigs are both leaning on their snouts - 40 Points
  -   _Double Leaning Jowler_ - The pigs are both resting between snouts and ears - 60 Points
  -   _Mixed Combo_ - A combination not mentioned above is the sum of the single pigs' scores
  -   _Pig Out_ - If both pigs are lying on their sides, one with the spot facing upwards and one with the spot facing downwards the score for that turn is reset to 0 and the turn changes to the next player
  -   _Makin' Bacon (or Oinker)_ - If both pigs are touching in any position,[3] then the total score is reset to 0 and the turn changes to the next player
  -   _Piggyback_ - If one pig lands completely resting on top of the other, then the player is out of the game.
  
### Code Implementation:
  
Pigs are rolled by means of a .roll function which generates two random numbers between one and five, representing the five different ways each of the two pigs can land. The point values are then calculated by means of a series    of if/else statements that check for the relevant pig landing position, as well as any of the multi-pig "combos"    outlined above. After each player rolls, the buttons and information for the next player's turn are automatically displayed, and vis versa. The first player to reach 100 points wins, which is verified within an if/else statement included in the roll method.

In the actual game of Pass-the-Pigs, the small pig toys also have a single dot on one of their sides, thus creating more possible combinations of rolls. The "dot side" is not yet implemented in our code, but we plan to add it. 

## Front-End Design:

Beyond the basic game, the pass-the-pig application is also designed with a level of user-customization in mind. Before each 'bout', each of the two players are prompted to select their "team" of two pigs out of four available. Their chosen pig players are then displayed above the game board during the rounds.

## Additional Information and Resources

  - [Pass-the-Pigs strategy and probability](http://www.derepas.com/petco/)
  - [Video of traditional Pass-the-Pigs gameplay](https://www.youtube.com/watch?v=eFWvxGbdjI8)
  - [Terrible Pass-the-Pigs commercial from the '90s](https://www.youtube.com/watch?v=blP4Dv01ZKM)
  - [In-depth analysis of Pass-the-Pigs (no, seriously...)](http://pubsonline.informs.org/doi/pdf/10.1287/ited.1120.0088)

## Contribute

  - Issue Tracker: https://github.com/courtneymaepdx/pass-the-pig/issues
  - Source Code: https://github.com/courtneymaepdx/pass-the-pig
  - Pull Requests: https://github.com/courtneymaepdx/pass-the-pig/pulls
  
## License

The MIT License (MIT)

Copyright (c) 2015 Erin Collins, Courtney Phillips

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---
