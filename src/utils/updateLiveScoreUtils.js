export const liveScoreDataStructure = {
  tournamentId: '',
  matchId: '',
  teamId: '',
  matchStatus: '',
  inningsStatus: '',
  strike: '',
  strikeName: '',
  nonStrike: '',
  nonStrikeName: '',
  bowler: '',
  bowlerName: '',
  team2Id: '',
  runs: 0,
  extras: {
    status: false,
    bye: 0,
    legBye: 0,
    wide: 0,
    noBall: 0,
  },
  wickets: {
    status: false,
    batsmanId: '',
    batsman: '',
    type: '',
    fielderName: '',
    new_batsmanId: '',
    new_batsman: '',
    bowlerName: '',
  },
  commentry: {
    teamId: '',
    teamName: '',
    over: 0,
    balls: 0,
    status: '',
    message: '',
  },
};

// export const convertLiveScoreData = () => {};

const createCommentary = (teamId, over, balls, wickets, extras, runs) => {
  let commentryObj = {...liveScoreDataStructure.commentry};
  // console.warn('=============', extras);
  if (extras.status) {
    commentryObj = {
      ...commentryObj,
      status: extras.bye
        ? 'Bye'
        : extras.legBye
        ? 'Lb'
        : extras.noBall
        ? 'Nb'
        : 'Wd',
      message: `Ohh... it's a ${
        extras.bye ? 'Bye' : extras.legBye ? 'Lb' : extras.noBall ? 'Nb' : 'Wd'
      }`,
    };
  } else if (wickets.status) {
    commentryObj = {
      ...commentryObj,
      status: 'W',
      message: `${wickets.batsman} needs to get back to the pavilion`,
    };
  } else if (runs === 0 || runs) {
    if (runs !== '0') {
      commentryObj = {
        ...commentryObj,
        status: `${runs}`,
        message: 'What a hit by the batsman',
      };
    } else {
      commentryObj = {
        ...commentryObj,
        status: '0',
        message: "That's a dot ball!!",
      };
    }
  }

  return {...commentryObj, teamId};
};

export const convertLiveScoreData = (
  runs,
  extras,
  wickets,
  battingTeamId,
  bowlingTeamId,
  matchId,
  tournamentId,
  matchStatus,
  inningsStatus,
  bowler,
  nonStrike,
  strike,
) => {
  let modifieDataTosend = {
    ...liveScoreDataStructure,
    tournamentId,
    matchId,
    teamId: battingTeamId,
    team2Id: bowlingTeamId,
    matchStatus,
    inningsStatus,
    bowler: bowler.bowler,
    bowlerName: bowler.bowlerName,
    strike: strike.strike,
    strikeName: strike.strikeName,
    nonStrike: nonStrike.nonStrike,
    nonStrikeName: nonStrike.nonStrikeName,
  };

  if (runs === null) {
    runs = 0;
  }
  let batsmanRuns = runs;
  let wideRuns = 0;
  if ((runs === null || runs === 0) && extras === 'Wd') {
    // console.warn('Got a hit');
    wideRuns = 1;
  } else {
    if (extras === 'Wd') {
      wideRuns = +runs;
    }
  }
  let extrasObj = modifieDataTosend.extras;
  if (runs !== null && extras !== null && extras === 'Wd') {
    extrasObj = {
      ...modifieDataTosend.extras,
      status: true,
      wide: wideRuns,
    };
  } else if (runs !== null && extras !== null && extras === 'Bye') {
    batsmanRuns = 0;
    extrasObj = {...modifieDataTosend.extras, status: true, bye: runs};
  } else if (runs !== null && extras !== null && extras === 'Lb') {
    batsmanRuns = 0;
    extrasObj = {...modifieDataTosend.extras, status: true, legBye: runs};
  } else {
    if (extras !== null && extras === 'Nb') {
      batsmanRuns = runs;
      extrasObj = {...modifieDataTosend.extras, status: true, noBall: 1};
    } else {
      extrasObj = {...modifieDataTosend.extras};
    }
  }

  const setCommentary = createCommentary(
    modifieDataTosend.teamId,
    0,
    0,
    wickets,
    extrasObj,
    batsmanRuns,
  );

  let withCommentary = {
    ...modifieDataTosend,
    commentry: setCommentary,
    extras: extrasObj,
  };

  // console.log('-------Runs------', batsmanRuns);
  // console.log('--------Extras----', extrasObj);
  // console.log('--------Wickets--------', wickets);
  // console.log('--------data to send---', withCommentary);
  return withCommentary;
};
