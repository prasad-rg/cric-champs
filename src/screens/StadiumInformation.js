import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Dimensions,
  ScrollView,
  Text,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import GradientButton from '../components/GradientButton';

const images = [

  'https://cdn.pixabay.com/photo/2016/11/29/02/05/audience-1866738_1280.jpg',
  'https://cdn.pixabay.com/photo/2016/11/29/07/06/bleachers-1867992_1280.jpg',
 'https://cdn.pixabay.com/photo/2015/03/07/10/00/cricket-662956_1280.jpg',
];

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const StadiumInformation = () => {
  const [imgActive, setimgActive] = useState(0);

  onchange = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide != imgActive) {
        setimgActive(slide);
      }
    }
  };

  const Details = [
    {
      id: 1,
      title: 'City',
      value: 'Udupi',
    },
    {
      id: 2,
      title: 'Location',
      value: 'NH 66, Santhekatte',
    },
    {
      id: 3,
      title: 'Matches',
      value: 'Match 1, Match 3, Match 6',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.backgroundBeyondSafeArea}>
          <SafeAreaView>
            <View style={styles.profileDetailsContainer}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity>
                    <Image
                      source={require('../../assets/images/backicon.png')}
                    />
                  </TouchableOpacity>
                  <Text style={styles.stadiumName}>Santhekatte Stadium</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity>
                    <Image source={require('../../assets/images/pencil.png')} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={require('../../assets/images/trash.png')}
                      style={{marginHorizontal: '5%'}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </View>
        <View style={styles.wrap}>
          <ScrollView
            onScrollBeginDrag={({nativeEvent}) => onchange(nativeEvent)}
            showsHorizontalScrollIndicator={false}
            paddingEnabled
            horizontal
            style={styles.wrap}>
            {images.map((item, index) => (
              <Image
                key={item}
                resizeMode="stretch"
                style={styles.wrap}
                source={{uri: item}}
              />
            ))}
          </ScrollView>
          <View style={styles.dotWrap}>
            {images.map((item, index) => (
              <Text
                key={item}
                style={imgActive == index ? styles.dotActive : styles.dot}>
                ●
              </Text>
            ))}
          </View>
        </View>
        {Details.map(item => (
          <View key={item.id} style={styles.listview}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={{marginBottom: Platform.OS === 'ios' ? 20 : 0}}>
        <GradientButton
          start={{x: 0, y: 0}}
          end={{x: 2, y: 0}}
          colors={['#FFBA8C', '#FE5C6A']}
          text="GET DIRECTION"
          style={{height: 50, width: '100%', marginTop: 0}}
          textstyle={{
            height: 16,
            fontWeight: '500',
            fontSize: 14,
            letterSpacing: 0.5,
            lineHeight: 19,
          }}
        />
      </View>
    </View>
  );
};

export default StadiumInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileDetailsContainer: {
    height: 47,
    marginTop: 15,
  },
  backgroundBeyondSafeArea: {
    backgroundColor: 'rgba(0, 102, 226, 1)',
    paddingRight: 20,
    paddingLeft: 20,
  },
  stadiumName: {
    height: 24,
    width: 188,
    color: '#FFFFFF',
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 24,
    marginHorizontal: '10%',
  },
  wrap: {
    width: WIDTH,
    height: HEIGHT * 0.25,
  },
  dotWrap: {
    position: 'absolute',
    bottom: 15,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotActive: {
    margin: 3,
    color: 'orange',
  },
  dot: {
    // height:2,
    // width:2,
    margin: 3,
    color: 'orange',
    opacity: 0.6,
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
