const makeArrayOfEqualLength = teamArray => {
  let arrayToreturn = teamArray;
  if (teamArray % 3 !== 0) {
    let temp = (teamArray.length % 3) - 1;
    while (temp > 0) {
      arrayToreturn.push(0);
      temp = temp - 1;
    }
    return arrayToreturn;
  }
  return arrayToreturn;
};

const getAverayRunsOfThreeBalls = equalLenthArray => {
  let newArray = [];
  for (let i = 0; i < equalLenthArray.length - 1; i += 3) {
    let averageElement =
      (equalLenthArray[i] + equalLenthArray[i + 1] + equalLenthArray[i + 2]) /
      3;
    newArray.push(Math.round(averageElement * 100) / 100);
  }

  return newArray;
};

export const createGraphData = team1Array => {
  if (team1Array !== 0 && team1Array !== null && team1Array !== undefined) {
    let eqaulLengthOfTeam1Array = makeArrayOfEqualLength(team1Array);
    let getAverageRunsArray = getAverayRunsOfThreeBalls(
      eqaulLengthOfTeam1Array,
    );
    return getAverageRunsArray;
  } else {
    return [];
  }
};

// console.log(createGraphData([3, 3, 6, 4, 0]));
// console.log(createGraphData(null));
