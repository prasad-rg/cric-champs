import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  Share,
  ScrollView,
} from 'react-native';
import React, {useLayoutEffect, useEffect} from 'react';
import {StackActions, useIsFocused} from '@react-navigation/native';
import ViewTournamentTab from '../navigation/ViewTournamentTab';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {setIsView} from '../redux/manageTournamentSlice';

const ViewScreen = ({navigation, route}) => {
  const {tournamentDetails} = useSelector(state => state.tournamentDetails);
  const dispatch = useDispatch();

  const focus = useIsFocused();
  useLayoutEffect(() => {
    if (focus == true) {
      dispatch(setIsView(true));
    }
  }, [focus]);


  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${tournamentDetails.code}, Share the tournament code to invite your friends`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/images/stadium3.png')}
          resizeMode="cover">
          <View style={styles.backgroundBeyondSafeArea}>
            <SafeAreaView>
              <View style={styles.profileDetailsContainer}>
                <View style={styles.headerText}>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(setIsView(false));
                        navigation.goBack();
                      }}>
                      <Image
                        source={require('../../assets/images/backicon.png')}
                        style={styles.backButtonImage}
                      />
                    </TouchableOpacity>
                    <Text style={styles.viewText}>View</Text>
                  </View>
                  <View>
                    <TouchableOpacity onPress={() => onShare()}>
                      <Image
                        source={require('../../assets/images/share3.png')}
                        style={{
                          tintColor: '#FFFFFF',
                          height: 25,
                          width: 25,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View>
                  <Text style={styles.heading}>{tournamentDetails.name}</Text>
                  <View style={{alignSelf: 'center', marginTop: 7}}>
                    <TouchableOpacity style={styles.tourButton}>
                      <Text style={styles.tourText}>
                        Tournament Code : {tournamentDetails.code}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </SafeAreaView>
          </View>
        </ImageBackground>
      </View>
      <View
        style={{
          flex: 1,
          borderColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}>
        <ViewTournamentTab />
      </View>
    </View>
  );
};

export default ViewScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'rgba(217,226,233,0.5)',
    // backgroundColor: 'red',
  },
  profileDetailsContainer: {
    height: 200,
    marginTop: 15,
  },
  backButtonImage: {
    height: 20,
    width: 20,
  },

  backgroundBeyondSafeArea: {
    backgroundColor: 'rgba(0, 102, 226, 0.85)',
    paddingRight: 20,
    paddingLeft: 20,
  },
  viewText: {
    height: 24,
    width: 100,
    color: 'rgba(255,255,255,0.87)',
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 24,
    marginLeft: 40,
  },
  headerText: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth:1,
    justifyContent: 'space-between',
  },
  heading: {
    height: 28,
    color: '#FFFFFF',
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 28,
    textAlign: 'center',
    margin: 24,
    alignSelf: 'center',
  },
  tourText: {
    height: 14,
    // width: 143,
    color: '#FFFFFF',
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 14,
  },
  tourButton: {
    height: 30,
    width: 180,
    borderRadius: 100,
    backgroundColor: '#5DA0D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
