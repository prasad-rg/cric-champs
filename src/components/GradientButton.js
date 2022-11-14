import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
const GradientButton = ({
  start,
  end,
  colors,
  text,
  onPress,
  style = {},
  textstyle = {},
}) => {
  return (
    <LinearGradient
      start={start}
      end={end}
      colors={colors}
      style={[styles.gradientBackground, {...style}]}>
      <TouchableOpacity style={styles.gradientButton} onPress={onPress}>
        <Text style={[styles.createTournament, {...textstyle}]}>{text}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default GradientButton;

const styles = StyleSheet.create({
  gradientButton: {
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth:1,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
