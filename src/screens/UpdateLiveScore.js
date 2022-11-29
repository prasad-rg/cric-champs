import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Button,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import CustomChooseModal from '../components/CustomChooseModal';
import DotBall from '../components/DotBall';
import GradientButton from '../components/GradientButton';
import RadioButton from '../components/RadioButton';
import CustomRadioButton from '../components/CustomRadioButton';
import CustomExtrasButton from '../components/CustomExtrasButton';
import CustomModal from '../components/CustomModal';
import StopMatchModal from '../components/StopMatchModal';
import CustomRunsButton from '../components/CustomRunsButton';

const UpdateLiveScore = () => {
  const [tournamenttype, setTournamentType] = useState('');


  const getData = (data, index) => {
    setTournamentType(data);
   
  };
  const Details = [
    {
      id: 1,
      title: 'Sashikant D',
    },
    {
      id: 2,
      title: 'Subham B (c)',
    },
    {
      id: 3,
      title: 'Prathik D',
    },
    {
      id: 4,
      title: 'Rahul M',
    },
    {
      id: 5,
      title: 'Prashanth P',
    },
    {
      id: 6,
      title: 'Vipin M',
    },
  ];

  const Reason = [
    {
      id: 1,
      title: 'UDL Strikers didnt show Up',
    },
    {
      id: 2,
      title: 'Paras XI didnt show up',
    },
    {
      id: 3,
      title: 'Bad Weather',
    },
    {
      id: 4,
      title: 'Other',
    },
  ];

  const radio_props = [
    {label: 'Hit Wicket', value: 'Hit Wicket', id: 0},
    {label: 'Stumped', value: 'Stumped', id: 1},
    {label: 'Run Out', value: 'Run Out', id: 2},
    {label: 'Bowled', value: 'Bowled', id: 3},
    {label: 'LBW', value: 'LBW', id: 4},
    {label: 'Caught', value: 'Caught', id: 5},
    {label: 'Other', value: 'Other', id: 6},
  ];
  const run_props = [
    {label: '0', value: '0', id: 0},
    {label: '1', value: '1', id: 1},
    {label: '2', value: '2', id: 2},
    {label: '3', value: '3', id: 3},
    {label: '4', value: '4', id: 4},
    {label: '6', value: '6', id: 5},
  ];
  const extra_props = [
    {label: 'Wd', value: 'Wd', id: 0},
    {label: 'Nb', value: 'Nb', id: 1},
    {label: 'Bye', value: 'Bye', id: 2},
    {label: 'Lb', value: 'Lb', id: 3},
  ];
  const [visible, setVisible] = useState({
    stopModal: false,
     customChooseModal: false,
  });

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.backgroundBeyondSafeArea}>
          <SafeAreaView>
            <View style={styles.profileDetailsContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity>
                    <Image
                      source={require('../../assets/images/goback.png')}
                      style={{height: 20, width: 20}}
                    />
                  </TouchableOpacity>
                  <Text style={styles.headerName}>Update Live Score</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    onPress={() => setVisible({...visible, stopModal: true})}>
                    <Image
                      source={require('../../assets/images/icon-vertical-dots.png')}
                      style={{
                        marginHorizontal: '-1%',
                        tintColor: '#FFFFFF',
                        height: 25,
                        width: 25,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </View>
        {/* start */}
        <View style={styles.infoView}>
          <View style={{padding: 15}}>
            <Text style={styles.comment}>Balls.runs.wicket</Text>
            {/* <DotBall style={{backgroundColor:"rgba(0,0,0,0.2)"}}/> */}
            <Text style={styles.runs}>6 runs</Text>
          </View>
          <View style={{padding: 15}}>
            <Text style={styles.overText}>5.5 Overs</Text>
            <Text style={styles.overNumber}>10/1</Text>
          </View>
        </View>
        <CustomChooseModal
          visible={visible.customChooseModal}
          onPress={() =>
            setVisible({customChooseModal: false, stopModal: false})
          }>
          <Text style={styles.textView}>Choose Reason</Text>
          {Reason.map(item => (
            <View key={item.id} style={styles.listview}>
              <TouchableOpacity
                onPress={() =>
                  setVisible({customChooseModal: false, stopModal: false})
                }>
                <View style={{width: '100%'}}>
                  <Text style={styles.title}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </CustomChooseModal>
        <View style={styles.mainView}>
          <View style={{width: '58%'}}>
            <Text style={styles.runs}>Runs</Text>
            <CustomRunsButton   
              radio_props={run_props}
              formHorizontal={true}
              style={{
                marginRight: 15,
                width: 50,
                height: 50,
                borderRadius: 25,
                marginHorizontal: 2,
                marginTop: 15,
              }}
              flexWrap={{flexWrap: 'wrap'}}
              onPress={getData}
            />
          </View>
          <View style={{width: '42%'}}>
            <Text style={styles.extras}>Extras</Text>
            <CustomExtrasButton
              radio_props={extra_props}
              formHorizontal={true}
              style={{
                marginRight: 7,
                width: 50,
                height: 50,
                borderRadius: 25,
                marginHorizontal: 15,
                marginTop: 15,
                borderColor: '#FF8713',
              }}
              flexWrap={{flexWrap: 'wrap'}}
              onPress={getData}
            />
          </View>
        </View>
        <View style={{marginTop:20}}>
          <Text style={styles.wickets}>Wickets</Text>
        </View>
        <View
          style={{
            marginHorizontal: 10,
            padding: 20,
          }}>
          <CustomRadioButton
            radio_props={radio_props}
            formHorizontal={true}
            style={{
              marginRight: 17.5,
              marginBottom: 15,
              borderWidth: 1,
              width: 'auto',
            }}
            flexWrap={{flexWrap: 'wrap'}}
            onPress={getData}
          />
        </View>
      </ScrollView>
      <StopMatchModal visible={visible.stopModal}>
        <TouchableOpacity
          onPress={() =>
            setVisible({customChooseModal: true, stopModal: false})
          }>
          <Text>Stop Match</Text>
        </TouchableOpacity>
      </StopMatchModal>
      <View style={{marginBottom: Platform.OS === 'ios' ? 20 : 0}}>
        <GradientButton
          start={{x: 0, y: 0}}
          end={{x: 2, y: 0}}
          colors={['#FFBA8C', '#FE5C6A']}
          text="UPDATE"
          style={{height: 50, width: '100%', marginTop: 0}}
          textstyle={{
            height: 16,
            fontWeight: '500',
            fontSize: 14,
            letterSpacing: 0.5,
            lineHeight: 19,
          }}
        />
      </View>
    </View>
  );
};

export default UpdateLiveScore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileDetailsContainer: {
    height: 40,
    marginTop: 15,
  },
  backgroundBeyondSafeArea: {
    backgroundColor: 'rgba(0, 102, 226, 1)',
    paddingRight: 20,
    paddingLeft: 20,
  },
  headerName: {
    height: 24,
    width: 188,
    color: '#FFFFFF',
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 24,
    marginHorizontal: '10%',
  },
  overText: {
    height: 14,
    width: 51,
    color: 'rgba(0,0,0,0.54)',
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    letterSpacing: 0,
    lineHeight: 14,
    textAlign: 'right',
  },
  overNumber: {
    height: 16,
    width: 30,
    color: 'rgba(0,0,0,0.54)',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
    textAlign: 'right',
    marginTop: 5,
  },
  mainView: {
    padding: 20,
    flexDirection: 'row',
    height: 220,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: 0.3,
  },
  runs: {
    height: 21,
    // width: 38,
    color: 'rgba(0,0,0,0.87)',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 19,
  },
  extras: {
    height: 21,
    // width: 38,
    color: 'rgba(0,0,0,0.87)',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 19,
    marginHorizontal: '10%',
  },
  wickets: {
    height: 21,
    // width: 38,
    color: 'rgba(0,0,0,0.87)',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 19,
    paddingHorizontal:20,

  },

  //   csd

  textView: {
    height: 18,
    // width: 108,
    color: 'rgba(0,0,0,0.87)',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    letterSpacing: 0,
    fontWeight: '500',
    lineHeight: 19,
    textAlign: 'center',
    // alignItems:"center",
    // justifyContent:"center",
    marginTop: 10,
  },
  infoView: {
    height: 70,
    width: '100%',
    borderBottomColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  listview: {
    top: 15,
    flexDirection: 'row',
  },
  title: {
    height: 50,
    width: 310.1,
    borderWidth: 0.2,
    borderColor: 'rgba(0,0,0,0.1)',
    color: 'rgba(77,77,77,0.87)',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 24,
    padding: 15,
  },
  image: {
    height: 13,
    width: 13,
    tintColor: '#000000',
  },
});
