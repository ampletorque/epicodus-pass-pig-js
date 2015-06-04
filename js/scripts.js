function Player(name, score) {
  this.name = name;
  this.score = 0;
  this.pigNames = [];
}

function Die(numSides) {
  this.numSides = numSides;
}

Die.prototype.roll = function() {
  return Math.floor((Math.random() * this.numSides) + 1);
}

Player.prototype.calculateScore = function(roll1, roll2) {
  var tempScore;
  var pigSides = {
    1: 0, // lying on side
    2: 5, //razorback
    3: 5, //trotter
    4: 10, //snouter
    5: 15, //leaning jowler
  };

  if (roll1 === roll2) {
    if (roll1 === 1) {
      tempScore = 1;
    } else {
      tempScore = 4*pigSides[roll1];
    }
  } else {
    tempScore = pigSides[roll1] + pigSides[roll2];
  }

  return tempScore
}

Player.prototype.wins = function() {
  return this.score >= 100;
}

$(document).ready(function() {
  $("#game").hide();
  $("#intro").hide();
  var playerOne = new Player ("Player One")
  var playerTwo = new Player ("Player Two")
  var die = new Die(5);

  $(".enter").click(function() {
    $("#welcome").hide();
    $("#intro").show();
  });

  $("form#team").submit(function(event){
    $("#intro").hide();
    $("#game").show();
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

  });

  $("#roll1").click(function() {
    playerOne.score += playerOne.calculateScore(die.roll(), die.roll());
    $("#roll1").hide();
    $("#roll2").show();
    $("#score1").text(playerOne.score)
    if (playerOne.wins()) {
      alert("Player One Wins");
    }
  });

  $("#roll2").click(function() {
    $("#roll2").hide();
    $("#roll1").show();
    playerTwo.score += playerTwo.calculateScore(die.roll(), die.roll());
    $("#score2").text(playerTwo.score)

    if (playerTwo.wins()) {
      alert("Player Two Wins");
    }
  });


});
