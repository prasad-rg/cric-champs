import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import DateTab from '../navigation/DateTab';
import {useSelector} from 'react-redux';
import moment from 'moment';

const DateScreen = ({navigation}) => {
  const handleBack = () => {
    navigation.goBack();
  };
  const start = useSelector(state => state.matchdata.start);
  const end = useSelector(state => state.matchdata.end);

  const startDateSelector = useSelector(state => state.matchdata.startDate);
  const endDateSelector = useSelector(state => state.matchdata.endDate);
  var startmomentDate = moment(startDateSelector);
  const startYear = startmomentDate.format('YYYY');
  const startDay = startmomentDate.format('ddd,');
  const startMonth = startmomentDate.format('MMM');
  const startDate = startmomentDate.format('DD');
  var endmomentDate = moment(endDateSelector);
  const endYear = endmomentDate?.format('YYYY');
  const endDay = endmomentDate?.format('ddd,');
  const endMonth = endmomentDate?.format('MMM');
  const endDate = endmomentDate?.format('DD');

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
                <Text style={styles.viewText}>Dates</Text>
              </View>
            </View>
            <Text style={styles.year}>{start ? startYear : end && endYear != 'Invalid date' ? endYear : " "}</Text>
            <Text style={styles.date}>
              {start ? startDay : end && endDay != 'Invalid date' ? endDay : ' '}{' '}
              {start ? startMonth : end && endMonth != 'Invalid date' ? endMonth : ' '}{' '}
              {start ? startDate : end && endDate != 'Invalid date' ? endDate : ' '}
            </Text>
          </View>
        </SafeAreaView>
      </View>
     
        <DateTab />
    
    </View>
  );
};

export default DateScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,

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
    // borderWidth:1,
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
    fontFamily: 'Roboto',
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
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    fontSize: 34,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 40,
    marginLeft: 62,
    marginTop: 1,
  },
});