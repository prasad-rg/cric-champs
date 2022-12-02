import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Circle = ({text, style = {}, textStyle = {}}) => {
  return (
    <SafeAreaView>
      <View
        style={[
          {
            height: 33,
            width: 33,
            borderRadius: 16.5,
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 10,
          },
          {...style},
        ]}>
        <Text
          style={[
            {
              color: '#FFFFFF',
              fontFamily: 'Roboto-Regular',
              fontSize: 14,
              letterSpacing: 0,
              lineHeight: 24,
            },
            {...textStyle},
          ]}>
          {text}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
export default Circle;
