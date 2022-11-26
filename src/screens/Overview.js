import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import GradientButton from '../components/GradientButton';
import TournamentInputList from '../components/TournamentInputList';
import CustomModal from '../components/CustomModal';
import Tournament from './managedetails/Tournament';
import { useSelector } from 'react-redux';

const Overview = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const [modal,setModal] =useState(true)
  const tournamentdata = useSelector(
    state => state.tournamentdata.tournamentdata,
  );
  console.log(tournamentdata)

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/stadium1.png')}
        resizeMode="cover">
        <View style={styles.backgroundBeyondSafeArea}>
          <SafeAreaView>
            <View style={styles.profileDetailsContainer}>
              <View style={styles.headerText}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Image
                      source={require('../../assets/images/backicon.png')}
                      style={styles.backButtonImage}
                    />
                  </TouchableOpacity>
                  <Text style={styles.viewText}>Overview</Text>
                </View>
              </View>
              <View>
                <Text style={styles.heading}>{tournamentdata.name}</Text>
                <View style={{alignSelf: 'center', marginTop: 7}}>
                  <TouchableOpacity style={styles.tourButton}>
                    <Text style={styles.tourText}>{`Tournament Code:${tournamentdata.code}`}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </View>
      </ImageBackground>

      <View style={styles.secondView}>
        <Text style={styles.overs}>Tournament Inputs</Text>
        <ScrollView>
          <Tournament disableRegenerateFixture = {false}/>
        </ScrollView>
      </View>

      <View style={{marginBottom: Platform.OS === 'ios' ? 20 : 0}}>
        <GradientButton
          start={{x: 0, y: 0}}
          end={{x: 2, y: 0}}
          colors={['#FFBA8C', '#FE5C6A']}
          text="GENERATE FIXTURE"
          style={{height: 50, width: '100%', marginTop: 0}}
          textstyle={{
            height: 16,
            fontWeight: '500',
            fontSize: 14,
            letterSpacing: 0.5,
            lineHeight: 19,
          }}
          onPress={() => setVisible(true)}
        />
      </View>


        { modal ? ( <CustomModal visible={visible}>
           <View style={{alignItems: 'center', marginBottom: 30}}>
             <Image
               source={require('../../assets/images/AwesomeBall.png')}
               style={styles.image}
             />
             <Text style={styles.textView}>Your Fixture has been{'\n'}generated!</Text>
           </View>
           <TouchableOpacity onPress={() => setVisible(false)}>
             <Text style={styles.matchText}>VIEW MATCHES</Text>
           </TouchableOpacity>
         </CustomModal>):(
           <CustomModal visible={visible}>
           <View style={{alignItems: 'center', marginBottom: 30}}>
             <Image
               source={require('../../assets/images/Oopsball.png')}
               style={styles.image}
             />
             <Text style={styles.textView}>Oops! Something {'\n'} went wrong.</Text>
           </View>
           <TouchableOpacity onPress={() => setVisible(false)}>
             <Text style={styles.tryText}>TRY AGAIN</Text>
           </TouchableOpacity>
         </CustomModal>
          
        )}
       
    </View>

    // </ScrollView>
  );
};

export default Overview;

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
    backgroundColor: 'rgba(0, 102, 226, 0.9)',
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
    width: 240,
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
  secondView: {
    flex: 1,
    backgroundColor: 'rgba(217,226,233,0.5)',
  },
  overs: {
    height: 16,
    color: '#8E9BA8',
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
    margin: 20,
  },
  image: {
    height: 200,
    width: 200,

    alignItems: 'center',
    justifyContent:"center"
  },
  textView: {
    height: 42,
    // width: 138,
    color: '#4A4A4A',
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    letterSpacing: 0,
    lineHeight: 21,
    textAlign: 'center',
    // alignItems:"center"
    justifyContent:"center"
  },
  tryText:{
    height: 16,
    width: 77,
    color: '#F5112D',
    fontFamily: 'Roboto-Bold',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    lineHeight: 16,
    textAlign: 'center',
  },
  matchText:{
    height: 16,
    // width: 77,
    color: '#4A90E2',
    fontFamily: 'Roboto-Bold',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    lineHeight: 16,
    textAlign: 'center',
  }
});
