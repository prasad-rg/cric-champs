import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';

const ProfileImagePicker = ({
  profilePictureUri = '',
  getImageUri,
  isView,
}) => {
  const {width, height} = useWindowDimensions();
  const [imageUri, setImageUri] = useState('');

  const getImageFromCamera = () => {
    ImagePicker.openCamera({
      width: 104,
      height: 104,
      cropping: true,
    }).then(image => {
      // console.log(image);
      setImageUri(`file://${image.path}`);
      const {path, filename, mime} = image;
      getImageUri({path, filename, mime});
    });
  };

  const getImageFromGallary = () => {
    ImagePicker.openPicker({
      width: 104,
      height: 104,
      cropping: true,
    }).then(image => {
      setImageUri(`file://${image.path}`);
      const {path, filename, mime} = image;
      getImageUri({path, filename, mime});
      // console.log(image.path);
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
    <View>
      <View style={styles.teamlogoview}>
        <Image
          source={
            profilePictureUri
              ? profilePictureUri
              : imageUri
              ? {uri: imageUri}
              : require('../../assets/images/team4.png')
          }
          style={styles.teamlogo}
        />
      </View>
      {isView ? null : <View
        style={
          height > width
            ? [
                styles.imagepicker,
                {right: Dimensions.get('window').width / 3.1},
              ]
            : [
                styles.imagepicker,
                {right: Dimensions.get('window').width / 2.55},
              ]
        }>
        <TouchableOpacity
          onPress={() => {
            createThreeButtonAlert();
          }}>
          <Image
            source={require('../../assets/images/camera.png')}
          />
        </TouchableOpacity>
      </View>}
    </View>
  );
};

const styles = StyleSheet.create({

      teamlogo: {
        height: 104,
        width: 104,
        borderRadius: 60,
      },
      teamlogoview: {
        width: 116,
        height: 116,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 31,
        borderWidth: 7,
        borderRadius: 60,
        borderColor: 'rgba(255, 255, 255, 0.6)',
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 60,
      },
      imagepicker: {
        height: 34,
        width: 34,
        backgroundColor: '#FFFFFF',
        boxShadow: '0 2 8 0 rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 60,
        position: 'absolute',
        top: '83%',
        right: '35%',
        elevation: 20,
        shadowColor: '#52006A',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
    });

export default ProfileImagePicker;
