import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {LineChart} from 'react-native-chart-kit';
import {getGraphValues} from '../../services/viewTournament';

// import {get} from '../../services/viewTournament';

const MyLineChart = ({team1Name, team2Name, team1Values, team2Values}) => {
  console.warn('========================', team2Values);
  console.warn('======ftttthjklljh', team1Values);
  return (
    <>
      <Text style={styles.header}>Run Rate</Text>
      <LineChart
        data={{
          labels: ['0', '0.3', '1.0', '1.3', '2.0', '2.3', '3.0'],
          datasets: [
            {
              data: [...team1Values],
              color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
              strokeWidth: 1,
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
        height={220}
        withDots={false}
        withShadow={false}
        // yAxisLabel="car"
        // yAxisSuffix="bike"

        chartConfig={{
          backgroundColor: 'red',
          backgroundGradientFrom: '#ADD8E6',
          backgroundGradientTo: '#efefef',
          backgroundGradientToOpacity: 0.5,
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 17,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 10,
        }}
      />
    </>
  );
};

const Graph = ({navigation, route}) => {
  const [team1Values, setTeam1Values] = useState([]);
  const [team2Values, setTeam2Values] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGraphValues = async () => {
      const response = await getGraphValues(
        route.params?.matchId,
        route.params?.team1Id,
        route.params?.team2Id,
      );
      if (response.status) {
        // let test = response?.data?.commentry.filter(
        //   item => item.teamId === route.params?.team1Id,
        // );
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

        // console.info('Team 1', team1Values);
        // console.info('Team 2', team2Values);
      }
    };
    fetchGraphValues();
  }, []);

  console.warn(route.params);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
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
    </SafeAreaView>
  );
};

export default Graph;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },
});
