import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import React from 'react';

import RadioButton from '../components/RadioButton';
import GradientButton from '../components/GradientButton';
import MatchTab from '../navigation/MatchTab';
const MatchDetails = ({navigation, route}) => {
  // console.info('========================', route.params);
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <View style={styles.backgroundBeyondSafeArea}>
          <SafeAreaView>
            <View style={styles.profileDetailsContainer}>
              <View style={styles.headerText}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image
                    source={require('../../assets/images/backicon.png')}
                    style={styles.backButtonImage}
                  />
                </TouchableOpacity>
                <Text style={styles.matchText}>
                  Match {route.params?.matchNumber}
                </Text>
              </View>
              <View>
                <Text style={styles.vsText}>
                  {`${route.params?.teams?.team1Name} vs ${route.params?.teams?.team2Name}`}
                </Text>
              </View>
            </View>
          </SafeAreaView>
        </View>

        <MatchTab navigation={navigation} route={route} />
      </ScrollView>
    </View>
  );
};

export default MatchDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   backgroundColor: 'rgba(217,226,233,0.5)',
  },
  profileDetailsContainer: {
    height: 73,
    marginTop: 15,
  },
  backButtonImage: {
    height: 20,
    width: 20,
  },

  backgroundBeyondSafeArea: {
    backgroundColor: 'rgba(0, 102, 226, 1)',
    paddingRight: 20,
    paddingLeft: 20,
  },
  headerText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  matchText: {
    height: 24,
    width: 100,
    color: 'rgba(255,255,255,0.87)',
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 24,
    marginLeft: 40,
  },
  vsText: {
    height: 40,
    // width: 185,
    opacity: 0.7,
    color: '#FFFFFF',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 28,
    paddingTop: 8,
    // borderWidth:1,
    marginLeft: 60,
  },
});
