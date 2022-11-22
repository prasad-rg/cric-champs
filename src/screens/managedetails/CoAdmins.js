import {StyleSheet, Text, SafeAreaView, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import CoAdminCard from '../../components/CoAdminCard';

const CoAdmins = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <View>
        <CoAdminCard source={require('../../../assets/images/profile2.png')} />
      </View>
    </ScrollView>
  );
};

export default CoAdmins;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  // card: {
  //   height: 173,

  //   backgroundColor: '#FFFFFF',
  //   marginHorizontal: 20,
  //   borderRadius: 10,
  //   overflow: 'hidden',
  //   marginTop: 15,
  // },
});
