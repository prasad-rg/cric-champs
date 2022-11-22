import {View, StyleSheet, Text, Alert, ScrollView} from 'react-native';
import React, {useState} from 'react';
import AddProfileDetails from '../components/AddProfileDetails';


const PlayerProfile = ({navigation}) => {

  const [profilePictureUri, setProfilePictureUri] = useState('');
  const getDetails = data => {
    setProfilePictureUri(data);
  };

  const Details = [
    {
      id: 1,
      title: 'City / Town',
      value: 'Delhi',
    },
    {
      id: 2,
      title: 'Team',
      value: 'Paras XI',
    },
    {
      id: 3,
      title: 'Captain',
      value: 'Yes',
    },
    {
      id: 4,
      title: 'Role',
      value: 'batsman / Captain',
    },
    {
      id: 5,
      title: 'Batting Style',
      value: 'Right Handed',
    },
    {
      id: 6,
      title: 'Bowling Style',
      value: 'Right-arm medium',
    },
    {
      id: 7,
      title: 'Matches',
      value: '5',
    },
    {
      id: 8,
      title: 'Runs',
      value: '151',
    },
    {
      id: 9,
      title: 'Wickets',
      value: '4',
    },
    {
      id: 10,
      title: 'Achievements',
      value: 'Man of the Match (Match 5)',
    },
  ];
  return (
    <View style={styles.primaryContainer}>
        <ScrollView>
      <AddProfileDetails
        navigation={navigation}
        title="James Arthur"
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

export default PlayerProfile;
