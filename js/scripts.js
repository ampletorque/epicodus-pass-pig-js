function Player(name, score) {
  this.name = name;
  this.score = 0;
  this.pigNames = [];
}

Player.prototype.roll = function() {
  var roll1 = Math.floor((Math.random() * 5) + 1);
  var roll2 = Math.floor((Math.random() * 5) + 1);
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

  return [tempScore, roll1, roll2];
}

Player.prototype.wins = function() {
  return this.score >= 100;
}

$(document).ready(function() {
  $("#game").hide();
  $("#intro").hide();
  var playerOne = new Player ("Player One")
  var playerTwo = new Player ("Player Two")

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
        console.log(playerOne.pigNames[i]);
      } else {
        playerTwo.pigNames.push($(this).val());
        console.log(playerTwo.pigNames[i-2  ]);
      }

    });

  });

  $("#roll1").click(function() {
    playerOne.score += playerOne.roll()[0];
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
    playerTwo.score += playerTwo.roll()[0];
    $("#score2").text(playerTwo.score)

    if (playerTwo.wins()) {
      alert("Player Two Wins");
    }
  });


});
