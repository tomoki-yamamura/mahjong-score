import UserScoresMap from "../userScoreMap";

describe("UserScoresMap", () => {
  it("should change max value correctly", () => {
    const scoresMap = new Map<string, number>();
    const user2Score = -1
    const user3Score = -2
    const user1Score = Math.abs(user2Score) + Math.abs(user3Score) + 1
    scoresMap.set("user1", user1Score);
    scoresMap.set("user2", user2Score);
    scoresMap.set("user3", user3Score);

    const userScores = new UserScoresMap(scoresMap);
  
    const updatedScores = userScores.changeMaxValue();
    
    const expectedMap = new Map<string, number>();
    expectedMap.set("user1", user1Score - 1);
    expectedMap.set("user2", user2Score);
    expectedMap.set("user3", user3Score);

    expect(updatedScores).toEqual(new UserScoresMap(expectedMap));
  });

  describe('addScore', () => {
    it('should add a new score for a new user', () => {
      const scoresMap = new Map<string, number>();
      const userScores = new UserScoresMap(scoresMap);
      const score = 10.1
      userScores.addScore('test', score);
      expect(userScores.getScore('test')).toBe(Math.round(10.1));
    });
  });
});
