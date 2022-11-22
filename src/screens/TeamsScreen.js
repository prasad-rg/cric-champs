import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TeamListName from '../components/TeamListName'
const TeamsScreen = ({navigation}) => {
  return (
   <ScrollView>
    <TeamListName
                // source={require('../../assets/images/team1.png')}
                text="Udupi Design Labs"
              />
              <TeamListName
                // source={require('../../assets/images/team2.png')}
                text="Paras XI"
              />
              <TeamListName
                // source={require('../../assets/images/team3.png')}
                text="Team Lions"
              />
              <TeamListName
                // source={require('../../assets/images/team4.png')}
                text="Parra Warriors"
              />
              <TeamListName
                // source={require('../../assets/images/team5.png')}
                text="Team Dabangg"
              />
              <TeamListName
                // source={require('../../assets/images/team3.png')}
                text="Team Lions"
              />
              <TeamListName
                // source={require('../../assets/images/team4.png')}
                text="Parra Warriors"
              />
              <TeamListName
                // source={require('../../assets/images/team5.png')}
                text="Team Dabangg"
              />
   </ScrollView>
  )
}

export default TeamsScreen

const styles = StyleSheet.create({})