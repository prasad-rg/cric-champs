import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {getTournamentByCode} from '../services/viewTournament';
import {storeTournamentDetails} from '../redux/viewTournamentSlice';
import {
  removeRecentActivities,
  storeRecentActivities,
} from '../redux/recentActivitiesSlice';
import {setTournamentData} from '../redux/manageTournamentSlice';
import {setIsView} from '../redux/manageTournamentSlice';

const RecentActivityCard = ({
  title = 'Robosoft Premiere League',
  matchCode = '85B68E',
  status = 'IN PROGRESS',
  isAdmin = true,
  onPress,
  tournamentId,
  navigation,
  id,
  isView,
  isManage = false,
}) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.machCodeText}>{matchCode}</Text>
        </View>
        {!isManage && (
          <TouchableOpacity
            onPress={() => dispatch(removeRecentActivities(id))}>
            <Image
              source={require('../../assets/images/icon-vertical-dots.png')}
              style={styles.verticalDots}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.footer}>
        <View
          style={
            status === 'IN PROGRESS'
              ? styles.badge
              : [styles.badge, styles.statusCompleted]
          }>
          <Text style={styles.badgeText}>{status}</Text>
        </View>
        {isAdmin && (
          <TouchableOpacity
            onPress={async () => {
              const res = await getTournamentByCode(matchCode);
              if (res?.status === false) {
                Alert.alert(res.message.toUpperCase());
              } else {
                dispatch(storeTournamentDetails(res));
                const {code, _id, userId, name, email} = res;
                const tournamentresponse = {
                  code: code,
                  tournamentid: _id,
                  userId: userId,
                  name: name,
                  email: email,
                };
                dispatch(setTournamentData(tournamentresponse));
                dispatch(storeRecentActivities(res._id));
                dispatch(setIsView(false));
                navigation.navigate('ManageScreen');
              }
            }}>
            <Text style={styles.actionText}>MANAGE</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={async () => {
            const res = await getTournamentByCode(matchCode);
            if (res?.status === false) {
              Alert.alert(res.message.toUpperCase());
            } else {
              dispatch(storeTournamentDetails(res));
              dispatch(storeRecentActivities(res._id));
              navigation.navigate('ViewScreen');
            }
          }}>
          <Text style={[styles.actionText, styles.textMarginRight]}>VIEW</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 134,
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    paddingLeft: 20,
    borderRadius: 10,
    paddingRight: 14,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    lineHeight: 18,
    color: '#000000',
  },
  badge: {
    width: 90,
    height: 22,
    backgroundColor: '#B8E986',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontFamily: 'Roboto-Black',
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 11,
  },
  machCodeText: {
    fontFamily: 'Roboto-Regular',
    color: '#A6A6A6',
    marginTop: 2,
    fontSize: 13,
    lineHeight: 15,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 13,
    lineHeight: 15,
    color: '#4A90E2',
    letterSpacing: 0.19,
  },
  textMarginRight: {
    marginRight: 25,
  },
  verticalDots: {
    width: 12,
    height: 24,
    tintColor: 'rgba(112, 112, 112, 0.5)',
    marginRight: 5,
  },
  statusCompleted: {
    backgroundColor: '#FFBA7F',
  },
});

export default RecentActivityCard;
