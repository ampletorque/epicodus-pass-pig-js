describe('Player', function() {

  it("will return the positions of the pigs after rolled", function() {
    var testPlayer = new Player ("Margie");
    var possibilities = [1,2,3,4,5];
    expect(possibilities).to.include(testPlayer.roll()[1]);
    expect(possibilities).to.include(testPlayer.roll()[2]);
  });


  it("returns score for player", function() {
    var testPlayer = new Player("Margie");
    testPlayer.score += testPlayer.roll()[0];
    expect(testPlayer.score).to.be.at.least(1);
    expect(testPlayer.score).to.be.at.most(60);
  });

  it("returns the winner when two players roll", function() {
    var testPlayer1 = new Player("Margie");
    var testPlayer2 = new Player("Frank");
    var i = 1;
    while ((!testPlayer1.wins()) || (i <= 100)) {
      testPlayer1.score += testPlayer1.roll()[0];
      i++;
    }
    expect(testPlayer1.wins());
  })

});
