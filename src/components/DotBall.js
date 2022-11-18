import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DotBall = () => {
  return (
    <SafeAreaView>
    <View>
      <View style={styles.dot}></View>
    </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    dot:{
        height:4,
        width:4,
        backgroundColor:"#000000",
        borderRadius:2
    },
})
export default DotBall