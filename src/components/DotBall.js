import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const DotBall = ({style = {}}) => {
  return (
    <SafeAreaView>
      <View>
        <View
          style={[
            {
              height: 4,
              width: 4,
              backgroundColor: '#000000',
              borderRadius: 2,
              marginHorizontal: 10,
              borderWidth: 1,
            },
            {...style},
          ]}></View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dot: {
    height: 4,
    width: 4,
    backgroundColor: '#000000',
    borderRadius: 2,
  },
});
export default DotBall;
