import RadioForm from 'react-native-simple-radio-button';
import {View, Text} from 'react-native';
import React from 'react';
import {useState} from 'react';

const radio_props = [
  {label: 'League', value: 'League'},
  {label: 'Knockout', value: 'Knockout'},
  {label: 'Individual Match', value: 'Individual Match'},
];

const RadioButton = () => {
  const [value, setValue] = useState({value: -1});
  const [selectedLabelColor, setLabelColor] = useState('#4A90E2');
  const [buttonColor, setButtonColor] = useState('#4A90E2');
  const [selectedButtonColor, setSelectedButtonColor] = useState('#4A90E2');

  return (
    <RadioForm
      radio_props={radio_props}
      initial={0}
      selectedLabelColor={selectedLabelColor}
      buttonColor={buttonColor}
      selectedButtonColor={selectedButtonColor}
      buttonSize={12}
      buttonOuterSize={20}
      labelColor={'#4A90E2'}
      borderWidth={2}
      buttonStyle={{
        borderWidth:1
      }}
      labelStyle={{
        height: 16,
        fontFamily: 'Roboto',
        fontSize: 14,
        letterSpacing: -0.34,
        lineHeight: 16,
      }}
      onPress={value => {
        setValue({value: value});
        console.log(value);
        setLabelColor('#FA7171');
        // setButtonColor('#FA7171');
        setSelectedButtonColor('#FA7171');
      }}
    />
  );
};

export default RadioButton;
