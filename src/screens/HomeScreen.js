import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import GradientButton from '../components/GradientButton';
import OutlinedButton from '../components/OutlinedButton';
import RecentActivityCard from '../components/RecentActivityCard';
import {ScrollView} from 'react-native-gesture-handler';
import {getTournamentByCode} from '../services/viewTournament';
import {useDispatch, useSelector} from 'react-redux';
import {storeTournamentDetails} from '../redux/viewTournamentSlice';
import {storeRecentActivities} from '../redux/recentActivitiesSlice';
import axios from 'axios';
import {getRecentActivities} from '../services/recentActivities';

const HomeScreen = ({navigation}) => {
  const [code, setCode] = useState('');
  const [inputTextError, setInputTextError] = useState('');
  const dispatch = useDispatch();
  const {recentActivities} = useSelector(state => state.recentActivities);
  const [recentsData, setRecentsData] = useState([]);

  const handelTextChange = text => {
    setCode(text);
  };

  useEffect(() => {
    const getRecentDetails = async tournamentIds => {
      const recents = await getRecentActivities({tournamentIds});
      // console.log(recents);
      if (recents.status) {
        setRecentsData(recents.data.data);
      } else {
        console.log(recents);
        Alert.alert('Recents Fetch Failed');
      }
    };
    getRecentDetails(recentActivities);
  }, [recentActivities]);

  return (
    // <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.backgroundBeyondSafeArea}>
          <SafeAreaView>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('UserControls')}>
                <Image
                  source={require('../../assets/images/burgermenu.png')}
                  style={styles.burgermenu}
                />
              </TouchableOpacity>
              <Text style={styles.cricket}>Cricket</Text>
            </View>
          </SafeAreaView>
        </View>
        <View>
          <View style={styles.subheader}>
            <Text style={styles.viewManage}>View or Manage Tournament</Text>
          </View>
          <View>
            <Text style={styles.enterTournament}>
              Enter tournament code to view / manage
            </Text>
            <View style={styles.middleView}>
              <TextInput
                style={styles.textInput}
                onChangeText={text => handelTextChange(text)}
                value={code}
                autoCapitalize="none"
              />
              <OutlinedButton
                text="ENTER"
                onPress={async () => {
                  setInputTextError('');
                  if (code !== '') {
                    const res = await getTournamentByCode(code);
                    if (res?.status === false) {
                      setInputTextError(res.message.toUpperCase());
                    } else {
                      setInputTextError('');
                      setCode('');
                      dispatch(storeTournamentDetails(res));
                      dispatch(storeRecentActivities(res._id));
                      navigation.navigate('ViewScreen');
                    }
                  } else {
                    setInputTextError(
                      'Pleas Enter a Tournament Code to Proceed',
                    );
                  }
                }}
              />
            </View>
            {inputTextError && (
              <Text style={styles.errorText}>{inputTextError}</Text>
            )}
            <Text style={styles.codeAcquired}>
              Code can be acquired from the admin.
            </Text>
            <Text style={styles.or}>Or</Text>
            <GradientButton
              start={{x: 0, y: 0}}
              end={{x: 2, y: 0}}
              colors={['#FFBA8C', '#FE5C6A']}
              text="CREATE TOURNAMENT"
              onPress={() => navigation.navigate('AppStack')}
              //  style={{width:'100%'}}
            />
            <View style={styles.recentActivityView}>
              <Text style={styles.recentActivityText}>Recent Activities</Text>
              {recentsData.map(tournament => (
                <RecentActivityCard
                  key={tournament._id}
                  title={tournament.name}
                  matchCode={tournament.code}
                  isAdmin={tournament.isAdmin}
                  navigation={navigation}
                  id={tournament._id}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundBeyondSafeArea: {
    backgroundColor: 'rgba(0, 102, 226, 1)',
    paddingRight: 20,
    paddingBottom: 15,
  },
  textInput: {
    boxSizing: 'border-box',
    height: 41,
    width: 163,
    borderWidth: 1,
    borderColor: '#9DB7D6',
    opacity: 0.54,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    boxShadow: '0 8 30 0 rgba(223,223,223,0.37)',
    paddingHorizontal: 10,
  },

  header: {
    height: 56,
    width: '100%',
    backgroundColor: '#0E85FF',
    alignItems: 'center',
    flexDirection: 'row',
  },
  burgermenu: {
    height: 12,
    width: 18,
    marginLeft: 17,
  },
  cricket: {
    height: 24,
    width: 64,
    color: 'rgba(255,255,255,0.87)',
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 24,
    marginLeft: 31,
  },
  subheader: {
    height: 48,
    width: '100%',
    backgroundColor: '#EEF1F4',
    justifyContent: 'center',
  },
  viewManage: {
    height: 19,
    color: '#8E9BA8',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
    marginLeft: 15,
  },
  enterTournament: {
    height: 19,
    color: 'rgba(0,0,0,0.87)',
    fontFamily: 'Roboto',
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  codeAcquired: {
    marginTop: 10,
    height: 16,
    opacity: 0.5,
    color: '#9B9B9B',
    fontFamily: 'Roboto',
    fontSize: 12,
    letteSpacing: 0,
    lineHeight: 14,
    textAlign: 'center',
  },
  middleView: {
    marginTop: 20,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  or: {
    height: 19,
    color: '#000000',
    fontFamily: 'Roboto',
    fontSize: 14,
    letterSpacing: 0,
    lineheight: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  recentActivityView: {
    // flex:1,
    padding: 20,
    backgroundColor: '#EEF1F4',
    marginTop: 20,
    height: '100%',
  },
  recentActivityText: {
    height: 19,
    width: 248,
    color: '#8E9BA8',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
    textAlign: 'center',
    marginTop: 5,
  },
});
