import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  Share,
} from 'react-native';
import React from 'react';
import ManageTab from '../navigation/ManageTab';
import {useSelector} from 'react-redux';

const ManageScreen = ({navigation}) => {
  const {tournamentDetails} = useSelector(state => state.tournamentDetails);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${tournamentDetails.code}, Share the tournament code to invite your friends`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEdit = () => {};

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/stadium3.png')}
        resizeMode="cover">
        <View style={styles.backgroundBeyondSafeArea}>
          <SafeAreaView>
            <View style={styles.profileDetailsContainer}>
              <View style={styles.headerText}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                      source={require('../../assets/images/backicon.png')}
                      style={styles.backButtonImage}
                    />
                  </TouchableOpacity>
                  <Text style={styles.viewText}>Manage</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <TouchableOpacity onPress={() => onShare()}>
                    <Image
                      source={require('../../assets/images/share3.png')}
                      style={{
                        tintColor: '#FFFFFF',
                        height: 25,
                        width: 25,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <Text style={styles.heading}>{tournamentDetails.name}</Text>
                <View style={{alignSelf: 'center', marginTop: 7}}>
                  <TouchableOpacity style={styles.tourButton}>
                    <Text style={styles.tourText}>
                      Tournament Code:{tournamentDetails.code}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </View>
      </ImageBackground>

      {/* </ScrollView> */}
      {/* </View> */}
      <ScrollView contentContainerStyle={{flex: 1}}>
        {/* <View
          style={{
            // flex:1,
            // borderWidth: 2,
            borderColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            height:"100%"
          }}> */}
        <ManageTab navigation={navigation} />
        {/* </View> */}
      </ScrollView>
    </View>
  );
};

export default ManageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileDetailsContainer: {
    height: 150,
    marginTop: 15,
  },
  backButtonImage: {
    height: 20,
    width: 20,
  },

  backgroundBeyondSafeArea: {
    backgroundColor: 'rgba(0, 102, 226, 0.85)',
    paddingRight: 20,
    paddingLeft: 20,
  },
  viewText: {
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
  headerText: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth:1,
    justifyContent: 'space-between',
  },
  heading: {
    height: 28,
    color: '#FFFFFF',
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 28,
    textAlign: 'center',
    margin: 24,
    alignSelf: 'center',
  },
  tourText: {
    height: 14,
    // width: 143,
    color: '#FFFFFF',
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 14,
  },
  tourButton: {
    height: 30,
    width: 180,
    borderRadius: 100,
    backgroundColor: '#5DA0D9',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -10,
  },
});
