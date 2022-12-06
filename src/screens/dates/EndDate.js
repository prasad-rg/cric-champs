import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, ActivityIndicator, View, Text} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {useSelector} from 'react-redux';
import {setStartDate} from '../../redux/MatchSlice';
import {setEndDate} from '../../redux/MatchSlice';
import {useDispatch} from 'react-redux';
import {setEnd} from '../../redux/MatchSlice';
import {setStart} from '../../redux/MatchSlice';
import GradientButton from '../../components/GradientButton';
import {addDates} from '../../services/manageTournament2';
import Toast from 'react-native-simple-toast';
import moment from 'moment';
const StartDate = ({navigation, route}) => {
  const dateFromRoute = route?.params?.params?.endDate;

  const dispatch = useDispatch();

  const startDate = useSelector(state => state.matchdata.startDate);
  const endDate = useSelector(state => state.matchdata.endDate);
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const convertedStartDateFromRoute = moment(
    route?.params?.params?.startDate,
  ).format('YYYY-MM-DD');

  const [convertedEndDateFromRoute, setConvertedEndDate] = useState(
    moment(route?.params?.params?.endDate).format('YYYY-MM-DD'),
  );
  // console.log(startDate, endDate);

  let date1 = new Date(startDate);
  let date2 = new Date(endDate);

  let total = date2.getUTCDate() - date1.getUTCDate() + 1;
  // console.log("total days",total)

  const tournamentId = useSelector(
    state => state.tournamentdata.tournamentdata.tournamentid,
  );

  const dateData = {
    startDateInISO: startDate,
    endDateInISO: endDate,
    tournamentId: tournamentId,
    tournamentDays: total,
  };

  const handlePress = async () => {
    setIsLoading(true);
    const response = await addDates(dateData);
    setIsLoading(false);
    console.log('I am response for date', response.data);
    if (response.data.status) {
      navigation.navigate('TimeScreen');
    } else {
      Toast.show('Something Went Wrong, Please try again 😭');
    }
  };

  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      dispatch(setEndDate(date));
      setConvertedEndDate(date);
      setDisabled(true);
    } else {
      dispatch(setEndDate(endDate));
      dispatch(setStartDate(startDate));
    }
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      dispatch(setEnd(true));
      dispatch(setStart(false));
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        {route.params?.params?.isManage ? (
          <CalendarPicker
            previousComponent={
              <Image
                source={require('../../../assets/images/back_calender.png')}
                style={{tintColor: '#222222', marginLeft: 15}}
              />
            }
            nextComponent={
              <Image
                source={require('../../../assets/images/next_calender.png')}
                style={{tintColor: '#222222', marginRight: 15}}
              />
            }
            onDateChange={onDateChange}
            selectedStartDate={convertedStartDateFromRoute}
            selectedEndDate={convertedEndDateFromRoute}
            weekdays={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
            allowRangeSelection={true}
            todayTextColor="black"
            todayTextStyle={(textStyle = {color: 'red'})}
            selectedDayColor={'#FCA900'}
            selectedDayTextColor={'#FFFFFF'}
            dayLabelsWrapper={{
              borderTopWidth: 0,
              borderBottomWidth: 0,
              color: 'rgba(0,0,0,0.38)',
              fontFamily: 'Roboto-Medium',
              fontSize: 12,
              fontWeight: '500',
              letterSpacing: 0,
              lineHeight: 14,
              textAlign: 'center',
            }}
            customDayHeaderStyles={() => {
              return {
                textStyle: {color: '#00000061'},
                fontFamily: 'Roboto-Medium',
                fontWeight: '500',
              };
            }}
            monthTitleStyle={{
              height: 24,
              fontSize: 14,
              color: 'rgba(0,0,0,0.87)',
              fontFamily: 'Roboto-Medium',
              fontWeight: '500',
              letterSpacing: 0,
              lineHeight: 24,
              textAlign: 'center',
            }}
            yearTitleStyle={{
              height: 24,
              fontSize: 14,
              color: 'rgba(0,0,0,0.87)',
              fontFamily: 'Roboto-Medium',
              fontWeight: '500',
              letterSpacing: 0,
              lineHeight: 24,
              textAlign: 'center',
            }}
            monthYearHeaderWrapperStyle={{
              height: 24,
              color: 'rgba(0,0,0,0.87)',
              fontFamily: 'Roboto-Medium',
              fontWeight: '500',
              letterSpacing: 0,
              lineHeight: 24,
              textAlign: 'center',
            }}
            selectedDayTextStyle={{
              height: 14,
              width: 15,
              color: '#FFFFFF',
              fontFamily: 'Roboto-Regular',
              fontSize: 12,
              fontWeight: '500',
              letterSpacing: 0,
              lineHeight: 14,
              textAlign: 'center',
            }}
            customDatesStyles={() => {
              return {
                textStyle: {
                  color: '#222222',
                  fontFamily: 'Roboto-Regular',
                  fontSize: 12,
                  letterSpacing: 0,
                  lineHeight: 14,
                  textAlign: 'center',
                },
                fontFamily: 'Roboto-Medium',
              };
            }}
          />
        ) : (
          <CalendarPicker
            previousComponent={
              <Image
                source={require('../../../assets/images/back_calender.png')}
                style={{tintColor: '#222222', marginLeft: 15}}
              />
            }
            nextComponent={
              <Image
                source={require('../../../assets/images/next_calender.png')}
                style={{tintColor: '#222222', marginRight: 15}}
              />
            }
            onDateChange={onDateChange}
            selectedStartDate={startDate}
            weekdays={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
            allowRangeSelection={true}
            todayTextColor="black"
            todayTextStyle={(textStyle = {color: 'red'})}
            selectedDayColor={'#FCA900'}
            selectedDayTextColor={'#FFFFFF'}
            dayLabelsWrapper={{
              borderTopWidth: 0,
              borderBottomWidth: 0,
              color: 'rgba(0,0,0,0.38)',
              fontFamily: 'Roboto-Medium',
              fontSize: 12,
              fontWeight: '500',
              letterSpacing: 0,
              lineHeight: 14,
              textAlign: 'center',
            }}
            customDayHeaderStyles={() => {
              return {
                textStyle: {color: '#00000061'},
                fontFamily: 'Roboto-Medium',
                fontWeight: '500',
              };
            }}
            monthTitleStyle={{
              height: 24,
              fontSize: 14,
              color: 'rgba(0,0,0,0.87)',
              fontFamily: 'Roboto-Medium',
              fontWeight: '500',
              letterSpacing: 0,
              lineHeight: 24,
              textAlign: 'center',
            }}
            yearTitleStyle={{
              height: 24,
              fontSize: 14,
              color: 'rgba(0,0,0,0.87)',
              fontFamily: 'Roboto-Medium',
              fontWeight: '500',
              letterSpacing: 0,
              lineHeight: 24,
              textAlign: 'center',
            }}
            monthYearHeaderWrapperStyle={{
              height: 24,
              color: 'rgba(0,0,0,0.87)',
              fontFamily: 'Roboto-Medium',
              fontWeight: '500',
              letterSpacing: 0,
              lineHeight: 24,
              textAlign: 'center',
            }}
            selectedDayTextStyle={{
              height: 14,
              width: 15,
              color: '#FFFFFF',
              fontFamily: 'Roboto-Regular',
              fontSize: 12,
              fontWeight: '500',
              letterSpacing: 0,
              lineHeight: 14,
              textAlign: 'center',
            }}
            customDatesStyles={() => {
              return {
                textStyle: {
                  color: '#222222',
                  fontFamily: 'Roboto-Regular',
                  fontSize: 12,
                  letterSpacing: 0,
                  lineHeight: 14,
                  textAlign: 'center',
                },
                fontFamily: 'Roboto-Medium',
              };
            }}
          />
        )}
      </View>
      {isLoading ? (
        <View style={{marginBottom: 20}}>
          <ActivityIndicator size="large" color="#FFBA8C" />
        </View>
      ) : route.params?.params?.isManage ? (
        <GradientButton
          start={{x: 0, y: 0}}
          end={{x: 2, y: 0}}
          // colors={['#FFBA8C', '#FE5C6A']}
          colors={['#FFBA8C', '#FE5C6A']}
          text="OK"
          onPress={() => navigation.goBack()}
          style={{height: 50, width: '100%', marginTop: 0}}
          textstyle={{
            height: 16,
            fontWeight: '500',
            fontSize: 14,
            letterSpacing: 0.5,
            lineHeight: 19,
          }}
        />
      ) : (
        <GradientButton
          start={{x: 0, y: 0}}
          end={{x: 2, y: 0}}
          // colors={['#FFBA8C', '#FE5C6A']}
          colors={disabled ? ['#FFBA8C', '#FE5C6A'] : ['#999999', '#999999']}
          text="PROCEED"
          onPress={handlePress}
          style={{height: 50, width: '100%', marginTop: 0}}
          textstyle={{
            height: 16,
            fontWeight: '500',
            fontSize: 14,
            letterSpacing: 0.5,
            lineHeight: 19,
          }}
        />
      )}
    </View>
  );
};
export default StartDate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  mainContainer: {
    flex: 1,
  },
});
