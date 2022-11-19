import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Dimensions,
  ScrollView,
  Text
} from 'react-native';
import React, {useState} from 'react';

const images = [
//   require('../../assets/images/stadium1.png'),
//   require('../../assets/images/stadium2.png'),
//   require('../../assets/images/stadium3.png'),
'https://cdn.pixabay.com/photo/2016/11/29/02/05/audience-1866738_1280.jpg',
'https://cdn.pixabay.com/photo/2016/11/29/07/06/bleachers-1867992_1280.jpg',
'https://cdn.pixabay.com/photo/2020/04/02/11/37/football-pitch-4994688_1280.jpg'

];

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const StadiumInformation = () => {
  const [imgActive, setimgActive] = useState(0);

  onchange = (nativeEvent) => {
    if(nativeEvent){
        const slide=Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
         if(slide !=imgActive ){
            setimgActive(slide)
         }
    }

  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrap}>
        <ScrollView
          onScroll={({nativeEvent}) => onchange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          paddingEnabled
          horizontal
          style={styles.wrap}>
          {images.map((e, index) => (
            <Image
              key={e}
              resizeMode="stretch"
              style={styles.wrap}
              source={{uri: e}}
            />
          ))}
        </ScrollView>
        <View style={styles.dotWrap}>
        {images.map((e, index) => (
            <Text key={e} style={imgActive == index ? styles.dotActive: styles.dot}>●</Text>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StadiumInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrap: {
    width: WIDTH,
    height: HEIGHT * 0.25,
  },
  dotWrap:{
    position:"absolute",
    bottom:0,
    flexDirection:"row",
    alignSelf:"center"
  },
  dotActive:{
    margin:3,
    color:"black"
  },
  dot:{
    margin:3,
    color:"white"
  }
});
