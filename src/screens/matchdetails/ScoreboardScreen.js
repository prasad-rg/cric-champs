import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Table, TableWrapper, Row, Rows} from 'react-native-table-component';
import {getScoreBoardByMatchIdAndBothTeamId} from '../../services/viewTournament';
import DropdownField from '../../components/DropdownField';

const ScoreboardScreen = ({navigation, route}) => {
  let teams = [
    {
      id: route?.params?.team1Id,
      name: route?.params?.teams.team1Name,
    },
    {
      id: route?.params?.team2Id,
      name: route?.params?.teams.team2Name,
    },
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [scoreBoard, setScoreBoard] = useState();
  console.info(route.params);

  const [visible, setVisible] = useState(false);

  const [tableHead, setTableHead] = useState([
    'Batsman',
    'R',
    'B',
    '4s',
    '6s',
    'SR',
  ]);
  const [tableData, setTableData] = useState([
    ['Anupam K \nc Mohan b Nilesh', '0', '0', '0', '0', '0'],
    ['Sripathi J\nb Mohan b Nilesh', '0', '0', '0', '0', '0'],
    ['Anupam K\nc Mohan b Nilesh', '0', '0', '0', '0', '0'],
    ['Sripathi J\nb Mohan b Nilesh', '0', '0', '0', '0', '0'],
    ['Anupam K\nc Mohan b Nilesh', '0', '0', '0', '0', '0'],
  ]);
  const [tableHeader, setTableHeader] = useState([
    'Bowler',
    'O',
    'M',
    'R',
    'W',
    'ER',
  ]);
  const [data, setData] = useState([
    ['Sashikant D', '0', '0', '0', '0', '0'],
    ['Sashikant D', '0', '0', '0', '0', '0'],
  ]);

  const loadScoreBoard = async teamId => {
    let team2Id =
      teamId === route.params.team1Id
        ? route.params.team2Id
        : route.params.team1Id;

    setIsLoading(true);
    const response = await getScoreBoardByMatchIdAndBothTeamId(
      route.params.matchId,
      teamId,
      team2Id,
    );
    setIsLoading(false);
    if (response.status) {
      setScoreBoard(response.data);
      let arrayResponse = response.data?.playersOfTeam1?.map(player => {
        let tempArr = [
          `${player?.playerName}\nc ${player?.wicket?.fielderName} b ${player?.wicket?.bowlerName}`,
          player?.runsScored,
          `${player?.overFaced}.${player?.ballsFaced}`,
          `${player?.fours}`,
          `${player?.sixes}`,
          `${Math.round(player?.strikeRate * 100) / 100}`,
        ];
        if (player?.wicket === undefined) {
          if (player?.currentlyBatting) {
            tempArr[0] = `${player?.playerName}*\nNot Out`;
          } else {
            tempArr[0] = `${player?.playerName}\nNot Out`;
          }
        }

        return tempArr;
      });
      setTableData(arrayResponse);
      let bowlerData = response?.data?.playersOfTeam2?.map(bowler => {
        let bowlerArray = [
          bowler?.playerName,
          bowler?.overBowled,
          bowler?.maiden,
          bowler?.runsConceded,
          bowler?.wicketsTaken,
          bowler?.economyRate,
        ];
        if (bowler?.currentlyBatting) {
          bowlerArray[0] = `${bowler?.playerName}*`;
        }
        return bowlerArray;
      });
      setData(bowlerData);
      // console.log(arrayResponse);
      // setCurrentTeams(arrayResponse);
      // setTableData(arrayResponse);
    }
  };
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (selectedItem === null) {
      loadScoreBoard(route.params.team1Id);
    } else {
      loadScoreBoard(selectedItem.id);
    }
  }, [selectedItem]);

  const onSelect = item => {
    setSelectedItem(item);
  };
  console.log(' i am selected Item', selectedItem?.id);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.mainView}>
          {/* <Text style={styles.header}>UDL Strikers Innings</Text>
              <TouchableOpacity>
          <Image source={require('../../../assets/images/downArrow.png')} style={{tintColor:"grey",height:15,width:18}} />
          </TouchableOpacity> */}

          <DropdownField
            data={teams}
            onSelect={onSelect}
            value={selectedItem}
            team1Name={teams[0].name}
          />
          <View style={{flexDirection: 'row'}}>
            <Text
              style={
                styles.number1
              }>{`${scoreBoard?.score?.runs}/${scoreBoard?.score?.wickets}`}</Text>
            <Text
              style={
                styles.secondNumber
              }>{`(${scoreBoard?.score?.over}.${scoreBoard?.score?.balls})`}</Text>
          </View>
        </View>

        <Table style={{marginTop: 10}}>
          <Row
            data={tableHead}
            flexArr={[3, 1, 1.2, 0.8, 0.8, 1.4]}
            style={styles.table_header}
            textStyle={styles.header_text}
          />
          <TableWrapper>
            <Rows
              data={tableData}
              heightArr={[50, 50, 50, 50, 50, 50]}
              flexArr={[3, 1, 1.2, 0.8, 0.8, 1.4]}
              textStyle={styles.row_text}
            />
          </TableWrapper>
        </Table>

        <View style={styles.extraView}>
          <Text style={styles.extra}> Extras</Text>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: '10%',
              marginLeft: '27%',
            }}>
            <Text style={styles.extraNumber}>
              {` ${
                scoreBoard?.score?.bye +
                scoreBoard?.score?.legBye +
                scoreBoard?.score?.wide +
                scoreBoard?.score?.noBall +
                scoreBoard?.score?.penalty
              }`}
            </Text>
            <Text style={styles.extraInfo}>
              {` (b ${scoreBoard?.score?.bye}, lb ${scoreBoard?.score?.legBye}, w ${scoreBoard?.score?.wide}, nb ${scoreBoard?.score?.noBall}, p ${scoreBoard?.score?.penalty})`}
            </Text>
          </View>
        </View>
        <View style={{height: 50, alignItems: 'center', flexDirection: 'row'}}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalNumber}>{`${scoreBoard?.score?.runs}`}</Text>
        </View>
        <View>
          <Text style={styles.fallText}>Fall of Wickets</Text>
          <Text style={styles.fallView}>
            {scoreBoard?.score?.fallOfWicket?.map(
              fall =>
                `${fall?.runs}/${fall?.wickets} (${fall?.batsmanName}, ${fall?.over}.${fall?.balls}), `,
            )}
          </Text>
        </View>
        <Table>
          <Row
            data={tableHeader}
            flexArr={[3, 1, 1, 1, 1, 1]}
            style={styles.table_header}
            textStyle={styles.header_text}
          />
          <TableWrapper>
            <Rows
              data={data}
              heightArr={[40, 40, 40, 40, 40, 40]}
              flexArr={[3, 1, 1, 1, 1, 1]}
              textStyle={styles.row_text}
            />
          </TableWrapper>
        </Table>
      </ScrollView>
    </View>
  );
};

export default ScoreboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    width: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  header: {
    height: 16,
    color: '#8E9BA8',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
  },
  number1: {
    height: 30,
    width: 70,
    color: '#000000',
    fontFamily: 'Roboto-Medium',
    fontSize: 24,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 28,
    paddingTop: 7,
  },
  secondNumber: {
    height: 30,
    width: 40,
    color: '#000000',
    fontFamily: 'Roboto-Light',
    fontSize: 20,
    fontWeight: '300',
    letterSpacing: 0,
    lineHeight: 24,
    marginTop: 8.5,
  },
  table_header: {
    borderWidth: 1,
    borderColor: 'rgba(217,226,233,0.5)',
    height: 48,
    backgroundColor: 'rgba(217,226,233,0.5)',
  },
  header_text: {
    color: 'rgba(0,0,0,0.87)',
    fontFamily: 'Roboto-Bold',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0,
    lineHeight: 24,
    paddingHorizontal: 15,
  },
  row_text: {
    paddingHorizontal: 15,
  },
  fallText: {
    height: 50,
  },
  extraView: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  extra: {
    height: 19,
    color: 'rgba(0,0,0,0.87)',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 16,
    paddingHorizontal: 3,
  },
  extraNumber: {
    height: 19,
    color: 'rgba(0,0,0,0.87)',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
  },
  extraInfo: {
    height: 19,
    color: 'rgba(0,0,0,0.87)',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 16,
  },
  totalText: {
    height: 19,
    color: 'rgba(0,0,0,0.87)',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  totalNumber: {
    height: 19,
    color: 'rgba(0,0,0,0.87)',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
    marginLeft: '25%',
  },
  fallText: {
    height: 50,
    color: 'rgba(0,0,0,0.87)',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(217,226,233,0.5)',
  },
  fallView: {
    color: 'rgba(0,0,0,0.87)',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 28,
    padding: 15,
  },
});
