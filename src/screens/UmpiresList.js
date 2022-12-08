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
import React, {useLayoutEffect, useState} from 'react';
import GradientButton from '../components/GradientButton';
import TeamListName from '../components/TeamListName';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {getUmpiresByTournamentId} from '../services/viewTournament';
import {setIsEdit} from '../redux/manageTournamentSlice';

const UmpiresList = ({navigation, route}) => {
  const [currentUmpires, setCurrentUmpires] = useState([]);

  const dispatch = useDispatch();
  const tournamentId = useSelector(
    state => state.tournamentdata.tournamentdata.tournamentid,
  );

  const loadUmpires = async () => {
    const response = await getUmpiresByTournamentId(tournamentId);
    if (response.status) {
      setCurrentUmpires(response.data);
    }
  };

  const focus = useIsFocused();
  useLayoutEffect(() => {
    if (focus == true) {
      loadUmpires();
    }
  }, [focus]);

  const handlePress = () => {
    navigation.navigate('DateScreen');
  };

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
                  <View style={styles.leftHeader}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <Image
                        source={require('../../assets/images/backicon.png')}
                        style={styles.backButtonImage}
                      />
                    </TouchableOpacity>
                    <Text style={styles.umpireText}>Umpires</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.umpireButton}
                  onPress={() => navigation.navigate('AddUmpire')}>
                  <Text style={styles.addumpireText}>ADD UMPIRE</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </View>
        </ImageBackground>
        <View style={styles.secondView}>
          <Text style={styles.umpire}>Umpires</Text>
          {currentUmpires.length === 0 ? (
            <View style={styles.nogroundview}>
              <Text style={styles.nogrounds}>No Umpires Added Yet!</Text>
            </View>
          ) : (
            <View>
              {currentUmpires.map(value => (
                <View key={value?._id}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('UmpireProfile', {
                        umpireId: value._id,
                        umpireName: value.name,
                        umpirePicture: value.profilePic.url,
                        setIsEdit: dispatch(setIsEdit(true)),
                        isManage:route?.params?.isManage,
                      })
                    }>
                    <TeamListName
                      source={value?.profilePic.url}
                      text={value?.name}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
      <View style={{marginBottom: Platform.OS === 'ios' ? 10 : 0}}>
        {route.params?.isManage ? (
          <GradientButton
            start={{x: 0, y: 0}}
            end={{x: 2, y: 0}}
            colors={['#FFBA8C', '#FE5C6A']}
            text="OK"
            style={{height: 48, width: '100%', marginTop: 0}}
            textstyle={{
              height: 16,
              fontWeight: '500',
              fontSize: 14,
              letterSpacing: 0.5,
              lineHeight: 19,
            }}
            onPress={() => navigation.goBack()}
          />
        ) : (
          <GradientButton
            start={{x: 0, y: 0}}
            end={{x: 2, y: 0}}
            colors={
              currentUmpires.length === 0
                ? ['#999999', '#999999']
                : ['#FFBA8C', '#FE5C6A']
            }
            text="PROCEED"
            style={{height: 50, width: '100%', marginTop: 0}}
            textstyle={{
              height: 16,
              fontWeight: '500',
              fontSize: 14,
              letterSpacing: 0.5,
              lineHeight: 19,
            }}
            onPress={currentUmpires.length === 0 ? null : handlePress}
          />
        )}
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
    justifyContent: 'space-between',
  },
  addumpireText: {
    height: 14,
    // width: 60,
    color: '#FFFFFF',
    fontFamily: 'Roboto-Medium',
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
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
    margin: 20,
  },
  secondView: {
    height: '100%',
    backgroundColor: 'rgba(217,226,233,0.5)',
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
  nogroundview: {
    alignItems: 'center',
  },
  nogrounds: {
    height: 24,
    // width: 200,
    color: '#A3A3A3',
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 24,
    marginTop: 18,
    textAlign: 'center',
  },
  rightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftHeader: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
