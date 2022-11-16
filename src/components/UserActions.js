import {Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

const UserActions = ({
  imageSource = require('../../assets/images/home.png'),
  title = 'Home',
  onPress,
  tintColor,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={imageSource}
        style={[styles.image, {tintColor: tintColor}]}
      />
      <Text style={[styles.text, {color: tintColor}]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 21,
  },
  image: {
    width: 24,
    height: 24,
  },
  text: {
    marginLeft: 11,
    fontSize: 14,
    lineHeight: 16,
    color: 'rgba(0,0,0,0.87)',
    fontFamily: 'Roboto-Regular',
  },
});

export default UserActions;
