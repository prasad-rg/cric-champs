import RadioForm, {
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {RadioButton} from 'react-native-simple-radio-button';
import {StyleSheet} from 'react-native';
import {combineReducers} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';

const CustomRunsButton = ({
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

  return (
    <RadioForm
      animation={true}
      formHorizontal={formHorizontal}
      style={flexWrap}>
      {radio_props.map((obj, i) => (
        <RadioButton
          key={i}
          isSelected={index === i}
          style={[
            {
              // borderWidth: 1,
              alignItems: 'center',
              height: 40,
              width: 80,
              borderWidth: 0.8,
              backgroundColor:
                index === i && i == 4
                  ? '#5FB100'
                  : index === i && i == 5
                  ? '#5FB100'
                  : index === i && i == 0
                  ? '#989898'
                  : index === i && i == 1
                  ? '#4A90E2'
                  : index === i && i == 2
                  ? '#4A90E2'
                  : index === i && i == 3
                  ? '#4A90E2'
                  : '#FFFFFF',
              borderColor:
                i == 4
                  ? '#5FB100'
                  : i == 5
                  ? '#5FB100'
                  : i == 0
                  ? '#989898'
                  : i == 1
                  ? '#4A90E2'
                  : i == 2
                  ? '#4A90E2'
                  : i == 3
                  ? '#4A90E2'
                  : '#FFFFFF',
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
            labelColor={
              index === i
                ? '#FFFFFF'
                : i === 0
                ? '#979797'
                : i === 2
                ? '#4A90E2'
                : i === 3
                ? '#4A90E2'
                : i === 4
                ? '#5FB100'
                : i === 5
                ? '#5FB100'
                : i === 1
                ? '#4A90E2'
                : 'red'
            }
            labelStyle={[
              {
                height: 19,
                width: 'auto',
                fontFamily: 'Roboto-Regular',
                fontSize: 16,
                letterSpacing: -0.34,
                lineHeight: 19,
                paddingHorizontal: 10,
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

export default CustomRunsButton;

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
