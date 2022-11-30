import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  ScrollView,ActivityIndicator
} from 'react-native';
import React, {useState} from 'react';
import {TimePickerModal, TimePicker} from 'react-native-paper-dates';
import {useDispatch} from 'react-redux';
import {setEndTime} from '../../redux/MatchSlice';
import {setEnd} from '../../redux/MatchSlice';
import {useSelector} from 'react-redux';
import {setStart} from '../../redux/MatchSlice';
import GradientButton from '../../components/GradientButton';
import {addTime} from '../../services/manageTournament2';
import moment from 'moment';
import {getISOTime} from '../../utils/getISOTime';

const EndTime = ({navigation}) => {
  const dispatch = useDispatch();
  const endTime = useSelector(state => state.matchdata.endTime);
  const startTime = useSelector(state => state.matchdata.startTime);

  const tournamentId = useSelector(
    state => state.tournamentdata.tournamentdata.tournamentid,
  );

  const [visible, setVisible] = React.useState(false);
  const [hours, setHours] = useState(endTime);
  const [disabled, setDisabled] = useState(true);
  const [isLoading,setIsLoading]=useState(false)

  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onConfirm = React.useCallback(
    ({hours, minutes}) => {
      setVisible(false);
      dispatch(setEndTime(`${hours}:${minutes}`));
      setDisabled(false);
      dispatch(setEnd(true));
      dispatch(setStart(false));
      setHours(hours);
    },
    [setVisible],
  );

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      // dispatch(setEndTime(hours));
      dispatch(setEnd(true));
      dispatch(setStart(false));
    });
    return unsubscribe;
  }, [navigation]);

  // var sDate =
  // new Date(`${hours}:${minutes}`);


  const handlePress = async () => {
    setIsLoading(true)
    const timeData = {
      tournamentId: tournamentId,
      startTimeInISO: getISOTime(startTime),
      endTimeInISO: getISOTime(endTime),
    };
    console.log(timeData);
    const response = await addTime(timeData);
    console.log('I am response for time', response.data);
    setIsLoading(false)
    if (response.data.status) {
      navigation.navigate('Overview');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.text}>When do you want start for the day?</Text>
        <View style={{flex: 1, marginTop: 30}}>
          <TimePickerModal
            visible={true}
            onDismiss={onDismiss}
            onConfirm={onConfirm}
            hours={12}
            minutes={14}
            label="Select time"
            uppercase={false}
            cancelLabel="Cancel"
            confirmLabel="OK"
            animationType="fade"
            locale="en"
          />
        </View>
      </ScrollView>
      {isLoading ? (
         <View style={{marginBottom: 20}}>
         <ActivityIndicator size="large" color="#FFBA8C" />
         </View>
      ):(
        <View style={styles.gradientButton}>
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
      </View>
      )}
    
    </View>
  );
};

export default EndTime;
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
