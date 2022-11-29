import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
  TouchableOpacity,
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

const AppBar = ({
  navigation,
  title = 'Player Profile',
  style = {},
  iconTint = {},
  profilePictureUri,
  playerId,
}) => {
  const dispatch = useDispatch();
  const tournamentId = useSelector(
    state => state.tournamentdata.tournamentdata.tournamentid,
  );
  const teamId = useSelector(state => state.tournamentdata.teamId);
  const isEdit = useSelector(state => state.tournamentdata.isEdit);
  const editEntity = useSelector(state => state.tournamentdata.editEntity);

  // const tournamentdata = useSelector(state => state.tournamentdata.tournamentdata);
  // console.log(profilePictureUri,title)

  const handleEdit = () => {
    navigation.dispatch(
      StackActions.push('AddPlayer', {
        playerLogo: profilePictureUri,
        playerName: title,
        playerId: playerId,
        // teamLogo: route?.params.teamLogo,
        // teamName: route?.params.teamName,
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
    if (response.status){
      navigation.pop(1)
    }else{
      console.log("Cannot Delete, Something went wrong")
    }
  };

  const handleDelete = () => {
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

  return (
    <View style={[styles.appBar, {...style}]}>
      <SafeAreaView>
        <View style={styles.header}>
          <View style={styles.leftHeader}>
            {editEntity ? (
              <TouchableOpacity
                onPress={() => {
                  dispatch(setEditEntity(false));
                  dispatch(setIsEdit(true));
                  navigation.goBack();
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
          {isEdit ? (
            <View style={styles.rightHeader}>
              <TouchableOpacity onPress={handleEdit}>
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
              <TouchableOpacity onPress={handleDelete}>
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
