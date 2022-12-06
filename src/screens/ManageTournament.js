import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import RecentActivityCard from '../components/RecentActivityCard';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getUserCreatedTournament} from '../services/manageTournament';

const ManageTournament = ({navigation}) => {
  const {recentActivities} = useSelector(state => state.recentActivities);
  const [recentsData, setRecentsData] = useState([]);

  const focus = useIsFocused();

  useLayoutEffect(() => {
    const getRecentDetails = async tournamentIds => {
      const recents = await getUserCreatedTournament();
      // console.log('Recent data', recents.data);
      setRecentsData(recents.data);
      //   if (recents.status) {
      //     setRecentsData(recents.data.data);
      //   } else {
      //     // console.log(recents);
      //     Alert.alert('Recents Fetch Failed');
      //   }
    };
    getRecentDetails(recentActivities);
  }, [focus]);
  return (
    <View style={styles.container}>
      <View style={styles.backgroundBeyondSafeArea}>
        <SafeAreaView>
          <View style={styles.profileDetailsContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Image
                      source={require('../../assets/images/backicon.png')}
                    />
                  </TouchableOpacity>
                  <Text style={styles.stadiumName}>Manage Tournament</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}></View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
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
    backgroundColor: 'rgba(0, 102, 226, 1)',
    paddingRight: 20,
    paddingLeft: 20,
  },
  stadiumName: {
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
