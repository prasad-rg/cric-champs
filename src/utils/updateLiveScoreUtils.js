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

export const converLiveScoreData = (runs, extras, wickets) => {
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
  let extrasObj = liveScoreDataStructure.extras;
  if (runs !== null && extras !== null && extras === 'Wd') {
    extrasObj = {
      ...liveScoreDataStructure.extras,
      status: true,
      wide: wideRuns,
    };
  } else if (runs !== null && extras !== null && extras === 'Bye') {
    batsmanRuns = 0;
    extrasObj = {...liveScoreDataStructure.extras, status: true, bye: runs};
  } else if (runs !== null && extras !== null && extras === 'Lb') {
    batsmanRuns = 0;
    extrasObj = {...liveScoreDataStructure.extras, status: true, legBye: runs};
  } else {
    if (extras !== null && extras === 'Nb') {
      batsmanRuns = runs;
      extrasObj = {...liveScoreDataStructure.extras, status: true, noBall: 1};
    } else {
      extrasObj = {...liveScoreDataStructure.extras};
    }
  }

  console.log('-------Runs------', batsmanRuns);
  console.log('--------Extras----', extrasObj);
  console.log('--------Wickets--------', wickets);
};
