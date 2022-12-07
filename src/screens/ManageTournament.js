import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import RecentActivityCard from '../components/RecentActivityCard';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getUserCreatedTournament} from '../services/manageTournament';
import AppBar from '../components/AppBar';

const ManageTournament = ({navigation}) => {
  const {recentActivities} = useSelector(state => state.recentActivities);
  const [recentsData, setRecentsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const focus = useIsFocused();

  useLayoutEffect(() => {
    const getRecentDetails = async tournamentIds => {
      setIsLoading(true);
      const recents = await getUserCreatedTournament();
      setRecentsData(recents.data);
      setIsLoading(false);
    };
    getRecentDetails(recentActivities);
  }, [focus]);
  return (
    <View style={styles.container}>
      <View style={styles.backgroundBeyondSafeArea}>
        <AppBar navigation={navigation} title="Manage Tournament"/>
      </View>
      {isLoading ? (
        <ActivityIndicator size={'large'} color="rgba(0, 102, 226, 1)" />
      ) : (
        <ScrollView>
          {recentsData.length > 0 && (
            <View style={styles.recentActivityView}>
              <Text style={styles.recentActivityText}>Manage Tournament</Text>
              {recentsData.map(tournament => (
                <RecentActivityCard
                  key={tournament._id}
                  title={tournament.name}
                  matchCode={tournament.code}
                  navigation={navigation}
                  id={tournament._id}
                  isManage={true}
                />
              ))}
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default ManageTournament;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileDetailsContainer: {
    height: 40,
    marginTop: 10,
  },
  backgroundBeyondSafeArea: {
    // backgroundColor: 'rgba(0, 102, 226, 1)',
    backgroundColor: '#0E85FF',
    paddingRight: 20,
    paddingLeft: 20,
  },
 
  recentActivityView: {
    padding: 20,
    backgroundColor: '#EEF1F4',
    // marginTop: 20,
    height: '100%',
  },
  recentActivityText: {
    height: 19,
    width: 248,
    color: '#8E9BA8',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
    marginBottom: 16,
  },
});
