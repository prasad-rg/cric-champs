import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TeamListName from '../components/TeamListName'

const UmpiresScreen = () => {
  return (
 <ScrollView>
   <TeamListName
                // source={require('../../assets/images/profile1.png')}
                text="Jeevan Lazarus"
              />
              <TeamListName
                // source={require('../../assets/images/profile2.png')}
                text="Rajesh G"
              />
              <TeamListName
                // source={require('../../assets/images/profile3.png')}
                text="Sunder Mohan"
              />
              <TeamListName
                // source={require('../../assets/images/profile4.png')}
                text="Parra Warriors"
              />
              <TeamListName
                // source={require('../../assets/images/profile5.png')}
                text="Jackson V"
              />
             
 </ScrollView>
  )
}

export default UmpiresScreen

const styles = StyleSheet.create({})