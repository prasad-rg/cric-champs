import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {getStatsByTournamentId} from '../services/viewTournament';
import {useSelector} from 'react-redux';

const ListItem = ({title, bodyText, styleDropText = {}, query, itemObject}) => {
  const [stats, setStats] = useState('');
  const {tournamentDetails} = useSelector(state => state.tournamentDetails);
  const getStatsByQuery = async query => {
    const response = await getStatsByTournamentId(
      '638090ddc3ab2708e617df5f',
      query,
    );
    return response;
  };
  const [showContent, setShowContent] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={async () => {
          let receivedStats = await getStatsByQuery(query);
          if (receivedStats.status) {
            setStats(receivedStats.data.stats[0]);
            console.info(receivedStats.data.stats);
          }
          setShowContent(!showContent);
        }}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
      {showContent && (
        <View>
          <Text style={[styles.bodyText, styleDropText]}>{stats?.name}</Text>
          <Text style={[styles.bodyText, styleDropText]}>
            {`${itemObject.value[0]}: ${Math.round(stats[itemObject?.variables[0]]*100)/100}`}
          </Text>
          <Text style={[styles.bodyText, styleDropText]}>{`${
            itemObject.value[1]
          }: ${stats[itemObject?.variables[1]]}`}</Text>

          {itemObject.value.length > 2 && (
            <Text style={[styles.bodyText, styleDropText]}>{`${
              itemObject.value[2]
            }: ${stats[itemObject?.variables[2]]}`}</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
    borderRadius: 3,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop:0.5,
  },
  title: {
    borderColor: 'rgba(217,226,233,0.5)',
    color: '#383838',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    letterSpacing: 0,
    lineHeight: 24,
  },

  bodyText: {
    color: '#383838',
    fontFamily: 'Roboto-Light',
    fontSize: 16,
    letterSpacing: 0,
    paddingVertical: 7,

  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

