import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

const DropdownField = ({
  data = [],
  value = {},
  onSelect = () => {},
  team1Name = '',
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const onSelectedItem = val => {
    setShowOptions(false);
    onSelect(val);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setShowOptions(!showOptions)}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.teamName}>
            {!!value ? value?.name : team1Name !== '' ? team1Name : `Select`}
          </Text>
          <Image
            source={require('../../assets/images/downArrow.png')}
            style={{
              tintColor: 'grey',
              height: 15,
              width: 18,
              marginHorizontal: 20,
              transform: [{rotate: showOptions ? '180deg' : '0deg'}],
            }}
          />
        </View>
      </TouchableOpacity>
      {showOptions && (
        <View>
          {data.map((val, i) => {
            return (
              <TouchableOpacity
                key={String(i)}
                onPress={() => onSelectedItem(val)}>
                <Text style={styles.textList}>{val.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default DropdownField;

const styles = StyleSheet.create({
  teamName: {
    height: 16,
    color: '#696969',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
  },
  textList: {
    height: 16,
    color: '#696969',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
    marginTop: 10,
    paddingHorizontal: 10,
  },
});
