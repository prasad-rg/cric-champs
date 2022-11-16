import RadioForm, {
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import React from 'react';
import {useState} from 'react';
import {RadioButton} from 'react-native-simple-radio-button';
import {StyleSheet} from 'react-native';

const RadioButtonComponent = ({
  radio_props,
  formHorizontal,
  style = {},
  flexWrap = {},
  onPress,
}) => {
  const [value, setValue] = useState({value: 0});
  const [index, setIndex] = useState({index: 0});

  const setData = (value, index) => {
    setValue({value: value});
    setIndex(index);
    onPress(value);
  };

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
              borderWidth: 1,
              alignItems: 'center',
              height: 40,
              width: 150,
              borderWidth: 0.8,
              borderColor: index === i ? '#FA7171' : '#4A90E2',
              borderRadius: 24,
            },
            {...style},
          ]}>
          <RadioButtonInput
            obj={obj}
            index={i}
            isSelected={index === i}
            onPress={(value, i) => setData(value, i)}
            borderWidth={1}
            buttonInnerColor={index === i ? '#FA7171' : '#4A90E2'}
            buttonOuterColor={index === i ? '#FA7171' : '#4A90E2'}
            buttonSize={12}
            buttonOuterSize={20}
            buttonStyle={{}}
            buttonWrapStyle={{marginLeft: 10}}
          />
          <RadioButtonLabel
            obj={obj}
            index={i}
            isSelected={index === i}
            labelHorizontal={true}
            onPress={setData}
            labelColor={index === i ? '#FA7171' : '#4A90E2'}
            labelStyle={{
              height: 16,
              fontFamily: 'Roboto',
              fontSize: 14,
              letterSpacing: -0.34,
              lineHeight: 16,
            }}
            labelWrapStyle={{}}
          />
        </RadioButton>
      ))}
    </RadioForm>
  );
};

export default RadioButtonComponent;

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
