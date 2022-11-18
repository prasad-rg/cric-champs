import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import uuid from 'react-native-uuid'

const StatsScreen = ({navigation}) => {
  const Batting=[
    {
      id:uuid.v4(),
      title:"Most Runs"
    },
    {
      id:uuid.v4(),
      title:"Best Batting average"
    },
    {
      id:uuid.v4(),
      title:"Best Batting Strike Rate"
    },
    {
      id:uuid.v4(),
      title:"Most Hundreds"
    },
    {
      id:uuid.v4(),
      title:"Most Fifties"
    },
    {
      id:uuid.v4(),
      title:"Most Fours"
    },
    {
      id:uuid.v4(),
      title:"Most Sixes"
    },
    {
      id:uuid.v4(),
      title:"Highest Score"
    },
  ];
  const Bowling=[
      {
        id:uuid.v4(),
        title:"Most Wickets"
      },
      {
        id:uuid.v4(),
        title:"Best Bowling average"
      },
      {
        id:uuid.v4(),
        title:"Most 5 Wickets Hauls"
      },
  ]
  return (
    <ScrollView>
     
      <Text style={styles.heading}>Batting</Text>
      {/* <FlatList
      data={Batting}
      keyExtractor={item=>item.id}
      renderItem={({item})=>(
        <Text>{item.title}</Text>
      )}/> */}
      <View style={styles.title_View}>
      {Batting.map(item=>(
        <Text key={item.id} style={styles.title}>{item.title}</Text>
      ))}
      </View>
      <Text style={styles.heading}>Batting</Text>
      <View style={styles.title_View}>
      {Bowling.map(item=>(
        <Text key={item.id} style={styles.title}>{item.title}</Text>
      ))}
      </View>

    </ScrollView>
  )
}

export default StatsScreen

const styles = StyleSheet.create({
  heading:{
    height: 40,
    width: "100%",
    color: '#858585',
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    letterSpacing: 0,
    lineHeight: 20,
    backgroundColor: 'rgba(217,226,233,0.5)',
    paddingHorizontal:20,
    padding:10
  },
  title_View:{
  backgroundColor:"#F5F5F5",
  // borderBottomWidth:1,
  // borderBottomColor:"red"
  borderColor: 'rgba(217,226,233,0.5)',
 
  },
  title:{
   borderWidth:0.5,
   borderColor: 'rgba(217,226,233,0.5)',
   height:55,
  //  width: 77,
   color: '#666666',
   fontFamily: 'Roboto-Regular',
   fontSize: 16,
   letterSpacing: 0,
   lineHeight: 24,
   paddingHorizontal:17,
    padding:15,
    // borderBottomWidth:1,
    // borderBottomColor: 'rgba(217,226,233,0.5)',
  }
})