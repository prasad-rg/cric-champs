import React, {useLayoutEffect, useState} from 'react';
import {Image, StyleSheet, Platform, View, Button} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {useSelector} from 'react-redux';
import {setStartDate} from '../../redux/MatchSlice';
import {setEndDate} from '../../redux/MatchSlice';
import {useDispatch} from 'react-redux';
import {setStart} from '../../redux/MatchSlice';
import {setEnd} from '../../redux/MatchSlice';
import GradientButton from '../../components/GradientButton';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
import SimpleToast from 'react-native-simple-toast';
import {addDates} from '../../services/manageTournament2';
import {getISOTime} from '../../utils/getISOTime';

const StartDate = ({navigation, route}) => {
  const [convertedDateFromRoute, setConvertedStartDate] = useState(
    moment(route?.params?.startDate).format('YYYY-MM-DD'),
  );
  const [convertedEndDateFromRoute, setConvertedEndDate] = useState(
    moment(route?.params?.endDate).format('YYYY-MM-DD'),
  );
  const tournamentId = useSelector(
    state => state.tournamentdata.tournamentdata.tournamentid,
  );
  let date1 = new Date(convertedDateFromRoute);
  let date2 = new Date(convertedEndDateFromRoute);

  let total = date2.getUTCDate() - date1.getUTCDate() + 1;

  console.log(convertedDateFromRoute,date1)
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();

  const onDateChange = (date, type) => {
    // console.log(date)
    setDisabled(true);
    if (type === 'END_DATE') {
      dispatch(setEndDate(date));
    } else {
      setConvertedStartDate(date);
      dispatch(setEndDate(date));
      dispatch(setStartDate(date));
    }
  };

  React.useEffect(() => {
    if (route.params?.isManage) {
      dispatch(setStart(true));
      dispatch(setEnd(false));
      dispatch(setStartDate(date1))
    }

    const unsubscribe = navigation.addListener('tabPress', e => {
      dispatch(setStart(true));
      dispatch(setEnd(false));
      setConvertedStartDate(`${convertedDateFromRoute}:00`);
    });
    return unsubscribe;
  }, [navigation]);

  const handlePress = async () => {
    navigation.navigate('END DATE');
  };

  // const focus = useIsFocused();

  // useLayoutEffect(() => {
  //   if (focus == true) {
  //     route.params?.isManage
  //       ? (dispatch(setConvertedStartDate(`${convertedDateFromRoute}:00`)))
  //       : undefined;
  //   }
  // }, [focus]);

  return (
    <View style={styles.maincontainer}>
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
          weekdays={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
          selectedDayColor={'#FCA900'}
          selectedDayTextColor={'#FFFFFF'}
          todayTextStyle={styles.selectedTextStyle}
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
          initialDate={
            convertedDateFromRoute ? convertedDateFromRoute : undefined
          }
          customDatesStyles={[
            {
              date: convertedDateFromRoute ? convertedDateFromRoute : undefined,
              style: {
                backgroundColor: convertedDateFromRoute ? '#FCA900' : 'FFFFFF',
              },
              textStyle: {color: convertedDateFromRoute ? '#FFFFFF' : 'black'},
              containerStyle: [],
              allowDisabled: true,
            },
            {
              textStyle: {
                color: '#222222',
                fontFamily: 'Roboto-Regular',
                fontSize: 12,
                letterSpacing: 0,
                lineHeight: 14,
                textAlign: 'center',
              },
              fontFamily: 'Roboto-Medium',
            },
          ]}
        />
      </View>
      {route.params?.isManage ? (
        <GradientButton
          start={{x: 0, y: 0}}
          end={{x: 2, y: 0}}
          colors={['#FFBA8C', '#FE5C6A']}
          text="OK"
          style={{height: 50, width: '100%', marginTop: 0}}
          textstyle={{
            height: 16,
            fontWeight: '500',
            fontSize: 14,
            letterSpacing: 0.5,
            lineHeight: 19,
          }}
          onPress={async () => {
            const dateData = {
              startDateInISO: date1,
              endDateInISO: date2,
              tournamentId: tournamentId,
              tournamentDays: total,
            };

            const response = await addDates(dateData);
            console.log('I am response for date', response.data);
            if (response.data.status) {
              navigation.goBack();
            } else {
              SimpleToast.show('Something Went Wrong, Please try again  ');
            }
          }}
        />
      ) : (
        <GradientButton
          start={{x: 0, y: 0}}
          end={{x: 2, y: 0}}
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
  maincontainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  selectedTextStyle: {
    color: 'green',
  },
});
