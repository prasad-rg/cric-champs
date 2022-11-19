import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AddProfileDetails from '../components/AddProfileDetails'

const PlayerProfile = ({navigation}) => {
    const [profilePictureUri, setProfilePictureUri] = useState('');
    const getDetails = data => {
        setProfilePictureUri(data);
      };

  return (
    <View style={styles.container}>
        {/* <AddProfileDetails profilePictureUri = {require('../../assets/images/profile2.png')}
  backroundImageUri = {require('../../assets/images/umpire.png')} title='Add Umpire'/> */}
              <AddProfileDetails
              backroundImageUri={require('../../assets/images/ground1.png')}
              title="Add Player"
              navigation={navigation}
              getImageUri={getDetails}
            />
        </View>
  )
}

export default PlayerProfile

const styles = StyleSheet.create({
  flex:1
})