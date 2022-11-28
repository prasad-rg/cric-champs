import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserActions from '../components/UserActions';
import {getUserDetails, logoutUser} from '../services/auth';
import {useDispatch, useSelector} from 'react-redux';
import {addUser} from '../redux/userSlice';
import {logout, userLogout} from '../redux/authSlice';

const UserControl = ({navigation}) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoading, setIsLodaing] = useState(false);
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.userData);
  const {isLoggedIn} = useSelector(state => state.auth);

  useEffect(() => {
    const getUserInfo = async () => {
      setIsLodaing(true);
      const userInfo = await getUserDetails();
      if (userInfo._id) {
        setIsLodaing(false);
        // setUserData(userInfo);
        dispatch(addUser(userInfo));
      }
      console.warn(userInfo);
    };
    getUserInfo();
  }, [isLoggedIn]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/dhoni.jpeg')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <View style={styles.backgroundBeyondSafeArea}>
          <SafeAreaView>
            <View style={styles.profileDetailsContainer}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => navigation.goBack()}>
                <Image
                  source={require('../../assets/images/icon-close.png')}
                  style={styles.closeButtonImage}
                />
              </TouchableOpacity>
              <View style={styles.profileView}>
                {isLoggedIn ? (
                  isLoading ? (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                      }}>
                      <ActivityIndicator
                        size={'small'}
                        color="rgba(255, 255, 255, 0.4)"
                      />
                    </View>
                  ) : (
                    <>
                      <Image
                        source={{uri: userData?.profilePic?.url}}
                        style={styles.avatar}
                      />
                      <View style={styles.textContainer}>
                        <Text style={styles.nameText}>{userData?.name}</Text>
                        <Text style={styles.emailText}>{userData?.email}</Text>
                      </View>
                    </>
                  )
                ) : (
                  <>
                    <Image
                      source={require('../../assets/images/loginLogo.png')}
                      style={[styles.avatar, {tintColor: '#FFFFFF'}]}
                    />
                    <View style={styles.textContainer}>
                      <Text
                        style={[
                          styles.nameText,
                          {fontSize: 25, lineHeight: 28},
                        ]}>
                        Cric Champs
                      </Text>
                    </View>
                  </>
                )}
              </View>
            </View>
          </SafeAreaView>
        </View>
      </ImageBackground>
      <ScrollView style={styles.listContainer}>
        <UserActions />
        <UserActions
          imageSource={require('../../assets/images/cricketTournament.png')}
          title="Create Tournament"
          tintColor={isLoggedIn ? undefined : 'rgba(105, 105, 105, 0.9)'}
        />
        <UserActions
          title="Manage Tournament"
          imageSource={require('../../assets/images/cap.png')}
          tintColor={isLoggedIn ? undefined : 'rgba(105, 105, 105, 0.9)'}
        />
        <UserActions
          title="View Tournament"
          imageSource={require('../../assets/images/glasses.png')}
          onPress={() => navigation.navigate('ViewScreen')}
        />
        <View style={styles.line} />
        <TouchableOpacity>
          <Text style={styles.text}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>Feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>Rate App</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>Share App</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>Help & FAQs</Text>
        </TouchableOpacity>
      </ScrollView>
      <SafeAreaView>
        {isLoggedIn ? (
          <TouchableOpacity
            style={styles.logout}
            onPress={async () => {
              const res = await logoutUser();
              if (res.status) {
                dispatch(logout());
              }
              dispatch(logout());
            }}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.logout}
            onPress={() => navigation.navigate('AuthStack')}>
            <Text style={styles.logoutText}>Login</Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileDetailsContainer: {
    height: 117,
  },
  closeButton: {
    alignItems: 'flex-end',
    paddingLeft: 16,
    marginTop: 10,
  },
  closeButtonImage: {
    width: 14,
    height: 14,
  },
  backgroundBeyondSafeArea: {
    backgroundColor: 'rgba(0, 102, 226, 0.85)',
    paddingRight: 20,
    paddingLeft: 20,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 50,
  },
  nameText: {
    fontFamily: 'Roboto-Medium',
    color: '#DEEBFB',
    fontSize: 14,
    lineHeight: 16,
  },
  profileView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 20,
  },
  emailText: {
    color: 'rgba(236, 239, 241, 0.5)',
    fontSize: 12,
    lineHeight: 14,
  },
  listContainer: {
    padding: 28,
    paddingTop: 17,
  },
  line: {
    borderWidth: 1,
    borderColor: '#EEF1F4',
  },
  text: {
    fontSize: 14,
    lineHeight: 16,
    color: 'rgba(0,0,0,0.87)',
    marginTop: 25,
  },
  logout: {
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    height: 48,
    width: '100%',
    paddingLeft: 28,
  },
  logoutText: {
    fontSize: 14,
    lineHeight: 16,
    color: 'rgba(0,0,0,0.87)',
  },
});

export default UserControl;
