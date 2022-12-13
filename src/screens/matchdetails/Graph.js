import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {LineChart} from 'react-native-chart-kit';
import {getGraphValues} from '../../services/viewTournament';
import {createGraphData} from '../../utils/graphDataConversion';

const MyLineChart = ({team1Name, team2Name, team1Values, team2Values}) => {
  let team1GraphValues = createGraphData(team1Values);
  let team2GraphValues = createGraphData(team2Values);

  return (
    <>
      <Text style={styles.header}>Run Rate</Text>
      <LineChart
        data={{
          // labels: ['0.3', '1.0', '1.3', '2.0', '2.3', '3.0'],
          labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
          datasets: [
            {
              data: [...team1Values],
              color: (opacity = 0) => `rgba(255, 0, 0, ${opacity})`,

              strokeWidth: 2,
            },
            {
              data: [...team2Values],
              color: (opacity = 1) => `rgba(0, 65, 244, ${opacity})`,
              strokeWidth: 2,
            },
          ],
          legend: [team1Name, team2Name],
        }}
        width={Dimensions.get('window').width - 16}
        height={300}
        // withDots={false}
        withShadow={false}
        chartConfig={{
          // backgroundColor: 'red',
          backgroundGradientFrom: 'rgb(255, 255, 266)',
          backgroundGradientTo: '#efefef',
          backgroundGradientToOpacity: 0.5,
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            // borderRadius: 17,
          },
        }}
        style={{
          marginVertical: 8,
          // borderRadius: 10,
        }}
      />
    </>
  );
};

const Graph = ({navigation, route}) => {
  const [team1Values, setTeam1Values] = useState([]);
  const [team2Values, setTeam2Values] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [matchNotStarted, setMatchNotStarted] = useState(true);
  const [isRefreshed, setIsRefreshed] = useState(false);

  useEffect(() => {
    const fetchGraphValues = async () => {
      const response = await getGraphValues(
        route.params?.matchId,
        route.params?.team1Id,
        route.params?.team2Id,
      );
      if (response.status) {
        if (response?.data?.scoreOfTeam1 === false) {
          setMatchNotStarted(true);
        } else {
          setMatchNotStarted(false);
          let team1Array = [];
          let team2Array = [];
          let tempTeam1 = response?.data?.commentry.filter(item => {
            if (item.teamId === route.params?.team1Id) {
              if (!isNaN(Number(item.status))) {
                let temp = Number(item.status);
                team1Array.push(temp);
                return temp;
              }
            }
          });

          let tempTeam2 = response?.data?.commentry.filter(item => {
            if (item.teamId === route.params?.team2Id) {
              if (!isNaN(Number(item.status))) {
                let temp = Number(item.status);
                team2Array.push(temp);
                return temp;
              }
            }
          });

          setTeam1Values(team1Array);
          setTeam2Values(team2Array);
        }
      }
    };
    fetchGraphValues();
  }, [isRefreshed]);

  console.warn(route.params);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      {matchNotStarted ? (
        <View style={styles.noMatchView}>
          <Text style={styles.noMatchText}>Match not yet started !!⏰</Text>
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => setIsRefreshed(!isRefreshed)}
            />
          }>
          <View style={styles.container}>
            <View>
              <MyLineChart
                team1Name={route.params.teams.team1Name}
                team2Name={route.params.teams.team2Name}
                team1Values={team1Values}
                team2Values={team2Values}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Graph;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },
  noMatchView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  noMatchText: {
    color: '#393939',
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 0,
    // lineHeight: 21,
    textAlign: 'center',
  },
});
