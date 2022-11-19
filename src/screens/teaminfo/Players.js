import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';

const Players = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <View style={styles.container}>
        <TouchableOpacity>
          <View style={styles.addButton}>
            <Text style={styles.addTeamText}>ADD PLAYER</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.mainView}>
        <Text style={styles.players}>Players</Text>
      </View>
    </ScrollView>
  );
};

export default Players;

const styles = StyleSheet.create({
  container: {
    // flex:1,
    height: 80,
    width: '100%',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainView: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  addTeamText: {
    height: 14,
    color: '#4A90E2',
    fontFamily: 'Roboto-Medium',
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
    borderColor: '#4A90E2',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  players: {
    height: 16,
    // width: 47,
    color: '#8E9BA8',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
    padding: 17,
  },
});
