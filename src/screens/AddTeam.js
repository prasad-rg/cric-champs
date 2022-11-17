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
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import UserActions from '../components/UserActions';
import RadioButton from '../components/RadioButton';
import GradientButton from '../components/GradientButton';
import {TextField} from 'rn-material-ui-textfield';
import {useWindowDimensions} from 'react-native';
import TeamListName from '../components/TeamListName';
import {useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';

const radio_props = [
  {label: 'League', value: 'League', id: 0},
  {label: 'Knockout', value: 'Knockout', id: 1},
  {label: 'Individual Match', value: 'Individual Match', id: 2},
];

const AddTeam = ({navigation}) => {
  const [teamname, setTeamName] = useState('');
  const [city, setCity] = useState('');
  const [team, setTeam] = useState(true);
  const {width, height} = useWindowDimensions();
  const [imageUri, setImageUri] = useState('');
  const [profilePictureUri, setProfilePictureUri] = useState('');

  const getImageFromCamera = () => {
    ImagePicker.openCamera({
      width: 104,
      height: 104,
      cropping: true,
    }).then(image => {
      setImageUri(image.path);
      console.log(image);
    });
  };

  const getImageFromGallary = () => {
    ImagePicker.openPicker({
      width: 104,
      height: 104,
      cropping: true,
    }).then(image => {
      setImageUri(image.path);
      getImageUri(image.path);
      // console.log(image.path);
    });
  };

  const createThreeButtonAlert = () =>
    Alert.alert('Select Picture From', '', [
      {
        text: 'Camera',
        onPress: () => getImageFromCamera(),
      },
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Gallary',
        onPress: () => getImageFromGallary(),
      },
    ]);
  const participantdata = useSelector(state => state.participantdata.value);

  const data = {
    image: '',
    name: teamname,
    city: city,
    tournamentId: '',
  };

  const handlePress = () => {
    console.log(data);
    navigation.navigate('CreateTournamentSuccess');
  };
  const handlePlayer = () => {
    navigation.navigate('AddPlayer');
  };
  const handleBack = () => {
    navigation.navigate('TeamsList');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground
          style={{width: Dimensions.get('window').width}}
          source={require('../../assets/images/IndiaTeam.png')}
          resizeMode="cover">
          <View style={styles.backgroundBeyondSafeArea}>
            <SafeAreaView>
              <View style={styles.profileDetailsContainer}>
                <View style={styles.header}>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={handleBack}>
                    <Image
                      source={require('../../assets/images/goback.png')}
                      style={styles.gobackbutton}
                    />
                  </TouchableOpacity>
                  <Text style={styles.createTournament}>Add Team</Text>
                </View>

                <View style={styles.teamlogoview}>
                  <Image
                    source={
                      profilePictureUri
                        ? profilePictureUri
                        : imageUri
                        ? {uri: imageUri}
                        : require('../../assets/images/team4.png')
                    }
                    style={styles.teamlogo}
                  />
                </View>
                <View
                  style={
                    height > width
                      ? [
                          styles.imagepicker,
                          {right: Dimensions.get('window').width / 2.86},
                        ]
                      : [
                          styles.imagepicker,
                          {right: Dimensions.get('window').width / 2.55},
                        ]
                  }>
                  <TouchableOpacity
                    onPress={() => {
                      createThreeButtonAlert();
                    }}>
                    <Image
                      source={require('../../assets/images/camera.png')}
                      style={styles.gobackbutton}
                    />
                  </TouchableOpacity>
                </View>

                <View>
                  <TextField
                    label="Team Name"
                    formatText={this.formatText}
                    onSubmitEditing={this.onSubmit}
                    ref={this.fieldRef}
                    textColor="#FFFFFF"
                    tintColor="rgba(224, 224, 224, 0.7)"
                    baseColor="rgba(224, 224, 224, 0.7)"
                    lineWidth={1}
                    onChangeText={text => setTeamName(text)}
                    autoCapitalize="none"
                    style={{
                      fontFamily: 'Roboto',
                      fontSize: 16,
                      fontWeight: 'bold',
                      letterSpacing: 0.57,
                      lineHeight: 19,
                    }}
                    inputContainerStyle={{
                      alignSelf: 'center',
                      width: 260,
                      height: 61,
                      marginTop: -6,
                    }}
                  />

                  <TextField
                    label="City / Town (Optional)"
                    formatText={this.formatText}
                    onSubmitEditing={this.onSubmit}
                    ref={this.fieldRef}
                    textColor="#FFFFFF"
                    tintColor="rgba(224, 224, 224, 0.7)"
                    baseColor="rgba(224, 224, 224, 0.7)"
                    lineWidth={1}
                    onChangeText={text => setCity(text)}
                    autoCapitalize="none"
                    inputContainerStyle={{
                      alignSelf: 'center',
                      width: 260,
                      height: 61,
                      marginTop: -6,
                    }}
                    style={{
                      fontFamily: 'Roboto-Medium',
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
          <View style={styles.addButton}>
            <TouchableOpacity onPress={handlePlayer}>
              <Text style={styles.addTeamText}>ADD PLAYER</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.showaddedplayer}>
          <Text style={styles.players}>Players</Text>
          {!team ? (
            <View style={styles.noplayerView}>
              <Text style={styles.noplayers}>No Players Added Yet!</Text>
            </View>
          ) : (
            <View style={styles.teamsView}>
              {/* <FlatList
                data={participantdata}
                keyExtractor={item => item.tempId}
                renderItem={({item}) => (
                  console.log('I am item', item.tempId),
                  <TeamListName
                    source={require('../../assets/images/team1.png')}
                    text={item.name}
                  />
                )}
              /> */}
              {participantdata.map(
                value => (
                  console.log('I ammmmmmmm Uriiiii from map', value.image),
                  (
                    <View key={value.tempId}>
                      <TeamListName
                        // source={require(`${value.image}`)}
                        text={value.name}
                      />
                    </View>
                  )
                ),
              )}
            </View>
          )}
        </View>
      </ScrollView>
      <View style={styles.gradientButton}>
        <GradientButton
          start={{x: 0, y: 0}}
          end={{x: 2, y: 0}}
          colors={['#FFBA8C', '#FE5C6A']}
          text="SAVE TEAM"
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
  },
  profileDetailsContainer: {
    height: 351,
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
    height: 106,
    width: 106,
    borderRadius: 60,
  },
  teamlogoview: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 31,
    borderWidth: 7,
    borderRadius: 60,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 60,
  },
  tournamentTypeView: {
    height: 80,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
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
    borderWidth: 1,
  },
  addTeamText: {
    height: 14,
    color: '#0066E2',
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 14,

    alignSelf: 'center',
  },
  addButton: {
    height: 40,
    width: 200,
    borderWidth: 2,
    borderRadius: 20,
    boxShadow: '0 8 30 0 rgba(223,223,223,0.37)',
    borderColor: '#0066E2',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  showaddedplayer: {
    height: '100%',
    backgroundColor: 'rgba(217,226,233,0.5)',
  },
  players: {
    height: 16,
    color: '#8E9BA8',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
    marginLeft: 16,
    marginTop: 20,
  },
  noplayers: {
    height: 24,
    width: 200,
    color: '#A3A3A3',
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 24,
    marginTop: 18,
    textAlign: 'center',
  },
  noplayerView: {
    alignItems: 'center',
  },
  imagepicker: {
    height: 34,
    width: 34,
    backgroundColor: '#FFFFFF',
    boxShadow: '0 2 8 0 rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    position: 'absolute',
    top: '49%',
    right: '35%',
    elevation: 20,
    shadowColor: '#52006A',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default AddTeam;
