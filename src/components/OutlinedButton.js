import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';

const OutlinedButton = ({text}) => {
  return (
    <Pressable style={styles.enterButton}>
      <Text style={styles.enter}>{text}</Text>
    </Pressable>
  );
};

export default OutlinedButton;

const styles = StyleSheet.create({
  enterButton: {
    boxSizing: 'border-box',
    height: 41,
    width: 70,
    borderWidth: 1,
    borderColor: '#F5A623',
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    boxShadow: '0 8 30 0 rgba(223,223,223,0.37)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 9.5,
  },
  enter: {
    height: 16,
    color: '#F5A623',
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 14,
  },
});
