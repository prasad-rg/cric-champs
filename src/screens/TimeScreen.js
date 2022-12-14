import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import TimeTab from '../navigation/TimeTab';
import {useSelector} from 'react-redux';
import moment from 'moment';
const TimeScreen = ({navigation,route}) => {
  let current_time = moment().format('HH:mm');

  const startTime = useSelector(state => state.matchdata.startTime);
  const endTime = useSelector(state => state.matchdata.endTime);
  const start = useSelector(state => state.matchdata.start);
  const end = useSelector(state => state.matchdata.end);

  // console.log("insode timeScreen",startTime,endTime,start,end)

  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.backgroundBeyondSafeArea}>
        <SafeAreaView>
          <View style={styles.profileDetailsContainer}>
            <View style={styles.headerText}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={handleBack}>
                  <Image
                    source={require('../../assets/images/backicon.png')}
                    style={styles.backButtonImage}
                  />
                </TouchableOpacity>
                <Text style={styles.viewText}>Time</Text>
              </View>
            </View>
            <View style={styles.datecontainer}>
              <Text style={styles.timeinhour}>
                {start ? startTime : end ? endTime : current_time}
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </View>

      <TimeTab route={route} navigation={navigation}/>
    </View>
  );
};

export default TimeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileDetailsContainer: {
    height: 150,
    marginTop: 15,
  },
  backButtonImage: {
    height: 20,
    width: 20,
  },

  backgroundBeyondSafeArea: {
    backgroundColor: 'rgba(0, 102, 226, 1)',
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
    justifyContent: 'space-between',
  },
  heading: {
    height: 28,
    width: 144,
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
    marginTop: -10,
  },
  year: {
    height: 24,
    width: 37,
    color: 'rgba(255,255,255,0.7)',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 24,
    textAlign: 'center',
    marginLeft: 62,
    marginTop: 11,
  },
  date: {
    height: 40,
    width: 166,
    color: '#FFFFFF',
    fontFamily: 'Roboto-Medium',
    fontSize: 34,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 40,
    marginLeft: 62,
    marginTop: 1,
  },
  datecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 62,
    marginTop: 15,
  },
  timeinhour: {
    height: 71,
    color: '#FFFFFF',
    fontFamily: 'Roboto-Regular',
    fontSize: 60,
    letterSpacing: 0,
    lineHeight: 71,
    textAlign: 'right',
  },
  timeinmin: {
    height: 71,
    color: 'rgba(255,255,255,0.7)',
    fontFamily: 'Roboto-Regular',
    fontSize: 60,
    letterSpacing: 0,
    lineHeight: 71,
    textAlign: 'right',
  },
  timeformatinam: {
    height: 19,
    width: 25,
    color: '#FFFFFF',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 19,
    marginLeft: 13,
  },
  timeformatinpm: {
    height: 19,
    width: 25,
    color: 'rgba(255,255,255,0.7)',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 19,
    marginLeft: 13,
  },
});
