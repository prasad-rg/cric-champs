import {Text, StyleSheet, TouchableOpacity, Image, View} from 'react-native';
import React from 'react';

const  OutlinedButton = ({text,source,style={},buttonstyle={},onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.enterButton,{...buttonstyle}]}>
      <View style={styles.shareview}><Image source={source} style={style.shareimage}/><Text style={[styles.enter,{...style}]}>{text}</Text></View>
    </TouchableOpacity>
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
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 14,
  },
  shareview:{
    flexDirection:'row',
    alignItems:'center',
  },
  shareimage:{
    height: 12,
    width: 12,
  },
});
