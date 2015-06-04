var die = new Die(5)

describe('Player', function() {

  it("returns score for player", function() {
    var testPlayer = new Player("Margie");
    testPlayer.score += testPlayer.calculateScore(die.roll(), die.roll());
    expect(testPlayer.score).to.be.at.least(1);
    expect(testPlayer.score).to.be.at.most(60);
  });

  it("returns the winner when two players roll", function() {
    var testPlayer1 = new Player("Margie");
    var testPlayer2 = new Player("Frank");
    var i = 1;
    while ((!testPlayer1.wins()) || (i <= 100)) {
      testPlayer1.score += testPlayer1.calculateScore(die.roll(), die.roll());
      i++;
    }
    expect(testPlayer1.wins());
  })

});


describe('Die', function() {
  it('can be rolled', function() {
    expect([1,2,3,4,5]).to.include(die.roll());
  });
});
