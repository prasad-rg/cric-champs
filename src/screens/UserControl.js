import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';

const UserControl = () => {
  return (
    <View style={styles.container}>
      <View style={styles.backgroundBeyondSafeArea}>
        <SafeAreaView>
          <View style={styles.profileDetailsContainer}>
            <TouchableOpacity style={styles.closeButton}>
              <Image
                source={require('../../assets/images/icon-close.png')}
                style={styles.closeButtonImage}
              />
            </TouchableOpacity>
            <View style={styles.profileView}>
              <Image
                source={require('../../assets/images/profile4.png')}
                style={styles.avatar}
              />
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>Natash Aston</Text>
                <Text style={styles.emailText}>natashaston@gmail.com</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
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
    backgroundColor: '#0066E2',
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
});

export default UserControl;
