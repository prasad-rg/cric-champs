import RadioForm, {
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import React from 'react';
import {useState} from 'react';
import {RadioButton} from 'react-native-simple-radio-button';
import {StyleSheet} from 'react-native';

const RadioButtonDisabled = ({
  radio_props,
  formHorizontal,
  style = {},
  flexWrap = {},
}) => {
  return (
    <RadioForm
      animation={true}
      formHorizontal={formHorizontal}
      style={flexWrap}>
      {radio_props.map((obj, i) => (
        <RadioButton
          key={i}
          isSelected={false}
          style={[
            {
              borderWidth: 1,
              alignItems: 'center',
              height: 40,
              width: 150,
              borderWidth: 0.8,
              borderRadius: 24,
              borderColor: '#C0C0C0',
            },
            {...style},
          ]}>
          <RadioButtonInput
            obj={obj}
            index={i}
            buttonOuterColor="#C0C0C0"
            borderWidth={1}
            buttonInnerColor="#FFFFFF"
            buttonSize={12}
            buttonOuterSize={20}
            buttonStyle={{}}
            buttonWrapStyle={{marginLeft: 10}}
            isSelected={false}
            onPress={() => null}
          />
          <RadioButtonLabel
            obj={obj}
            index={i}
            isSelected={false}
            labelHorizontal={true}
            onPress={() => null}
            labelColor="#C0C0C0"
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

export default RadioButtonDisabled;

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
