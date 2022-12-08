import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {getTeamInfoByTeamIdAndTournamentId} from '../../services/viewTournament';

const Stats = ({navigation, route}) => {
  const [currentInfo, setCurrentInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {tournamentDetails} = useSelector(state => state.tournamentDetails);
  const loadInfo = async () => {
    setIsLoading(true);
    const response = await getTeamInfoByTeamIdAndTournamentId(
      route.params.teamId,
      tournamentDetails._id,
    );
    setIsLoading(false);
    if (response.status) {
      setCurrentInfo(response.team);
    }
  };
  const details = [
    {
      id: currentInfo?.captainId,
      title: 'Captain',
      value: currentInfo?.captainName ?  `${currentInfo?.captainName} (c)` : 'NA',
    },
    {
      id: currentInfo?.viceCaptainId,
      title: 'Vice Captain',
      value: currentInfo?.viceCaptainName ? `${currentInfo?.viceCaptainName} (vc)` : 'NA',
    },
    {
      id: 2,
      title: 'City',
      value: currentInfo?.city,
    },
    {
      id: 3,
      title: 'Matches',
      value: currentInfo?.matchesPlayed,
    },
    {
      id: 4,
      title: 'Wins',
      value: currentInfo?.wins,
    },
    {
      id: 5,
      title: 'Losses',
      value: currentInfo?.losses,
    },
    {
      id: 6,
      title: 'Draw / Cancelled',
      value: currentInfo?.draws,
    },
    {
      id: 7,
      title: 'Points',
      value: currentInfo?.points,
    },
  ];

  useEffect(() => {
    loadInfo();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={loadInfo} />
      }>
      <View style={styles.card}>
        <View>
          {details.map(item => (
            <View key={item.id} style={styles.listview}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.value}>{item.value}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Stats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  card: {
    height: 'auto',
    // width:"80%",
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 15,
  },
  listview: {
    padding: 20,
    flexDirection: 'row',
  },
  title: {
    height: 24,

    color: 'rgba(77,77,77,0.87)',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 24,
  },
  value: {
    height: 24,
    width: '50%',
    color: 'rgba(77,77,77,0.87)',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 24,
    marginLeft: 'auto',
  },
});
