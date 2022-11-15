import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
  Image,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import AppBar from './AppBar';

const AddProfileDetails = ({
  navigation,
  children,
  profilePictureUri = '',
  backroundImageUri = '',
  title = 'Register',
}) => {
  const {width, height} = useWindowDimensions();
  return (
    <View style={styles.container}>
      <ImageBackground
        style={[styles.img, {width: Dimensions.get('window').width}]}
        source={
          backroundImageUri
            ? backroundImageUri
            : require('../../assets/images/writing.png')
        }>
        <AppBar
          style={{backgroundColor: 'rgba(0, 102, 226, 0.85)'}}
          navigation={navigation}
          title={title}
        />
        <View
          style={[
            styles.img,
            styles.transparentBackground,
            height > width
              ? {height: Dimensions.get('window').height / 4.5}
              : {height: Dimensions.get('window').height / 2.18},
          ]}>
          <View
            style={[
              styles.triangle,
              {borderLeftWidth: Dimensions.get('window').width},
            ]}
          />
          <View style={styles.profilePictureContainer}>
            <View style={styles.profilePicture}>
              <Image
                source={
                  profilePictureUri
                    ? profilePictureUri
                    : require('../../assets/images/profile4.png')
                }
                style={styles.imageSize}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  triangle: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    // borderLeftWidth: Dimensions.get('window').width,
    borderRightWidth: 0,
    borderBottomWidth: 90,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#fff',
    borderTopColor: 'transparent',
  },
  img: {
    // width: Dimensions.get('window').width,
    // height: 271,
  },
  profilePictureContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    width: 96,
    height: 96,
    borderWidth: 7,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 88,
    borderRadius: 50,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  imageSize: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 50,
  },
  transparentBackground: {
    backgroundColor: 'rgba(0, 102, 226, 0.85)',
  },
  appBar: {},
});

export default AddProfileDetails;
