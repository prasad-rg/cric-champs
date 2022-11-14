import {Pressable, Text, StyleSheet} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
const GradientButton = ({start,end,colors,text,onPress,style={}}) => {
  return (
    <LinearGradient
      start={start}
      end={end}
      colors={colors}
      style={[styles.gradientBackground,{...style}]}>
      <Pressable style={styles.gradientButton} onPress={onPress}>
        <Text style={styles.createTournament}>{text}</Text>
      </Pressable>
    </LinearGradient>
  );
};

export default GradientButton;

const styles = StyleSheet.create({
  gradientButton: {
    height: 40,
    width: 241,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createTournament: {
    height: 18,
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.19,
    lineHeight: 15,
    textAlign: 'center',
  },
  gradientBackground: {
    width: 241,
    borderRadius: 4,
    boxShadow: '0 8 30 0 rgba(222,235,251,0.71)',
    alignSelf: 'center',
    marginTop: 20,
  },
});
