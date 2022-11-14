import React from 'react'
import { View, Text,StyleSheet } from 'react-native'
import 'react-native-gesture-handler';

const App = () => {
  return (
    <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
      <Text style={styles.text}>App</Text>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  text:{
    fontFamily:'HelveticaNeue Bold'
  }
})