export const convertMatchesDataWithScores = data => {
  let allScroes = data.scores;
  let allMatches = data.matches;

  let newMatchesWithScoresArray = [];

  allMatches.forEach(match => {
    let temp = [];
    temp = allScroes.filter(score => {
      if (score.matchId === match._id) {
        return score;
      }
    });
    newMatchesWithScoresArray.push({...match, scores: temp});
  });

  //   console.log(newMatchesWithScoresArray);
  return newMatchesWithScoresArray;
};
