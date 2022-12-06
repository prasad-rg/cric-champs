import {StyleSheet, Text, ScrollView, View} from 'react-native';
import React from 'react';

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
});
