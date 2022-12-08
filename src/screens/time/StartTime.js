import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {TimePickerModal, TimePicker} from 'react-native-paper-dates';
import {setStartTime} from '../../redux/MatchSlice';
import {setStart} from '../../redux/MatchSlice';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {setEnd} from '../../redux/MatchSlice';
import GradientButton from '../../components/GradientButton';
import moment from 'moment';
import {checkForAmorPm} from '../../utils/checkForAmOrPm';
import {useIsFocused} from '@react-navigation/native';
import {useLayoutEffect} from 'react';
import {addTime} from '../../services/manageTournament2';
import SimpleToast from 'react-native-simple-toast';
import {getISOTime} from '../../utils/getISOTime';

const StartTime = ({navigation, route}) => {
  const [disabled, setDisabled] = useState(true);
  const startTime = useSelector(state => state.matchdata.startTime);
  const tournamentId = useSelector(
    state => state.tournamentdata.tournamentdata.tournamentid,
  );
  const [startTimeFromRoute, setStartTimeFromRoute] = useState(() =>
    checkForAmorPm(route.params?.startTime),
  );
  const [endTimeFromRoute, setEndTimeFromRoute] = useState(() =>
    checkForAmorPm(route.params?.endTime),
  );

  // let [hours, minutes] = startTimeFromRoute?.split(':');

  // const convertedStartTime = checkForAmorPm(startTimeFromRoute);
  // const convertedEndTime = checkForAmorPm(endTimeFromRoute);



  let current_time = moment();

  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(false);

  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onConfirm = React.useCallback(
    ({hours, minutes}) => {
      setVisible(false);
      dispatch(setStartTime(`${hours}:${minutes}`));
      setDisabled(false);
      dispatch(setStart(true));
      dispatch(setEnd(false));
    },
    [setVisible],
  );

  const focus = useIsFocused();

  useLayoutEffect(() => {
    if (focus == true) {
      route.params?.isManage
        ? (dispatch(setStartTime(`${startTimeFromRoute}:00`)),
          setStartTimeFromRoute(startTimeFromRoute),
          dispatch(setEnd(false)),
          dispatch(setStart(true)))
        : null;
    }
  }, [focus]);

  const onDismissInManage = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onConfirmInManage = React.useCallback(
    ({hours, minutes}) => {
      setVisible(false);
      dispatch(setStartTime(`${hours}:${minutes}`));
      setStartTimeFromRoute(hours);
      setDisabled(false);
      dispatch(setStart(true));
      dispatch(setEnd(false));
    },
    [setVisible],
  );

  const handlePress = () => {
    navigation.navigate('END OF PLAY');
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      dispatch(setStart(true));
      dispatch(setEnd(false));
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.text}>When do you want start for the day?</Text>
        <View style={{flex: 1, marginTop: 30}}>
          {route.params?.isManage ? (
            <TimePickerModal
              visible={true}
              onDismiss={onDismissInManage}
              onConfirm={onConfirmInManage}
              hours={current_time.format('HH')}
              minutes={current_time.format('mm')}
              label="Select time"
              uppercase={false}
              cancelLabel="Cancel"
              confirmLabel="OK"
              animationType="fade"
              locale="en"
            />
          ) : (
            <TimePickerModal
              visible={true}
              onDismiss={onDismiss}
              onConfirm={onConfirm}
              hours={current_time.format('HH')}
              minutes={current_time.format('mm')}
              label="Select time"
              uppercase={false}
              cancelLabel="Cancel"
              confirmLabel="OK"
              animationType="fade"
              locale="en"
            />
          )}
        </View>
      </ScrollView>
      <View style={styles.gradientButton}>
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
              const timeData = {
                tournamentId: tournamentId,
                startTimeInISO: getISOTime(`${startTimeFromRoute}:00`),
                endTimeInISO: getISOTime(`${endTimeFromRoute}:00`),
              };
              console.log(timeData);
              const response = await addTime(timeData);
              console.log('I am response for time', response.data);
              if (response.data.status) {
                navigation.goBack();
              } else {
                SimpleToast.show('Something Went Wrong, Please try again 😭');
              }

            }}
          />
        ) : (
          <GradientButton
            start={{x: 0, y: 0}}
            end={{x: 2, y: 0}}
            colors={disabled ? ['#999999', '#999999'] : ['#FFBA8C', '#FE5C6A']}
            text="PROCEED"
            style={{width: '100%', marginTop: 0, height: 48}}
            textstyle={{
              height: 16,
              fontWeight: '500',
              fontSize: 14,
              letterSpacing: 0.5,
              lineHeight: 19,
            }}
            onPress={handlePress}
          />
        )}
      </View>
    </View>
  );
};

export default StartTime;
const styles = StyleSheet.create({
  text: {
    height: 16,
    width: 224,
    opacity: 0.5,
    color: '#666666',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 16,
    textAlign: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 11,
    flex: 1,
    // borderWidth: 1,
  },
  gradientButton: {
    width: '100%',
    marginBottom: Platform.OS === 'ios' ? 10 : 0,
  },
});
