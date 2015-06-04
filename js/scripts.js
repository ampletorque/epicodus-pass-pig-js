"use strict";

function Player(name, score) {
  this.name = name;
  this.score = 0;
  this.turnScore = 0;
  // this.pigNames = ["Kevin Bacon", "Notorious P.I.G.", "Swinona Ryder", "Snoop Hoggy Hogg"];
  this.pigNames = [];
}

function Die(weights, scoreName) {
  if (typeof weights === 'undefined') {
    weights = [.2, .2, .2, .2, .2, .2];
  }
  if (typeof scoreName === 'undefined') {
    scoreName = {
      1: [0, "lying on side dot down", "lying on its side, dot down"],
      2: [0, "lying on side dot up", "lying on its side, dot up"],
      3: [5, "razorback", "lying on its back"],
      4: [5, "trotter", "standing upright"],
      5: [10, "snouter", "leaning on its snout"],
      6: [15, "leaning jowler", "resting on its snout and ear"]
    };
  }
  this.scoreName = scoreName;
  this.numSides = weights.length;
  this.weights = weights;
}

Die.prototype.roll = function() {
  var rand = Math.random();
  var i = 0;
  var weightSum = 0;
  while (i < this.numSides) {
    weightSum += this.weights[i]
    if (rand < weightSum) {
      return i + 1;
    }
    i++;
  }

}

Die.prototype.calculateScore = function(roll1, roll2) {
  var tempScore;

  if ((roll1 === 1 && roll2 === 2) || (roll1 === 2 && roll2 === 1)) {
    tempScore = 1;
  } else if (roll1 === roll2) {
    if (roll1 === 1 || roll1 === 2) {
      tempScore = 1;
    } else {
      tempScore = 4*this.scoreName[roll1][0];
    }
  } else {
    tempScore = this.scoreName[roll1][0] + this.scoreName[roll2][0];
  }

  return tempScore;
}

Player.prototype.wins = function() {
  return this.score >= 100;
}

var clearRollResults = function() {

  $(".pig1").text("");
  $(".pig1-roll").text("");
  $(".pig2").text("");
  $(".pig2-roll").text("");
  $(".turn-score").text("");

}


$(document).ready(function() {
  $("#game").hide();
  $("#intro").hide();
  var playerOne = new Player ("Player One")
  var playerTwo = new Player ("Player Two")
  var die = new Die([.2, .2, .2, .2, .15, .05]);
  var curPlayer;

  var changeTurn = function(playerNumber, spotsFlipped, pigsTouching) {
    var currentPlayer;
    if (playerNumber === 1) {
      currentPlayer = playerOne;
    } else {
      currentPlayer = playerTwo;
    }

    $("#player" + curPlayer + "-options .roll").hide();
    if (spotsFlipped) {
      $("#player" + curPlayer + "-options .special-condition").show();
      $("#player" + curPlayer + "-options .change-player").show();
      $("#player" + curPlayer + "-options .special-condition").text("Pig Out! Both pigs lying on their sides, " +
      "one's spot up and one's down. End of turn.")
    }
    if (pigsTouching) {
      $("#player" + curPlayer + "-options .special-condition").show();
      $("#player" + curPlayer + "-options .change-player").show();
      $("#player" + curPlayer + "-options .special-condition").text("Makin' Bacon! Pigs are touching. End of turn.")
    }
    currentPlayer.turnScore = 0;
    if (currentPlayer.wins()) {
      alert("Player One Wins");
    }
  }

  $(".enter").click(function() {
    $("#welcome").hide();
    $("#intro").show();
  });

  $("form#team").submit(function(event){
    $("#intro").hide();
    $("#game").show();
    $("#player2-options .roll").hide();
    $(".special-condition").hide();
    $(".change-player").hide();
    $(".hold-em").hide();
    $("#total-score1").text(0);
    $("#total-score2").text(0);
    event.preventDefault();
    $("#welcome").hide();
    // var playerPigs = [];
    $(':checkbox:checked').each(function(i){
      if (i < 2) {
        playerOne.pigNames.push($(this).val());
        // console.log(playerOne.pigNames[i]);
      } else {
        playerTwo.pigNames.push($(this).val());
        // console.log(playerTwo.pigNames[i-2]);
      }
    });
    $(".team1").text(playerOne.pigNames[0] + " & " + playerOne.pigNames[1]);
    $(".team2").text(playerTwo.pigNames[0] + " & " + playerTwo.pigNames[1]);
    curPlayer = 1;
  });


  $("#player" + curPlayer + "-options .change-player").click(function() {
    $("#player" + curPlayer + "-options .roll").toggle();
    $("#player" + curPlayer + "-options .change-player").hide();
    $("#player" + curPlayer + "-options .special-condition").hide();
    clearRollResults();
  });

  $("#player" + curPlayer + "-options .hold-em").click(function() {
    if (curPlayer === 1) {
      playerOne.score += playerOne.turnScore;
      playerOne.turnScore = 0;
    }
    if (curPlayer === 2) {
      playerTwo.score += playerTwo.turnScore;
      playerTwo.turnScore = 0;
    }
    $("#player" + curPlayer + "-options .roll").toggle();
    $("#player" + curPlayer + "-options .hold-em").hide();
    clearRollResults();
  });

  $("#player1-options .roll").click(function() {
    var roll1p1 = die.roll();
    var roll2p1 = die.roll();
    var spotsFlipped = (roll1p1 === 1 && roll2p1 === 2) || (roll1p1 === 2 && roll2p1 === 1);
    var pigsTouching = Math.random() < .2;
    var turnOver = spotsFlipped || pigsTouching;

    $("#player" + curPlayer + "-options .hold-em").show();

    curPlayer = 1;
    if (turnOver) {
      $("#player" + curPlayer + "-options .change-player").show();
      changeTurn(curPlayer, spotsFlipped, pigsTouching);
    } else {
      playerOne.turnScore += die.calculateScore(roll1p1, roll2p1);

      clearRollResults();
      $("#player" + curPlayer + "-options .pig1").text(playerOne.pigNames[0]);
      $("#player" + curPlayer + "-options .pig1-roll").text(" is " + die.scoreName[roll1p1][2]);
      $("#player" + curPlayer + "-options .pig2").text(playerOne.pigNames[1]);
      $("#player" + curPlayer + "-options .pig2-roll").text(" is " + die.scoreName[roll2p1][2]);

      $("#player" + curPlayer + "-options .turn-score").text(playerOne.turnScore);
    }
  });

  $("#player2-options .roll").click(function() {
    var roll1p2 = die.roll();
    var roll2p2 = die.roll();
    var spotsFlipped = (roll1p2 === 1 && roll2p2 === 2) || (roll1p2 === 2 && roll2p2 === 1);
    var pigsTouching = Math.random() < .2;
    var turnOver = spotsFlipped || pigsTouching;

    $("#player" + curPlayer + "-options .hold-em").show();

    curPlayer = 2;
    if (turnOver) {
      $("#player" + curPlayer + "-options .change-player").show();
      changeTurn(curPlayer, spotsFlipped, pigsTouching);
    } else {
      playerTwo.turnScore += die.calculateScore(roll1p2, roll2p2);

      clearRollResults();
      $("#player" + curPlayer + "-options .pig1").text(playerTwo.pigNames[0]);
      $("#player" + curPlayer + "-options .pig1-roll").text(" is " + die.scoreName[roll1p2][2]);
      $("#player" + curPlayer + "-options .pig2").text(playerTwo.pigNames[1]);
      $("#player" + curPlayer + "-options .pig2-roll").text(" is " + die.scoreName[roll2p2][2]);

      $("#player" + curPlayer + "-options .turn-score").text(playerTwo.turnScore);
    }
  });


});
