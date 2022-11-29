import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import AppBar from './AppBar';
import ImagePicker from 'react-native-image-crop-picker';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const AddProfileDetails = ({
  navigation,
  children,
  profilePictureUri = '',
  backroundImageUri = '',
  playerId,
  title,
  getImageUri,
}) => {
  const {width, height} = useWindowDimensions();
  const [imageUri, setImageUri] = useState('');

  const getImageFromCamera = () => {
    ImagePicker.openCamera({
      width: 104,
      height: 104,
      cropping: true,
    }).then(image => {
      setImageUri(image.path);
      console.log(image);
    });
  };

  const getImageFromGallary = async () => {
    // const options = {
    //   title: 'Select Image',
    //   type: 'library',
    //   selectionLimit: 1,
    //   mediaType: 'image',
    //   includeBase64: false,
    //   quality: 0.5,
    //   customButtons: [
    //     {name: 'button_id_1', title: 'CustomButton 1'},
    //     {name: 'button_id_2', title: 'CustomButton 2'},
    //   ],
    //   storageOptions: {
    //     skipBackup: true,
    //     path: 'images',
    //   },
    // };
    // const result = await launchImageLibrary(options, res => {
    //   console.log(res);
    // });
    // // console.log(result.assets[0]);
    // setImageUri(result.assets[0].uri);
    // const {uri, type, fileName} = result.assets[0];
    // getImageUri({uri, type, fileName});
    ImagePicker.openPicker({
      width: 104,
      height: 104,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      // console.log(image);
      setImageUri(`file://${image.path}`);
      const {path, filename, mime} = image;
      getImageUri({path, filename, mime});
    });
  };

  const createThreeButtonAlert = () =>
    Alert.alert('Select Picture From', '', [
      {
        text: 'Camera',
        onPress: () => getImageFromCamera(),
      },
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Gallary',
        onPress: () => getImageFromGallary(),
      },
    ]);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={[styles.img, {width: Dimensions.get('window').width}]}
        source={
          backroundImageUri !== ''
            ? backroundImageUri
            : require('../../assets/images/writing.png')
        }>
        <AppBar
          style={{backgroundColor: 'rgba(0, 102, 226, 0.85)'}}
          navigation={navigation}
          title={title}
          profilePictureUri={profilePictureUri}
          playerId={playerId}
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
              // changes for pull
            ]}
          />
          <View style={styles.profilePictureContainer}>
            <View style={styles.profilePicture}>
              <Image
                source={
                  profilePictureUri
                    ? profilePictureUri
                    : imageUri
                    ? {uri: imageUri}
                    : require('../../assets/images/profile4.png')
                }
                style={styles.imageSize}
              />
            </View>
            <View
              style={
                height > width
                  ? [
                      styles.imagepicker,
                      {right: Dimensions.get('window').width / 2.86},
                    ]
                  : [
                      styles.imagepicker,
                      {right: Dimensions.get('window').width / 2.33},
                    ]
              }>
              <TouchableOpacity
                onPress={() => {
                  createThreeButtonAlert();
                }}>
                <Image
                  source={require('../../assets/images/camera.png')}
                  style={styles.gobackbutton}
                />
              </TouchableOpacity>
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
  imagepicker: {
    height: 34,
    width: 34,
    backgroundColor: '#FFFFFF',
    boxShadow: '0 2 8 0 rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    position: 'absolute',
    bottom: 0,
    // left: Dimensions.get('window').width / 2.86,
    // right: '35%',
    // right: Dimensions.get('window').width / 2.86,
    elevation: 20,
    shadowColor: '#52006A',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default AddProfileDetails;
