import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import GradientButton from '../components/GradientButton';
import TeamListName from '../components/TeamListName';

const UmpiresList = () => {
  const [umpire, setUmpire] = useState(true);
  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground
          source={require('../../assets/images/umpire.png')}
          resizeMode="cover">
          <View style={styles.backgroundBeyondSafeArea}>
            <SafeAreaView>
              <View style={styles.profileDetailsContainer}>
                <View style={styles.headerText}>
                  <TouchableOpacity>
                    <Image
                      source={require('../../assets/images/backicon.png')}
                      style={styles.backButtonImage}
                    />
                  </TouchableOpacity>
                  <Text style={styles.umpireText}>Umpires</Text>
                </View>

                <TouchableOpacity style={styles.umpireButton}>
                  <Text style={styles.addumpireText}>ADD UMPIRE</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </View>
        </ImageBackground>
        <View style={styles.secondView}>
          <Text style={styles.umpire}>Umpires</Text>

          {umpire ? (
            <View>
              <Text style={styles.noUmpire}>No Umpires Added Yet!</Text>
            </View>
          ) : (
            <View style={styles.groundView}>
              <TeamListName
                source={require('../../assets/images/profile1.png')}
                text="Jeevan Lazarus"
              />
              <TeamListName
                source={require('../../assets/images/profile2.png')}
                text="Rajesh G"
              />
              <TeamListName
                source={require('../../assets/images/profile3.png')}
                text="Sunder Mohan"
              />
            </View>
          )}
        </View>
      </ScrollView>
      <View style={{marginBottom: Platform.OS === 'ios' ? 20 : 0}}>
        <GradientButton
          start={{x: 0, y: 0}}
          end={{x: 2, y: 0}}
          colors={umpire ? ['#999999', '#999999'] : ['#FFBA8C', '#FE5C6A']}
          text="PROCEED"
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

export default UmpiresList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(217,226,233,0.5)',
  },
  profileDetailsContainer: {
    height: 280,
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
  umpireText: {
    height: 24,
    width: 100,
    color: 'rgba(255,255,255,0.87)',
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 24,
    marginLeft: 40,
  },
  headerText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addumpireText: {
    height: 14,
    // width: 60,
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 14,

    alignSelf: 'center',
  },
  umpireButton: {
    height: 42,
    width: 210,
    borderWidth: 2,
    borderRadius: 20,

    borderColor: '#FFFFFF',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 180,
  },
  umpire: {
    height: 16,
    color: '#8E9BA8',
    fontFamily: 'Roboto',
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
    margin: 20,
  },
  secondView: {
    flex: 1,
  },
  umpireView: {
    marginTop: -15,
  },
  card: {
    height: 68,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,

    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 15,
  },
  noUmpire: {
    height: 24,
    // width: 209,
    color: '#A3A3A3',
    fontFamily: 'Roboto-Medium',
    fontSize: 22,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 24,
    textAlign: 'center',
  },
});
