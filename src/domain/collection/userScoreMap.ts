class UserScoresMap {
  private scores: Map<string, number>;

  constructor(map: Map<string, number>) {
    this.scores = map;
  }

  addScore(username: string, score: number): void {
    const round = Math.round(score);
    this.scores.set(username, round);
  }

  getScore(username: string): number | undefined {
    return this.scores.get(username);
  }

  changeMaxValue(): UserScoresMap {
    let maxKey: string | null = null;
    let maxValue = -Infinity;
    let totalValueExceptMax = 0;

    this.scores.forEach((value, key) => {
      if (value > maxValue) {
        maxValue = value;
        maxKey = key;
        return
      }
      totalValueExceptMax += value
    });

    if (maxKey !== null) {
      this.scores.set(maxKey, Math.abs(totalValueExceptMax));
    }

    return new UserScoresMap(this.scores)
  }
}

export default UserScoresMap;
