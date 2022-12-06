import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Table, Row, TableWrapper, Rows} from 'react-native-table-component';
import {useSelector} from 'react-redux';
import {getStandingsByTournamentId} from '../services/viewTournament';

const StandingsScreen = ({navigation}) => {
  // const [currentTeams, setCurrentTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {tournamentDetails} = useSelector(state => state.tournamentDetails);
  const [tableHead, setTableHead] = useState([
    'Team ',
    'M',
    'W',
    'L',
    'NR',
    'PTS',
  ]);
  const [tableData, setTableData] = useState([]);
  const loadStandings = async () => {
    setIsLoading(true);
    const response = await getStandingsByTournamentId(tournamentDetails._id);
    setIsLoading(false);
    // console.log(response);
    if (response.status) {
      // console.log(response.data.team);
      let arrayResponse = response.data.team.map(team => [
        team.name,
        team.matchesPlayed,
        team.wins,
        team.losses,
        Math.round(team.netRunRate * 100) / 100,
        team.points,
      ]);
      // console.log(arrayResponse);
      // setCurrentTeams(arrayResponse);
      setTableData(arrayResponse);
    }
  };

  // const [tableData, setTableData] = useState([
  //   ['UDL Strikers', '6', '4', '2', '0', '8', '3.678'],
  //   ['Paras XI', '6', '3', '2', '1', '7', '3.678'],
  //   ['Team Dabangg', '5', '3', '2', '0', '6', '3.678'],
  //   ['Parra Warriors', '6', '2', '1', '0', '4', '3.678'],
  // ]);

  useEffect(() => {
    loadStandings();
  }, []);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={loadStandings} />
      }>
      <View style={{marginTop: 20}}>
        <Table>
          <Row
            data={tableHead}
            flexArr={[2, 1.2, 1, 1, 1, 1.7, 1.5]}
            style={styles.table_header}
            textStyle={styles.header_text}
          />
          <TableWrapper>
            <Rows
              data={tableData}
              heightArr={[50, 50, 50, 50, 50, 50]}
              flexArr={[2, 1.2, 1, 1, 1, 1.7, 1.5]}
              style={styles.row}
              textStyle={styles.row_text}
            />
          </TableWrapper>
        </Table>
      </View>
    </ScrollView>
    //   style={{
    //     borderBottomWidth: 1,
    //     borderBottomColor: 'rgba(217,226,233,0.8)',
    //   }}>
  );
};

export default StandingsScreen;

const styles = StyleSheet.create({
  table_header: {
    borderWidth: 1,
    borderColor: 'rgba(217,226,233,0.5)',
    height: 48,
    backgroundColor: '#DEDEDE',
  },
  header_text: {
    // height: 24,
    // width: 53,
    color: 'rgba(0,0,0,0.87)',
    fontFamily: 'Roboto-Bold',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0,
    // lineHeight: 24,
    // paddingHorizontal: 15,
    textAlign: 'center',
  },
  row: {
    // borderWidth:1,
    height: 65,
    borderTopWidth: 0.2,
    borderTopColor: 'rgba(217,226,233,0.5)',
    borderBottomColor: 'rgba(217,226,233,0.5)',
    borderBottomWidth: 0.2,
  },
  row_text: {
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
  },
});
