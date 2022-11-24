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
import React, {useLayoutEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';

import TeamListName from '../components/TeamListName';
import GradientButton from '../components/GradientButton';
import {getTeamsByTournamentId} from '../services/viewTournament';

import {useSelector} from 'react-redux';
const TeamsList = ({navigation}) => {
  const [currentTeams, setCurrentTeams] = useState([]);

  const tournamentId = useSelector(
    state => state.tournamentdata.tournamentdata.tournamentid,
  );

  const loadTeams = async () => {
    const response = await getTeamsByTournamentId(tournamentId);
    if (response.status) {
      setCurrentTeams(response.data);
    }
  };
  const focus = useIsFocused();
  useLayoutEffect(() => {
    if (focus == true) {
      loadTeams();
    }
  }, [focus]);

  const [team, setTeam] = useState(true);
  const handleBack = () => {
    navigation.goBack();
  };
  const handlePress = () => {
    navigation.navigate('OversScreen');
  };
  const handleTeam = () => {
    navigation.navigate('AddTeam');
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground
          source={require('../../assets/images/cricketTeam.png')}
          resizeMode="cover">
          <View style={styles.backgroundBeyondSafeArea}>
            <SafeAreaView>
              <View style={styles.profileDetailsContainer}>
                <View style={styles.headerText}>
                  <TouchableOpacity onPress={handleBack}>
                    <Image
                      source={require('../../assets/images/backicon.png')}
                      style={styles.backButtonImage}
                    />
                  </TouchableOpacity>
                  <Text style={styles.teamText}>Teams List</Text>
                </View>

                <TouchableOpacity style={styles.addButton} onPress={handleTeam}>
                  <Text style={styles.addTeamText}>ADD TEAM</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </View>
        </ImageBackground>
        <View style={styles.secondView}>
          <Text style={styles.teams}>Teams</Text>

          {!team ? (
            <View>
              <Text style={styles.noteam}>No Teams Added Yet!</Text>
            </View>
          ) : (
            <View style={styles.teamsView}>
              {currentTeams.map(team => (
                <View key={team._id}>
                  <TeamListName source={team.logo.url} text={team.name} />
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
      <View style={{marginBottom: Platform.OS === 'ios' ? 20 : 0}}>
        <GradientButton
          start={{x: 0, y: 0}}
          end={{x: 2, y: 0}}
          colors={!team ? ['#999999', '#999999'] : ['#FFBA8C', '#FE5C6A']}
          text="PROCEED"
          style={{height: 48, width: '100%', marginTop: 0}}
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

export default TeamsList;

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
  teamText: {
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
  },
  addTeamText: {
    height: 14,
    width: 60,
    color: '#FFFFFF',
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 14,

    alignSelf: 'center',
  },
  addButton: {
    height: 42,
    width: 210,
    borderWidth: 2,
    borderRadius: 20,

    borderColor: '#FFFFFF',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 180,
  },
  teams: {
    height: 16,
    color: '#8E9BA8',
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
    margin: 20,
  },
  secondView: {
    flex: 1,
  },
  teamsView: {
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
  noteam: {
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
