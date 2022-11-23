import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import RadioButton from '../components/RadioButton';
import GradientButton from '../components/GradientButton';
import {TextField} from 'rn-material-ui-textfield';
import {useSelector} from 'react-redux';
import ProfileImagePicker from '../components/ProfileImagePicker';
import {createFormData} from '../utils/createFormData';
import {createTournament} from '../services/manageTournament';
import {useDispatch} from 'react-redux';
import {setCode} from '../redux/manageTournamentSlice';
import {setTournamentData} from '../redux/manageTournamentSlice';
const radio_props = [
  {label: 'League', value: 'League', id: 0},
  {label: 'Knockout', value: 'Knockout', id: 1},
  {label: 'Individual Match', value: 'Individual Match', id: 2},
];

const CreateTournament = ({navigation}) => {
  const [tournamentName, setTournamentName] = useState('');
  const [tournamenttype, setTournamentType] = useState('');
  const [profilePictureUri, setProfilePictureUri] = useState('');

  const dispatch = useDispatch();

  const getDetails = data => {
    setProfilePictureUri(data);
  };
  const handlePress = async () => {
    if (profilePictureUri !== '' && tournamentName !== '') {
      const formData = createFormData({
        name: tournamentName,
        tournamentType: tournamenttype,
        email: 'noor@gmail.com',
        image: profilePictureUri,
      });
      const response = await createTournament(formData);
      console.log("I am create tournament responseeee",response)
      if (response.status) {
        const {code, _id, userId, name, email} = response.data.result;
        const tournamentresponse = {
          code: code,
          tournamentid: _id,
          userId: userId,
          name: name,
          email: email,
        };
        dispatch(setTournamentData(tournamentresponse));
        navigation.navigate('CreateTournamentSuccess');
      }
    } else {
      console.log('All fields are required');
    }
  };
  const getData = data => {
    setTournamentType(data);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground
          source={require('../../assets/images/IndiaTeam.png')}
          resizeMode="cover"
          style={styles.backgroundImage}>
          <View style={styles.backgroundBeyondSafeArea}>
            <SafeAreaView>
              <View style={styles.profileDetailsContainer}>
                <View style={styles.header}>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => navigation.goBack()}>
                    <Image
                      source={require('../../assets/images/goback.png')}
                      style={styles.gobackbutton}
                    />
                  </TouchableOpacity>
                  <Text style={styles.createTournament}>Create Tournament</Text>
                </View>
                {/* <View style={styles.teamlogoview}>
                <Image
                  source={require('../../assets/images/team3.png')}
                  style={styles.teamlogo}
                />
              </View> */}
                <ProfileImagePicker getImageUri={getDetails} />
                <View style={styles.textInput}>
                  <TextField
                    label="Tournament Name"
                    formatText={this.formatText}
                    onSubmitEditing={this.onSubmit}
                    ref={this.fieldRef}
                    textColor="#FFFFFF"
                    tintColor="rgba(224, 224, 224, 0.7)"
                    baseColor="#E0E0E0"
                    lineWidth={1}
                    onChangeText={text => setTournamentName(text)}
                    autoCapitalize="none"
                    style={{
                      fontFamily: 'Roboto',
                      fontSize: 16,
                      fontWeight: 'bold',
                      letterSpacing: 0.57,
                      lineHeight: 19,
                    }}
                  />
                </View>
              </View>
            </SafeAreaView>
          </View>
        </ImageBackground>
        <View style={styles.tournamentTypeView}>
          <Text style={styles.tournamentTypeText}>Tournament Type</Text>
          <RadioButton
            radio_props={radio_props}
            formHorizontal={false}
            style={{marginBottom: 20}}
            onPress={getData}
          />
        </View>
      </ScrollView>
      <View style={styles.gradientButton}>
        <GradientButton
          start={{x: 0, y: 0}}
          end={{x: 2, y: 0}}
          colors={['#FFBA8C', '#FE5C6A']}
          text="CREATE TOURNAMENT"
          style={{width: '100%', marginTop: 0, height: 48}}
          textstyle={{
            height: 16,
            fontWeight: '500',
            fontSize: 14,
            letterSpacing: 0.5,
            lineHeight: 19,
          }}
          onPress={handlePress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  profileDetailsContainer: {
    height: 297,
  },
  header: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  gobackbutton: {
    height: 20,
    width: 20,
  },
  createTournament: {
    marginLeft: 32,
    height: 28,
    width: 174,
    color: 'rgba(255,255,255,0.87)',
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 28,
  },
  backgroundBeyondSafeArea: {
    backgroundColor: 'rgba(0, 102, 226, 0.9)',
    paddingRight: 20,
    paddingLeft: 20,
  },
  teamlogo: {
    height: 104,
    width: 104,
  },
  teamlogoview: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 35,
    borderWidth: 7,
    borderRadius: 60,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 60,
    // shadowOpacity: 0.9,
  },
  tournamentTypeView: {
    // height: '100%',
    flex: 1,
    marginHorizontal: 15,
    marginTop: 20,
  },
  tournamentTypeText: {
    height: 16,
    color: '#8E9BA8',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
    marginBottom: 21,
  },
  gradientButton: {
    alignItems: 'flex-end',
    marginBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  textInput: {
    alignSelf: 'center',
    width: 260,
  },
});

export default CreateTournament;
