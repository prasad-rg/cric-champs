import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {useSelector} from 'react-redux';
import {setStartDate} from '../../redux/MatchSlice';
import {setEndDate} from '../../redux/MatchSlice';
import {useDispatch} from 'react-redux';
import { setEnd } from '../../redux/MatchSlice';
import { setStart } from '../../redux/MatchSlice';



const StartDate = ({navigation}) => {
  const dispatch = useDispatch();

  const startDate = useSelector(state => state.matchdata.startDate);
  const endDate = useSelector(state => state.matchdata.endDate);
  console.log(startDate, endDate);

  let date1=new Date(startDate)
  let date2=new Date(endDate)

  let total=(date2.getUTCDate()- date1.getUTCDate())+1;
  console.log("total days",total)



  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      dispatch(setEndDate(date));
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
    <View style={styles.container}>
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
});
