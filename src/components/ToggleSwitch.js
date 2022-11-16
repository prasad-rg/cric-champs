import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Switch} from 'react-native-switch';

const ToggleSwitch = () => {
  const [clicked, setClicked] = useState(false);
  const handleValue = (val) => {
    setClicked(!clicked);
    console.log(val);
  };
  return (
    <Switch
      value={clicked}
      onValueChange={val => handleValue(val)}
      disabled={false}
      activeText={'On'}
      inActiveText={'Off'}
      circleSize={20}
      barHeight={14}
      circleBorderWidth={0}
      backgroundActive={'rgba(240, 183, 105, 0.5)'}
      backgroundInactive={'#C0C0C0'}
      circleActiveColor={'#F0B769'}
      circleInActiveColor={'rgba(241, 241, 241, 1)'}
      renderActiveText={false}
      renderInActiveText={false}
      switchLeftPx={2}
      switchRightPx={2}
      switchWidthMultiplier={1.8}
      switchBorderRadius={30}
      innerCircleStyle={{
        elevation: 5,
        shadowColor: '#999999',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 1,
        shadowRadius: 1,
      }}
    />
  );
};

export default ToggleSwitch;
