export const convertMatchesDataWithScores = data => {
  let allScroes = data.scores;
  let allMatches = data.matches;

  // console.warn('=====================', allMatches);

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

  // console.info(newMatchesWithScoresArray);
  return newMatchesWithScoresArray;
};
