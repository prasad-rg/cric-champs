import {View, StyleSheet, Text, Alert, ScrollView} from 'react-native';
import React, {useState} from 'react';
import AddProfileDetails from '../components/AddProfileDetails';

const UmpireProfile = ({navigation}) => {
  const [profilePictureUri, setProfilePictureUri] = useState('');
  const getDetails = data => {
    setProfilePictureUri(data);
  };

  const Details = [
    {
      id: 1,
      title: 'Name',
      value: 'Rajesh Gang',
    },
    {
      id: 2,
      title: 'City',
      value: 'Udupi',
    },
    {
      id: 3,
      title: 'Matches',
      value: 'Match 1, Match 3, Match 6',
    },
  ];
  return (
    <View style={styles.primaryContainer}>
      <ScrollView>
        <AddProfileDetails
          navigation={navigation}
          title="Umpire - Rajesh"
          backroundImageUri={require('../../assets/images/umpire.png')}
          getImageUri={getDetails}></AddProfileDetails>
        <View>
          {Details.map(item => (
            <View key={item.id} style={styles.listview}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.value}>{item.value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 50,
  },
  primaryContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listview: {
    padding: 20,
    flexDirection: 'row',
  },
  title: {
    height: 24,

    color: 'rgba(77,77,77,0.87)',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 24,
  },
  value: {
    height: 24,
    width: '50%',
    color: 'rgba(77,77,77,0.87)',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 24,
    marginLeft: 'auto',
  },
});

export default UmpireProfile;
