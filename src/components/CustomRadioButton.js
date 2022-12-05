import RadioForm, {
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {RadioButton} from 'react-native-simple-radio-button';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {changeUpdatePressedState} from '../redux/updateLiveScoreControls';

const CustomRadioButton = ({
  radio_props,
  formHorizontal,
  style = {},
  labelStyle = {},
  flexWrap = {},
  onPress,
}) => {
  const [value, setValue] = useState({value: 0});
  const [index, setIndex] = useState({index: 0});
  const {updateLiveScoreControls} = useSelector(
    state => state.updateLiveScoreControls,
  );
  const dispatch = useDispatch();

  const setData = (val, ind) => {
    setValue(val);
    setIndex(ind);
    onPress(val, ind);
    // console.log('I am value, I am in', val, ind);
    if (index === ind) {
      setData(null);
      setIndex(null);
    }
  };
  useEffect(() => {
    if (updateLiveScoreControls === updateLiveScoreControls) {
      setData(null);
      setIndex(null);
    }
  }, [updateLiveScoreControls]);

  // console.log('cefefe', updateLiveScoreControls);

  return (
    <RadioForm
      animation={true}
      formHorizontal={formHorizontal}
      style={flexWrap}>
      {radio_props.map((obj, i) => (
        <RadioButton
          key={i}
          isSelected={index === i}
          onPress={(value, i) => setData(value, i)}
          style={[
            {
              borderWidth: 1,
              alignItems: 'center',
              height: 40,
              width: 80,
              borderWidth: 0.8,
              backgroundColor: index === i ? '#C44343' : '#FFFFFF',
              borderColor: '#C44343',
              borderRadius: 24,
              alignItems: 'center',
              justifyContent: 'center',
            },
            {...style},
          ]}>
          <RadioButtonLabel
            obj={obj}
            index={i}
            isSelected={index === i}
            labelHorizontal={true}
            onPress={setData}
            labelColor={index === i ? '#FFFFFF' : '#C44343'}
            labelStyle={[
              {
                height: 42,
                width: 'auto',
                fontFamily: 'Roboto-Regular',
                fontSize: 16,
                letterSpacing: -0.34,
                lineHeight: 19,
                paddingHorizontal: 10,
                paddingTop: 10,
              },
              {...labelStyle},
            ]}
            labelWrapStyle={{}}
          />
        </RadioButton>
      ))}
    </RadioForm>
  );
};

export default CustomRadioButton;

const styles = StyleSheet.create({
  radioButtonView: {
    borderWidth: 1,
    alignItems: 'center',
    height: 40,
    width: 150,
    borderWidth: 0.8,
    borderColor: '#FA7171',
    borderRadius: 24,
  },
});
