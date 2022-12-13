import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Button,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useLayoutEffect} from 'react';
import CustomChooseModal from '../components/CustomChooseModal';
import DotBall from '../components/DotBall';
import GradientButton from '../components/GradientButton';
import RadioButton from '../components/RadioButton';
import CustomRadioButton from '../components/CustomRadioButton';
import CustomExtrasButton from '../components/CustomExtrasButton';
import CustomModal from '../components/CustomModal';
import StopMatchModal from '../components/StopMatchModal';
import CustomRunsButton from '../components/CustomRunsButton';
import {useIsFocused} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';

import {
  cancelLiveTournament,
  getListOfAllPlayers,
  getMatchStatus,
  getPlayingPlayersList,
  updateLiveScore,
} from '../services/updateLiveScore';
import {useDispatch, useSelector} from 'react-redux';
import {
  convertLiveScoreData,
  liveScoreDataStructure,
} from '../utils/updateLiveScoreUtils';
import {
  addInitialPlayerSelected,
  addTeam1Players,
  addTeam2Players,
  addTeamId,
  swapTeamId,
  swapTeamPlayers,
} from '../redux/updateLiveScore';
import {changeUpdatePressedState} from '../redux/updateLiveScoreControls';
import {
  DECLARE_END,
  TIME_TO_END_MATCH,
  TIME_TO_FLIP,
  TIME_TO_FLIP_IF_OVERS_COMPLETED,
  TIME_TO_END_MATCH_IF_OVERS_COMPLETED,
} from '../api/constants';

const UpdateLiveScore = ({navigation, route}) => {
  const {tournamentDetails} = useSelector(state => state.tournamentDetails);
  const {
    team1Players,
    team2Players,
    battingTeamId,
    bowlingTeamId,
    initalPlayerSelected,
  } = useSelector(state => state.liveScoreData);

  const dispatch = useDispatch();
  const [isUpdatePressed, setIsUpdatePressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // console.warn(team1Players, team2Players, battingTeamId, bowlingTeamId);

  let {matchId, team1Id, team2Id, teams} = route.params;

  const [runs, setRuns] = useState(liveScoreDataStructure.runs);
  const [extras, setExtras] = useState(liveScoreDataStructure.extras);
  const [wickets, setWickets] = useState(liveScoreDataStructure.wickets);
  const [players, setPlayers] = useState({});
  const [initialPlayersSelectionModal, setInitialPlayerSelectionModal] =
    useState({strikeModal: false, nonStrikeModal: false, bowlerModal: false});
  const [matchAndInningsStatus, setMatchAndInningsStatus] = useState({
    matchStatus: 'start',
    inningsStatus: 'start',
  });
  const [strike, setStrike] = useState({
    strike: '',
    strikeName: '',
  });
  const [nonStrike, setNonStrike] = useState({
    nonStrike: '',
    nonStrikeName: '',
  });
  const [bowler, setBowler] = useState({
    bowler: '',
    bowlerName: '',
  });

  const [presentScoreFromAPI, setPresentScoreFromAPI] = useState({
    runs: 0,
    balls: 0,
    wickets: 0,
    overs: 0,
  });

  const [wicketsStructure, setWicketsStructure] = useState({});
  const [wicketsModal, setWicketsModal] = useState({
    batsmanModal: false,
    fliderModal: false,
    newBatsmanModal: false,
  });
  const [overs, setOvers] = useState({overs: 0, balls: 1});
  // remaining Players
  const [remainingPlayersToBat, setRemainingPlayersToBat] = useState([]);

  const [dataToSend, setDataToSend] = useState({
    tournamentId: tournamentDetails._id,
    matchId: matchId,
    teamId: team1Id,
    team2Id: team2Id,
    matchStatus: 'start',
    inningsStatus: 'start',
    strike: '',
    strikeName: '',
    nonStrike: '',
    nonStrikeName: '',
    bowler: '',
    bowlerName: '',
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
      teamId: team1Id,
      teamName: '',
      over: 0,
      balls: 0,
      status: 'W',
      message: 'he he',
    },
  });

  const getRuns = (data, index) => {
    if (data === null) {
      setRuns(null);
    } else {
      setRuns(data);
      setRunsStatus({...runsStatus, runs: data});
    }
  };

  const getExtras = (data, index) => {
    // console.warn(data);
    if (data === null) {
      setExtras(null);
    } else {
      setExtras(data);
    }
  };
  const getWickets = (data, index) => {
    // console.log(data);
    if (data === null) {
      setWickets({...liveScoreDataStructure.wickets, status: false});
      setWicketsModal({...wicketsModal, newBatsmanModal: false});
    } else {
      if (data === 'Run Out') {
        // TODO: Add the batsman batsmanId from the striker Id even bowler which is got from the PUT response
        setWickets({
          ...liveScoreDataStructure.wickets,
          type: data,
          status: true,
          batsmanId: strike.strike,
          batsman: strike.strikeName,
          bowler: bowler.bowler,
          bowlerName: bowler.bowlerName,
        });
        setWicketsModal({...wicketsModal, batsmanModal: true});
      } else {
        // TODO : Add the batsman batsmanId bowler filder from the Modal fetched from the remaining player list PUT response
        if (data === 'Caught' || data === 'Other') {
          setWicketsModal({
            ...wicketsModal,
            fliderModal: true,
          });
          setWickets({
            ...liveScoreDataStructure.wickets,
            type: data,
            status: true,
            bowler: bowler?.bowler,
            bowlerName: bowler?.bowlerName,
            batsmanId: strike?.strike,
            batsman: strike?.strikeName,
            fielderName: wickets?.fielderName,
          });
        } else {
          setWickets({
            ...liveScoreDataStructure.wickets,
            type: data,
            status: true,
            bowler: bowler?.bowler,
            bowlerName: bowler?.bowlerName,
            batsmanId: strike?.strike,
            batsman: strike?.strikeName,
          });
          setWicketsModal({...wicketsModal, newBatsmanModal: true});
        }
      }
    }
  };

  const inningsTwoStrikeSelection = async () => {
    const returnStrikeAndNonStrike = new Promise(resolve =>
      setInitialPlayerSelectionModal({
        ...initialPlayersSelectionModal,
        strikeModal: true,
      }),
    );
    return returnStrikeAndNonStrike;
  };

  const handelUpdate = async () => {
    const updateScores = convertLiveScoreData(
      runs,
      extras,
      wickets,
      battingTeamId,
      bowlingTeamId,
      matchId,
      tournamentDetails._id,
      matchAndInningsStatus.matchStatus,
      matchAndInningsStatus.inningsStatus,
      bowler,
      nonStrike,
      strike,
      presentScoreFromAPI,
    );

    console.info(updateScores);

    // console.info(updateScores);

    // TODO:---------------------------Think

    // console.info('.....BattingTeamId....BeforeSwap', battingTeamId);
    // console.info('.....BowlingTeamId....BeforeSwap', bowlingTeamId);
    setIsLoading(true);
    const update = await updateLiveScore(updateScores);
    setIsLoading(false);
    if (
      updateScores.commentry.balls + 1 === 7 &&
      update?.tournamentEntitledOvers !== updateScores.commentry.over
    ) {
      setInitialPlayerSelectionModal({
        ...initialPlayersSelectionModal,
        bowlerModal: true,
      });
    }
    console.log('----------------------------------', update);
    let inningsTwoUpdate;
    if (update.status) {
      if (
        update?.message === TIME_TO_FLIP ||
        update?.message === TIME_TO_FLIP_IF_OVERS_COMPLETED
      ) {
        dispatch(swapTeamId());
        dispatch(swapTeamPlayers());
        // console.log('=====Wait ======');

        await inningsTwoStrikeSelection();
        // console.log('+++Got A Hit After Selection');
        // setInitialPlayerSelectionModal({
        //   ...initialPlayersSelectionModal,
        //   strikeModal: true,
        // });

        // console.info('.....BattingTeamId....AfterSwap', battingTeamId);
        // console.info('.....BowlingTeamId....AfterSwap', bowlingTeamId);

        setIsLoading(true);
        inningsTwoUpdate = await updateLiveScore(
          convertLiveScoreData(
            runs,
            extras,
            wickets,
            bowlingTeamId,
            battingTeamId,
            matchId,
            tournamentDetails._id,
            matchAndInningsStatus.matchStatus,
            matchAndInningsStatus.inningsStatus,
            bowler,
            nonStrike,
            strike,
            presentScoreFromAPI,
          ),
        );
        setIsLoading(false);
        // console.warn('----------------------------------', inningsTwoUpdate);

        // console.log(
        //   '======Converted Data====',
        //   convertLiveScoreData(
        //     runs,
        //     extras,
        //     wickets,
        //     bowlingTeamId,
        //     battingTeamId,
        //     matchId,
        //     tournamentDetails._id,
        //     matchAndInningsStatus.matchStatus,
        //     matchAndInningsStatus.inningsStatus,
        //     bowler,
        //     nonStrike,
        //     strike,
        //     presentScoreFromAPI,
        //   ),
        // );

        // console.info('--------------', inningsTwoUpdate);
        // if (
        //   update?.message === TIME_TO_END_MATCH ||
        //   update?.message === DECLARE_END
        // ) {
        //   // console.log('Got a Hit');
        //   let lastData = convertLiveScoreData(
        //     runs,
        //     extras,
        //     wickets,
        //     battingTeamId,
        //     bowlingTeamId,
        //     matchId,
        //     tournamentDetails._id,
        //     matchAndInningsStatus.matchStatus,
        //     matchAndInningsStatus.inningsStatus,
        //     bowler,
        //     nonStrike,
        //     strike,
        //     presentScoreFromAPI,
        //   );
        //   // console.info('TTTTttttttttttttttttttttttttttttttt', lastData);
        //   const endMatchNow = await updateLiveScore({
        //     ...lastData,
        //     matchStatus: 'end',
        //   });
        //   // console.info('+++++++PUT Req Res+++++++', endMatchNow);
        //   if (endMatchNow?.matchDone?.statusMessage) {
        //     Alert.alert(`${endMatchNow?.matchDone?.statusMessage}`);
        //   }
        // }
      } else {
        if (
          update?.message === TIME_TO_END_MATCH ||
          update?.message === DECLARE_END ||
          update?.message === TIME_TO_END_MATCH_IF_OVERS_COMPLETED
        ) {
          console.log(update);
          let lastData = convertLiveScoreData(
            runs,
            extras,
            wickets,
            battingTeamId,
            bowlingTeamId,
            matchId,
            tournamentDetails._id,
            matchAndInningsStatus.matchStatus,
            matchAndInningsStatus.inningsStatus,
            bowler,
            nonStrike,
            strike,
            presentScoreFromAPI,
          );
          // console.info('TTTTttttttttttttttttttttttttttttttt', lastData);
          setIsLoading(true);
          const endMatchNow = await updateLiveScore({
            ...lastData,
            matchStatus: 'end',
          });
          setIsLoading(false);
          // console.info('+++++++PUT Req Res+++++++', endMatchNow);
          if (endMatchNow?.matchDone?._id) {
            Toast.show(
              'Match has ended please check the match details in view mode',
            );
            navigation.goBack();
            // make an async call and navigate back to the matches screen with a reload......
            // check only if endMatchNow?.matchDone?._id is present and make an API call Accordingly.....
            // console.log(endMatchNow?.matchDone);
            // Alert.alert(`${endMatchNow?.matchDone?.statusMessage}`);
            // const endMatch = await updateLiveScore({
            //   ...liveScoreDataStructure,
            //   matchStatus: 'end',
            // });
            // console.log('=====++++++======', endMatch);
          }
        } else {
          setIsLoading(true);
          const simplifiedResponse = await getPlayingPlayersList(
            tournamentDetails._id,
            matchId,
            battingTeamId,
            bowlingTeamId,
          );
          setIsLoading(false);
          // console.info('=========================', simplifiedResponse?.data);
          let currentScores = simplifiedResponse?.data?.scoreOfTeam1;
          setPresentScoreFromAPI({
            ...presentScoreFromAPI,
            runs: currentScores.runs,
            overs: currentScores.over,
            balls: currentScores.balls,
            wickets: currentScores.wickets,
          });
          setRemainingPlayersToBat(simplifiedResponse?.data?.remainingBatsMan);
          setOvers({overs: currentScores.over, balls: currentScores.balls});
          setStrike({
            strike: currentScores.strike,
            strikeName: currentScores.strikeName,
          });
          setNonStrike({
            nonStrike: currentScores.nonStrike,
            nonStrikeName: currentScores.nonStrikeName,
          });
          dispatch(changeUpdatePressedState());
          setRuns(liveScoreDataStructure.runs);
          setWickets(liveScoreDataStructure.wickets);
          setExtras(liveScoreDataStructure.extras);
        }
      }
    }
  };

  const Details = [
    {
      id: 1,
      title: 'Sashikant D',
    },
    {
      id: 2,
      title: 'Subham B (c)',
    },
    {
      id: 3,
      title: 'Prathik D',
    },
    {
      id: 4,
      title: 'Rahul M',
    },
    {
      id: 5,
      title: 'Prashanth P',
    },
    {
      id: 6,
      title: 'Vipin M',
    },
  ];

  const Reason = [
    {
      id: 1,
      title: `${route.params.teams.team1Name} didn't show Up`,
    },
    {
      id: 2,
      title: `${route.params.teams.team2Name} didn't show up`,
    },
    {
      id: 3,
      title: 'Bad Weather',
    },
    {
      id: 4,
      title: 'Other',
    },
  ];

  const radio_props = [
    {label: 'Hit Wicket', value: 'Hit Wicket', id: 0},
    {label: 'Stumped', value: 'Stumped', id: 1},
    {label: 'Run Out', value: 'Run Out', id: 2},
    {label: 'Bowled', value: 'Bowled', id: 3},
    {label: 'LBW', value: 'LBW', id: 4},
    {label: 'Caught', value: 'Caught', id: 5},
    {label: 'Other', value: 'Other', id: 6},
  ];
  const run_props = [
    {label: '0', value: '0', id: 0},
    {label: '1', value: '1', id: 1},
    {label: '2', value: '2', id: 2},
    {label: '3', value: '3', id: 3},
    {label: '4', value: '4', id: 4},
    {label: '6', value: '6', id: 5},
  ];
  const extra_props = [
    {label: 'Wd', value: 'Wd', id: 0},
    {label: 'Nb', value: 'Nb', id: 1},
    {label: 'Bye', value: 'Bye', id: 2},
    {label: 'Lb', value: 'Lb', id: 3},
  ];
  const [visible, setVisible] = useState({
    stopModal: false,
    customChooseModal: false,
  });

  const [runsStatus, setRunsStatus] = useState({
    runs: 0,
    wicketsType: '',
    extrasType: '',
  });

  const focus = useIsFocused(); // useIsFocused as shown

  useEffect(() => {
    dispatch(addTeamId({team1Id, team2Id}));

    if (focus === true) {
      const getStatus = async () => {
        const response = await getMatchStatus(matchId);
        if (response?.status) {
          if (response?.data?.result?.status === 'upcoming') {
            setMatchAndInningsStatus({
              matchStatus: 'start',
              inningsStatus: 'start',
            });
            dispatch(addTeam1Players(response?.data?.team1Player));
            dispatch(addTeam2Players(response?.data?.team2Player));
            // console.log(response?.data?.team2Player);

            let openerSelectionCheck = initalPlayerSelected.filter(
              item => item.matchId === matchId,
            );
            if (
              openerSelectionCheck.length !== 0 &&
              openerSelectionCheck[0].status === false
            ) {
              setInitialPlayerSelectionModal({
                ...initialPlayersSelectionModal,
                strikeModal: true,
              });
            } else if (!openerSelectionCheck.length) {
              setInitialPlayerSelectionModal({
                ...initialPlayersSelectionModal,
                strikeModal: true,
              });
            } else {
              setInitialPlayerSelectionModal({
                ...initialPlayersSelectionModal,
                strikeModal: false,
              });
            }
          } else {
            const result = await getPlayingPlayersList(
              tournamentDetails._id,
              matchId,
              battingTeamId,
              bowlingTeamId,
            );
            // console.info(
            //   'Match Details -----',
            //   team1Id,
            //   team2Id,
            //   tournamentDetails._id,
            //   matchId,
            // );
            // console.warn('=============Got a Hit', result?.data?.scoreOfTeam1);
            if (result?.data?.scoreOfTeam1?.inningsMessage === 'Innings Done') {
              // dispatch(swapTeamId());
              // console.info(result?.data?.scoreOfTeam1?.inningsMessage);
              setStrike({
                strike: result?.data?.scoreOfTeam1?.strike,
                strikeName: result?.data?.scoreOfTeam1?.strikeName,
              });
              setNonStrike({
                nonStrike: result?.data?.scoreOfTeam1?.nonStrike,
                nonStrikeName: result?.data?.scoreOfTeam1?.nonStrikeName,
              });

              setPresentScoreFromAPI({
                runs: result?.data?.scoreOfTeam1?.runs,
                overs: result?.data?.scoreOfTeam1?.over,
                wickets: result?.data?.scoreOfTeam1?.wickets,
                balls: result?.data?.scoreOfTeam1?.balls,
              });
            } else {
              setMatchAndInningsStatus({
                matchStatus: 'start',
                inningsStatus: 'start',
              });
              dispatch(addTeam1Players(response?.data?.team1Player));
              dispatch(addTeam2Players(response?.data?.team2Player));
              setStrike({
                strike: result?.data?.scoreOfTeam1?.strike,
                strikeName: result?.data?.scoreOfTeam1?.strikeName,
              });
              setNonStrike({
                nonStrike: result?.data?.scoreOfTeam1?.nonStrike,
                nonStrikeName: result?.data?.scoreOfTeam1?.nonStrikeName,
              });

              setPresentScoreFromAPI({
                runs: result?.data?.scoreOfTeam1?.runs,
                overs: result?.data?.scoreOfTeam1?.over,
                wickets: result?.data?.scoreOfTeam1?.wickets,
                balls: result?.data?.scoreOfTeam1?.balls,
              });
              setBowler({
                bowler: result?.data?.scoreOfTeam1?.bowler,
                bowlerName: result?.data?.scoreOfTeam1?.bowlerName,
              });
            }
          }
        }
      };
      getStatus();
    }
  }, [focus]);
  // console.warn('====', nonStrike, '====', strike, '----', bowler);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.backgroundBeyondSafeArea}>
          <SafeAreaView>
            <View style={styles.profileDetailsContainer}>
              <View style={styles.navBar}>
                <View style={styles.navContainer}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                      source={require('../../assets/images/goback.png')}
                      style={{height: 20, width: 20}}
                    />
                  </TouchableOpacity>
                  <Text style={styles.headerName}>Update Live Score</Text>
                </View>
                <View
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    onPress={() => setVisible({...visible, stopModal: true})}>
                    <Image
                      source={require('../../assets/images/icon-vertical-dots.png')}
                      style={styles.verticalDots}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </View>
        {/* start */}
        <View style={styles.infoView}>
          <View style={{paddingLeft: 15}}>
            {wickets?.status ? (
              <Text style={[styles.comment, {color: '#C44343'}]}>
                {wickets?.type}
              </Text>
            ) : runsStatus?.runs == 4 || runsStatus?.runs == 6 ? (
              <Text style={[styles.comment, {color: '#5FB100'}]}>
                {runsStatus?.runs == 4 ? 'Boundary' : 'Sixer'}
              </Text>
            ) : (
              <Text style={[styles.comment, {color: '#4A90E2'}]}>
                {extras !== null && extras?.status !== false && (
                  <Text style={{color: '#FF8713'}}>
                    {extras === 'Wd'
                      ? 'Wide  '
                      : extras === 'Lb'
                      ? 'Leg Bye  '
                      : extras === 'Nb'
                      ? 'No ball  '
                      : 'Bye  '}
                  </Text>
                )}
                {runsStatus?.runs} Runs
              </Text>
            )}
            {/* <DotBall style={{backgroundColor:"rgba(0,0,0,0.2)"}}/> */}
            {wickets.status ? (
              <Text style={styles.calculatedFiled}>
                {wickets.type === 'Caught' || wickets.type === 'Other'
                  ? `${wickets.type} by ${wickets.bowlerName}`
                  : wickets?.type}
              </Text>
            ) : (
              <Text style={styles.calculatedFiled}>
                {runsStatus?.runs} Runs
              </Text>
            )}
          </View>
          <View style={{padding: 20}}>
            <Text
              style={
                styles.overText
              }>{`${presentScoreFromAPI?.overs}.${presentScoreFromAPI?.balls} Overs`}</Text>
            <Text
              style={
                styles.overNumber
              }>{`${presentScoreFromAPI?.runs}/${presentScoreFromAPI?.wickets}`}</Text>
          </View>
        </View>
        <CustomChooseModal
          visible={visible.customChooseModal}
          onPress={() =>
            setVisible({customChooseModal: false, stopModal: false})
          }>
          <Text style={styles.textView}>Choose Reason</Text>
          <ScrollView>
            {Reason.map(item => (
              <View key={item.id} style={styles.listview}>
                <TouchableOpacity
                  onPress={async () => {
                    const response = await cancelLiveTournament(
                      route.params?.matchId,
                      item?.title,
                    );
                    // console.info('--------------', response);
                    if (response.status) {
                      setVisible({customChooseModal: false, stopModal: false});
                      navigation.goBack();
                    } else {
                      Alert.alert('Error Occoured Please Try Again');
                    }
                  }}>
                  <View style={{width: '100%'}}>
                    <Text style={styles.title}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </CustomChooseModal>
        <CustomChooseModal
          visible={initialPlayersSelectionModal.strikeModal}
          onPress={() =>
            setInitialPlayerSelectionModal({
              ...initialPlayersSelectionModal,
              strikeModal: false,
            })
          }>
          <Text style={styles.textView}>Select Strike</Text>
          <ScrollView>
            {team1Players.map(item => (
              <View key={item._id} style={styles.listview}>
                <TouchableOpacity
                  onPress={() => {
                    setStrike({
                      strike: item._id,
                      strikeName: item.name,
                    });
                    // dispatch(
                    //   addInitialPlayerSelected({
                    //     matchId: matchId,
                    //     status: true,
                    //   }),
                    // );
                    setInitialPlayerSelectionModal({
                      ...initialPlayersSelectionModal,
                      nonStrikeModal: true,
                      strikeModal: false,
                    });
                  }}>
                  <View style={{width: '100%'}}>
                    <Text style={styles.title}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </CustomChooseModal>
        <CustomChooseModal
          visible={initialPlayersSelectionModal.nonStrikeModal}
          onPress={() =>
            setInitialPlayerSelectionModal({
              ...initialPlayersSelectionModal,
              nonStrikeModal: false,
            })
          }>
          <Text style={styles.textView}>Select Non Strike</Text>
          <ScrollView>
            {team1Players.map(item => {
              return (
                <View key={item._id} style={styles.listview}>
                  <TouchableOpacity
                    onPress={() => {
                      setNonStrike({
                        nonStrike: item._id,
                        nonStrikeName: item.name,
                      });
                      setRemainingPlayersToBat(() =>
                        team1Players.filter(
                          players =>
                            players._id !== item._id &&
                            players._id !== strike.strike,
                        ),
                      );
                      setInitialPlayerSelectionModal({
                        ...initialPlayersSelectionModal,
                        nonStrikeModal: false,
                        bowlerModal: true,
                      });
                    }}>
                    <View style={{width: '100%'}}>
                      <Text style={styles.title}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </CustomChooseModal>
        <CustomChooseModal
          visible={initialPlayersSelectionModal.bowlerModal}
          onPress={() =>
            setInitialPlayerSelectionModal({
              ...initialPlayersSelectionModal,
              bowlerModal: false,
            })
          }>
          <Text style={styles.textView}>Select Bowler</Text>
          <ScrollView>
            {team2Players.map(item => {
              return (
                <View key={item._id} style={styles.listview}>
                  <TouchableOpacity
                    onPress={() => {
                      setBowler({
                        bowler: item._id,
                        bowlerName: item.name,
                      });
                      setInitialPlayerSelectionModal({
                        ...initialPlayersSelectionModal,
                        bowlerModal: false,
                      });
                    }}>
                    <View style={{width: '100%'}}>
                      <Text style={styles.title}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </CustomChooseModal>
        <CustomChooseModal
          visible={wicketsModal.batsmanModal}
          onPress={() =>
            setWicketsModal({...wicketsModal, batsmanModal: false})
          }>
          <Text style={styles.textView}>Choose batsman</Text>
          <ScrollView>
            <View key={strike.strike} style={styles.listview}>
              <TouchableOpacity
                onPress={() => {
                  setWickets({
                    ...wickets,
                    batsmanId: strike.strike,
                    batsman: strike.strikeName,
                  });
                  setWicketsModal({
                    ...wicketsModal,
                    batsmanModal: false,
                    fliderModal: true,
                  });
                }}>
                <View style={{width: '100%'}}>
                  <Text style={styles.title}>{strike.strikeName}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View key={nonStrike.nonStrike} style={styles.listview}>
              <TouchableOpacity
                onPress={() => {
                  setWickets({
                    ...wickets,
                    batsmanId: nonStrike.nonStrike,
                    batsman: nonStrike.nonStrikeName,
                  });
                  setWicketsModal({
                    ...wicketsModal,
                    batsmanModal: false,
                    fliderModal: true,
                  });
                }}>
                <View style={{width: '100%'}}>
                  <Text style={styles.title}>{nonStrike.nonStrikeName}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </CustomChooseModal>
        <CustomChooseModal
          visible={wicketsModal.fliderModal}
          onPress={() => setWickets({...wicketsModal, fliderModal: false})}>
          <Text style={styles.textView}>Select Fielder</Text>
          <ScrollView>
            {team2Players.map(item => {
              return (
                <View key={item._id} style={styles.listview}>
                  <TouchableOpacity
                    onPress={() => {
                      setWickets({
                        ...wickets,
                        fielderName: item.name,
                      });
                      setWicketsModal({
                        ...wicketsModal,
                        fliderModal: false,
                        newBatsmanModal: true,
                      });
                    }}>
                    <View style={{width: '100%'}}>
                      <Text style={styles.title}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </CustomChooseModal>
        <CustomChooseModal
          visible={
            remainingPlayersToBat.length === 0
              ? false
              : wicketsModal.newBatsmanModal
          }
          onPress={() =>
            setWicketsModal({...wicketsModal, newBatsmanModal: false})
          }>
          <Text style={styles.textView}>Select New Batsman</Text>
          <ScrollView>
            {remainingPlayersToBat.map(item => {
              return (
                <View key={item._id} style={styles.listview}>
                  <TouchableOpacity
                    onPress={() => {
                      setWickets({
                        ...wickets,
                        new_batsmanId: item._id,
                        new_batsman: item.name,
                      });
                      setWicketsModal({
                        ...wicketsModal,
                        newBatsmanModal: false,
                      });
                    }}>
                    <View style={{width: '100%'}}>
                      <Text style={styles.title}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </CustomChooseModal>
        <View style={styles.mainView}>
          <View style={{width: '63%'}}>
            <Text style={styles.runs}>Runs</Text>
            <CustomRunsButton
              radio_props={run_props}
              formHorizontal={true}
              style={styles.runsRadioGroup}
              flexWrap={{flexWrap: 'wrap'}}
              onPress={getRuns}
            />
          </View>
          <View style={{width: '46%', paddingRight: 1}}>
            <Text style={styles.extras}>Extras</Text>
            <CustomExtrasButton
              radio_props={extra_props}
              formHorizontal={true}
              style={styles.extrasRadioGroup}
              flexWrap={{flexWrap: 'wrap'}}
              onPress={getExtras}
            />
          </View>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={styles.wickets}>Wickets</Text>
        </View>
        <View
          style={{
            // marginHorizontal: 10,
            padding: 20,
          }}>
          <CustomRadioButton
            radio_props={radio_props}
            formHorizontal={true}
            style={{
              marginRight: 17.5,
              marginBottom: 15,
              borderWidth: 1,
              width: 'auto',
            }}
            flexWrap={{flexWrap: 'wrap'}}
            onPress={getWickets}
          />
        </View>
      </ScrollView>
      <StopMatchModal visible={visible.stopModal}>
        <TouchableOpacity
          onPress={() => {
            setVisible({customChooseModal: true, stopModal: false});
          }}>
          <Text>Stop Match</Text>
        </TouchableOpacity>
      </StopMatchModal>
      <View style={{marginBottom: Platform.OS === 'ios' ? 20 : 0}}>
        {isLoading ? (
          <ActivityIndicator size={'large'} color={'#FFBA8C'} />
        ) : (
          <GradientButton
            start={{x: 0, y: 0}}
            end={{x: 2, y: 0}}
            colors={['#FFBA8C', '#FE5C6A']}
            text="UPDATE"
            style={{height: 50, width: '100%', marginTop: 0}}
            textstyle={styles.buttonText}
            onPress={handelUpdate}
          />
        )}
      </View>
    </View>
  );
};

export default UpdateLiveScore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileDetailsContainer: {
    height: 40,
    marginTop: 15,
  },
  backgroundBeyondSafeArea: {
    backgroundColor: 'rgba(0, 102, 226, 1)',
    paddingRight: 20,
    paddingLeft: 20,
  },
  headerName: {
    height: 24,
    width: 188,
    color: '#FFFFFF',
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 24,
    marginHorizontal: '10%',
  },
  overText: {
    height: 14,
    // width: 51,
    color: 'rgba(0,0,0,0.54)',
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    letterSpacing: 0,
    lineHeight: 14,
    textAlign: 'right',
  },
  overNumber: {
    height: 16,
    // width: 30,
    color: 'rgba(0,0,0,0.54)',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
    textAlign: 'right',
    marginTop: 5,
  },
  mainView: {
    padding: 20,
    flexDirection: 'row',
    height: 220,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: 0.3,
  },
  runs: {
    height: 21,
    // width: 38,
    color: 'rgba(0,0,0,0.87)',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 19,
  },
  extras: {
    height: 21,
    // width: 38,
    color: 'rgba(0,0,0,0.87)',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 19,

    marginHorizontal: '10%',
  },
  wickets: {
    height: 21,
    // width: 38,
    color: 'rgba(0,0,0,0.87)',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 19,
    paddingHorizontal: 20,
  },

  //   csd

  textView: {
    height: 18,
    // width: 108,
    color: 'rgba(0,0,0,0.87)',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    letterSpacing: 0,
    fontWeight: '500',
    lineHeight: 19,
    textAlign: 'center',
    // alignItems:"center",
    // justifyContent:"center",
    marginTop: 10,
  },
  infoView: {
    height: 70,
    width: '100%',
    borderBottomColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  listview: {
    top: 15,
    flexDirection: 'row',
  },
  title: {
    height: 50,
    width: 310.1,
    borderWidth: 0.2,
    borderColor: 'rgba(0,0,0,0.1)',
    color: 'rgba(77,77,77,0.87)',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 24,
    padding: 15,
  },
  image: {
    height: 13,
    width: 13,
    tintColor: '#000000',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  verticalDots: {
    marginHorizontal: '-1%',
    tintColor: '#FFFFFF',
    height: 25,
    width: 25,
  },
  runsRadioGroup: {
    marginRight: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 2,
    marginTop: 15,
  },
  extrasRadioGroup: {
    marginRight: 7,
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 15,
    marginTop: 15,
    borderColor: '#FF8713',
  },
  buttonText: {
    height: 16,
    fontWeight: '500',
    fontSize: 14,
    letterSpacing: 0.5,
    lineHeight: 19,
  },
  comment: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Roboto-Medium',
  },
  calculatedFiled: {
    color: '#999999',
    lineHeight: 20,
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
});
