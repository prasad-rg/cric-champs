import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {setIsEdit} from '../redux/manageTournamentSlice';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {
  deleteIndividualPlayer,
  deleteTeam,
} from '../services/manageTournament2';
import {StackActions} from '@react-navigation/native';
import {setEditEntity} from '../redux/manageTournamentSlice';
import Toast from 'react-native-simple-toast';
// import {SafeAreaView} from 'react-native-safe-area-context';

const AppBar = ({
  navigation,
  title = 'Player Profile',
  style = {},
  iconTint = {},
  profilePictureUri,
  playerId,
  umpireId,
  type,
  isView,
}) => {
  const dispatch = useDispatch();
  const tournamentId = useSelector(
    state => state.tournamentdata.tournamentdata.tournamentid,
  );

  const teamId = useSelector(state => state.tournamentdata.teamId);
  const isEdit = useSelector(state => state.tournamentdata.isEdit);
  const editEntity = useSelector(state => state.tournamentdata.editEntity);

  const handleEditPlayer = () => {
    navigation.dispatch(
      StackActions.push('EditPlayers', {
        playerLogo: profilePictureUri,
        playerName: title,
        playerId: playerId,
      }),
    );
    dispatch(setIsEdit(false));
    dispatch(setEditEntity(true));
  };

  const deletePlayers = async () => {
    const data = {
      tournamentId: tournamentId,
      playerId: playerId,
    };
    const response = await deleteIndividualPlayer(data);
    console.log(response);
    if (response.status) {
      navigation.pop(1);
    } else {
      Toast.show('Something went wrong, Please try again 😭');
    }
  };

  const handleDeletePlayer = () => {
    Alert.alert(
      'Are your sure?',
      'Are you sure you want to remove this player?',
      [
        {
          text: 'Yes',
          onPress: () => {
            deletePlayers();
          },
        },

        {
          text: 'No',
        },
      ],
    );
  };

  const handleEditUmpire = () => {
    navigation.dispatch(
      StackActions.push('AddUmpire', {
        umpireLogo: profilePictureUri,
        umpireName: title,
        umpireId: umpireId,
      }),
    );
    dispatch(setIsEdit(false));
    dispatch(setEditEntity(true));
  };

  const deleteUmpire = async () => {
    const data = {
      tournamentId: tournamentId,
      playerId: umpireId,
    };
    const response = await deleteIndividualPlayer(data);
    if (response.status) {
      navigation.pop(1);
    } else {
      Toast.show('Something went wrong, Please try again 😭');
    }
  };

  const handleDeleteUmpire = () => {
    Alert.alert(
      'Are your sure?',
      'Are you sure you want to remove this umpire?',
      [
        {
          text: 'Yes',
          onPress: () => {
            deleteUmpire();
          },
        },

        {
          text: 'No',
        },
      ],
    );
  };

  return (
    <View style={[styles.appBar, {...style}]}>
      <SafeAreaView>
        <View style={styles.header}>
          <View style={styles.leftHeader}>
            {editEntity && type == 'addplayer' ? (
              <TouchableOpacity
                onPress={() => {
                  dispatch(setEditEntity(false));
                  dispatch(setIsEdit(false));
                  navigation.goBack();
                }}>
                <Image
                  source={require('../../assets/images/back.png')}
                  style={[styles.backIcon, {...iconTint}]}
                />
              </TouchableOpacity>
            ) : !editEntity && type == 'addplayerinedit' ? (
              <TouchableOpacity
                onPress={() => {
                  dispatch(setIsEdit(true));
                  navigation.pop();
                }}>
                <Image
                  source={require('../../assets/images/back.png')}
                  style={[styles.backIcon, {...iconTint}]}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  // dispatch(setIsEdit(false));
                  // dispatch(setEditEntity(false));
                  navigation.goBack();
                }}>
                <Image
                  source={require('../../assets/images/back.png')}
                  style={[styles.backIcon, {...iconTint}]}
                />
              </TouchableOpacity>
            )}
            <Text style={styles.text}>{title}</Text>
          </View>
          {isView ? null : (
            <View>
              {isEdit && type == 'umpire' ? (
                <View style={styles.rightHeader}>
                  <TouchableOpacity onPress={handleEditUmpire}>
                    <Image
                      source={require('../../assets/images/pencil.png')}
                      style={{
                        tintColor: '#FFFFFF',
                        height: 25,
                        width: 25,
                        marginRight: 23,
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleDeleteUmpire}>
                    <Image
                      source={require('../../assets/images/trash.png')}
                      style={{
                        tintColor: '#FFFFFF',
                        height: 25,
                        width: 25,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ) : isEdit && type == 'player' ? (
                <View style={styles.rightHeader}>
                  <TouchableOpacity onPress={handleEditPlayer}>
                    <Image
                      source={require('../../assets/images/pencil.png')}
                      style={{
                        tintColor: '#FFFFFF',
                        height: 25,
                        width: 25,
                        marginRight: 23,
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleDeletePlayer}>
                    <Image
                      source={require('../../assets/images/trash.png')}
                      style={{
                        tintColor: '#FFFFFF',
                        height: 25,
                        width: 25,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ) : isEdit && type == 'addplayerinedit' ? (
                <View style={styles.rightHeader}>
                  <TouchableOpacity onPress={handleEditPlayer}>
                    <Image
                      source={require('../../assets/images/pencil.png')}
                      style={{
                        tintColor: '#FFFFFF',
                        height: 25,
                        width: 25,
                        marginRight: 23,
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleDeletePlayer}>
                    <Image
                      source={require('../../assets/images/trash.png')}
                      style={{
                        tintColor: '#FFFFFF',
                        height: 25,
                        width: 25,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    width: '100%',
    backgroundColor: '#0E85FF',
    paddingHorizontal: 16,
  },
  backIcon: {
    tintColor: '#FFFFFF',
    width: 16,
    height: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 11,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  text: {
    marginLeft: 32,
    color: 'rgba(255,255,255,0.87)',
    fontFamily: 'Roboto-Medium',
    lineHeight: 28,
    fontSize: 20,
  },
  rightHeader: {
    flexDirection: 'row',
  },
  leftHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppBar;
