var die = new Die();

describe('Player', function() {

  it("returns score for player", function() {
    var roll1p1 = die.roll();
    var roll2p1 = die.roll();
    var testPlayer = new Player("Margie");
    testPlayer.score += die.calculateScore(roll1p1, roll2p1);
    expect(testPlayer.score).to.be.at.least(1);
    expect(testPlayer.score).to.be.at.most(60);
  });

  it("returns the winner when two players roll", function() {
    var roll1p1 = die.roll();
    var roll2p1 = die.roll();
    var testPlayer1 = new Player("Margie");
    var testPlayer2 = new Player("Frank");
    var i = 1;
    while ((!testPlayer1.wins()) || (i <= 100)) {
      testPlayer1.score += die.calculateScore(roll1p1, roll2p1);
      i++;
    }
    expect(testPlayer1.wins());
  })

});


describe('Die', function() {
  it('can be rolled', function() {
    expect([1,2,3,4,5]).to.include(die.roll());
  });

  it('can have a different weight', function() {
    var pidDie = new Die([.4, .3, .2, .1]);
    var rollCount = 1000;
    var pigCounts = [0,0,0,0]
    for (var i=1; i <= rollCount; i++) {
      var roll = pidDie.roll();
      pigCounts[roll-1]++;
    }
    var percentages = pigCounts.map(function(count) { return count/rollCount; })
    var differences = []
    for (var j=0; j < 4; j++) {
      differences.push(Math.abs(pidDie.weights[j] - percentages[j]));
    }
    console.log(differences.map(function(difference) { return difference*100; }));
    expect(Math.max.apply(null, differences)).to.be.at.most(.05);

  })
});
