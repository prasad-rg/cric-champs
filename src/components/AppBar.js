import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const AppBar = ({navigation}) => {
  return (
    <View style={styles.appBar}>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../assets/images/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Forgot Password</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    width: '100%',
    backgroundColor: '#0E85FF',
    paddingHorizontal: 16,
  },
  backIcon: {
    tintColor: '#FFFFFF',
    width: 16,
    height: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 11,
    marginTop: 10,
  },
  text: {
    marginLeft: 32,
    color: 'rgba(255,255,255,0.87)',
    fontFamily: 'Roboto-Medium',
    lineHeight: 28,
    fontSize: 20,
  },
});

export default AppBar;
