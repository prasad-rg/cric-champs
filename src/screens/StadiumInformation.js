import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Dimensions,
  ScrollView,
  Text,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import GradientButton from '../components/GradientButton';
import {useSelector} from 'react-redux';
import {getGroundDetailByGroundIdAndTournamentId} from '../services/viewTournament';
import {setEditEntity, setIsEdit} from '../redux/manageTournamentSlice';
import {useDispatch} from 'react-redux';
import {StackActions} from '@react-navigation/native';
import {deleteParticularGround} from '../services/manageTournament2';
// const images = [
//   'https://cdn.pixabay.com/photo/2016/11/29/02/05/audience-1866738_1280.jpg',
//   'https://cdn.pixabay.com/photo/2016/11/29/07/06/bleachers-1867992_1280.jpg',
//   'https://cdn.pixabay.com/photo/2015/03/07/10/00/cricket-662956_1280.jpg',
// ];

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const StadiumInformation = ({navigation, route}) => {
  const isView = useSelector(state => state.tournamentdata.isView);

  const [imgActive, setimgActive] = useState(0);
  const [currentStadiumInformation, setCurrentStadiumInformation] =
    useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {tournamentDetails} = useSelector(state => state.tournamentDetails);
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const loadStadiumInformation = async () => {
    setIsLoading(true);
    const response = await getGroundDetailByGroundIdAndTournamentId(
      route.params.groundId,
      tournamentDetails._id,
    );
    setIsLoading(false);
    if (response.status) {
      setCurrentStadiumInformation(response.data);
      setImages([response.data.grounds[0].groundPic.url]);
    }
  };

  const getMatchString = matchArray => {
    let matchString = '';
    for (let match of matchArray) {
      matchString += 'Match ' + match.matchNumber + ', ';
    }
    return matchString;
  };

  let onchange = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide !== imgActive) {
        setimgActive(slide);
      }
    }
  };

  const handleEdit = () => {
    dispatch(setIsEdit(false));
    dispatch(setEditEntity(true));
    navigation.dispatch(
      StackActions.push('AddGround', {
        groundName: route.params.groundName,
        groundImage: images,
        groundId: route.params.groundId,
      }),
    );
  };

  const deleteGround = async () => {
    const data = {
      tournamentId: tournamentDetails._id,
      groundId: route.params.groundId,
    };
    // console.log(data);
    const response = await deleteParticularGround(data);
    // console.log(response);
    if (response.status) {
      navigation.pop(1);
    } else {
      console.log('Cannot Delete, Something went wrong');
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
            deleteGround();
          },
        },

        {
          text: 'No',
        },
      ],
    );
  };

  const stadiumDetails = [
    {
      id: 1,
      title: 'City',
      value:
        currentStadiumInformation !== null &&
        currentStadiumInformation?.grounds[0]?.city,
    },
    {
      id: 2,
      title: 'Location',
      value:
        currentStadiumInformation !== null &&
        currentStadiumInformation?.grounds[0]?.city,
    },
    {
      id: 3,
      title: 'Matches',
      value:
        currentStadiumInformation !== null &&
        getMatchString(currentStadiumInformation?.match),
    },
  ];
  useEffect(() => {
    loadStadiumInformation();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={loadStadiumInformation}
          />
        }>
        <View style={styles.backgroundBeyondSafeArea}>
          <SafeAreaView>
            <View style={styles.profileDetailsContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    // justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                      source={require('../../assets/images/backicon.png')}
                      style={{ 
                        height: 20,
                        width: 20,
                        marginTop:2.5
                      }}
                    />
                  </TouchableOpacity>
                  <Text style={styles.stadiumName}>
                    {route.params.groundName}
                  </Text>
                </View>
                {isView ? null : (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity onPress={handleEdit}>
                      <Image
                        source={require('../../assets/images/pencil.png')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDelete}>
                      <Image
                        source={require('../../assets/images/trash.png')}
                        style={{marginHorizontal: '5%'}}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </SafeAreaView>
        </View>
        <View style={styles.wrap}>
          <ScrollView
            onScrollBeginDrag={({nativeEvent}) => onchange(nativeEvent)}
            showsHorizontalScrollIndicator={false}
            paddingEnabled
            horizontal
            style={styles.wrap}>
            {images.map((item, index) => (
              <Image
                key={item}
                resizeMode="stretch"
                style={styles.wrap}
                source={{uri: item}}
              />
            ))}
          </ScrollView>
          {/* <View style={styles.dotWrap}>
            {images.map((item, index) => (
              <Text
                key={item}
                style={imgActive == index ? styles.dotActive : styles.dot}>
                ●
              </Text>
            ))}
          </View> */}
        </View>
        {stadiumDetails.map(item => (
          <View key={item.id} style={styles.listview}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={{marginBottom: Platform.OS === 'ios' ? 20 : 0}}>
        <GradientButton
          start={{x: 0, y: 0}}
          end={{x: 2, y: 0}}
          colors={['#FFBA8C', '#FE5C6A']}
          text="GET DIRECTION"
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

export default StadiumInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileDetailsContainer: {
    height: 37,
    marginTop: 15,
  },
  backgroundBeyondSafeArea: {
    backgroundColor: 'rgba(0, 102, 226, 1)',
    paddingRight: 20,
    paddingLeft: 20,
  },
  stadiumName: {
    // height: 24,
    // color: '#FFFFFF',
    // fontFamily: 'Roboto-Medium',
    // fontSize: 20,
    // fontWeight: '500',
    // letterSpacing: 0,
    // lineHeight: 24,
    // marginHorizontal: '7%',
    height: 24,
    width: 100,
    color: 'rgba(255,255,255,0.87)',
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 24,
    marginLeft: 40,
    // marginBottom:30
  },
  wrap: {
    width: WIDTH,
    height: HEIGHT * 0.25,
  },
  dotWrap: {
    position: 'absolute',
    bottom: 15,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotActive: {
    margin: 3,
    color: 'orange',
  },
  dot: {
    // height:2,
    // width:2,
    margin: 3,
    color: 'orange',
    opacity: 0.6,
  },
  listview: {
    padding: 20,
    flexDirection: 'row',
    // flexWrap: 'wrap',
    // borderWidth: 1,
  },
  title: {
    height: 24,

    color: 'rgba(77,77,77,0.87)',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 24,
  },
  value: {
    // height: 24,
    width: '50%',
    color: 'rgba(77,77,77,0.87)',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 24,
    marginLeft: 'auto',
    // flexShrink: 1,
    // textAlign: 'left',
  },
});
