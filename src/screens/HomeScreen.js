import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import React, {useEffect, useState, useLayoutEffect} from 'react';
import GradientButton from '../components/GradientButton';
import OutlinedButton from '../components/OutlinedButton';
import RecentActivityCard from '../components/RecentActivityCard';
import {ScrollView} from 'react-native-gesture-handler';
import {getTournamentByCode} from '../services/viewTournament';
import {useDispatch, useSelector} from 'react-redux';
import {storeTournamentDetails} from '../redux/viewTournamentSlice';
import {storeRecentActivities} from '../redux/recentActivitiesSlice';
import {getRecentActivities} from '../services/recentActivities';
import {useIsFocused} from '@react-navigation/native';

import {
  setEditEntity,
  setIsEdit,
  setIsView,
} from '../redux/manageTournamentSlice';
import Toast from 'react-native-simple-toast';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const HomeScreen = ({navigation}) => {
  const [code, setCode] = useState('');
  const [inputTextError, setInputTextError] = useState('');
  const dispatch = useDispatch();
  const {recentActivities} = useSelector(state => state.recentActivities);
  const [recentsData, setRecentsData] = useState([]);
  const {isLoggedIn} = useSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const {userData} = useSelector(state => state.userData);
  console.info('userDetails', userData);
  const handelTextChange = text => {
    setCode(text);
  };
  const focus = useIsFocused();

  useLayoutEffect(() => {
    dispatch(setEditEntity(false));
    dispatch(setIsEdit(false));
    if (isLoggedIn) {
      const getRecentDetails = async tournamentIds => {
        const recents = await getRecentActivities({tournamentIds});
        // console.log(recents);
        if (recents.status) {
          setRecentsData(recents.data.data);
        } else {
          console.log(recents);
          // Alert.alert('Recents Fetch Failed');
        }
      };
      getRecentDetails(recentActivities);
    }
  }, [focus, recentActivities]);
  const handlePress = async () => {
    setIsLoading(true);
    setInputTextError('');
    setIsLoading(false);

    if (code !== '') {
      setIsLoading(true);
      const res = await getTournamentByCode(code);
      setIsLoading(false);
      if (res?.status === false) {
        setInputTextError(res?.message?.toUpperCase());
      } else {
        setInputTextError('');
        setCode('');
        dispatch(storeTournamentDetails(res));
        dispatch(storeRecentActivities(res?._id));
        if (res?.userId === userData?._id) {
          navigation.navigate('ManageScreen');
        } else {
          navigation.navigate('ViewScreen');
        }
      }
    } else {
      setInputTextError('Please Enter a Tournament Code to Proceed');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="rgba(0, 102, 226, 1)"
      />
      <View style={styles.backgroundBeyondSafeArea}>
        <SafeAreaView>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('UserControls')}>
              <View style={styles.burgerView}>
                <Image
                  source={require('../../assets/images/burgermenu.png')}
                  style={styles.burgermenu}
                />
              </View>
            </TouchableOpacity>
            <Text style={styles.cricket}>Cricket</Text>
          </View>
        </SafeAreaView>
      </View>
      <ScrollView>
        <KeyboardAwareScrollView>
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
                {isLoading ? (
                  <View style={{marginHorizontal: 10}}>
                    <ActivityIndicator size="large" color="#FFBA8C" />
                  </View>
                ) : (
                  <OutlinedButton text="ENTER" onPress={handlePress} />
                )}
              </View>
              {inputTextError && (
                <Text style={styles.errorText}>{inputTextError}</Text>
              )}
              <Text style={styles.codeAcquired}>
                Code can be acquired from the admin.
              </Text>
              <Text style={styles.or}>Or</Text>
              {isLoggedIn ? (
                <GradientButton
                  start={{x: 0, y: 0}}
                  end={{x: 2, y: 0}}
                  colors={['#FFBA8C', '#FE5C6A']}
                  text="CREATE TOURNAMENT"
                  onPress={() => navigation.navigate('AppStack')}
                />
              ) : (
                <GradientButton
                  start={{x: 0, y: 0}}
                  end={{x: 2, y: 0}}
                  colors={['#FFBA8C', '#FE5C6A']}
                  text="CREATE TOURNAMENT"
                  onPress={() => navigation.navigate('AuthStack')}
                />
              )}
              {recentsData.length > 0 && isLoggedIn && (
                <View style={styles.recentActivityView}>
                  <Text style={styles.recentActivityText}>
                    Recent Activities
                  </Text>
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
              )}
            </View>
          </View>
        </KeyboardAwareScrollView>
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
    paddingTop: 10,
    paddingBottom: 10,
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
  burgerView: {
    width: 50,
    height: 30,
    marginLeft: -5,
    alignItems: 'center',
    justifyContent: 'center',
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
    // width: 64,
    color: 'rgba(255,255,255,0.87)',
    fontFamily: 'Roboto-Medium',
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
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
    marginLeft: 15,
  },
  enterTournament: {
    height: 19,
    color: 'rgba(0,0,0,0.87)',
    fontFamily: 'Roboto-Regular',
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
    fontFamily: 'Roboto-Regular',
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
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    letterSpacing: 0,
    lineheight: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  recentActivityView: {
    padding: 20,
    backgroundColor: '#EEF1F4',
    marginTop: 20,
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
  errorText: {
    fontSize: 10,
    color: 'red',
    textAlign: 'center',
    marginTop: 5,
  },
});
