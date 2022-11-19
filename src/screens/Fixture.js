import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import CustomModal from '../components/CustomModal';

const Fixture = () => {
  const [visible, setVisible] = useState(false);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <CustomModal visible={visible}>
          <View style={{alignItems: 'center', marginBottom: 30}}>
            <Image
              source={require('../../assets/images/Oopsball.png')}
              style={styles.image}
            />
            <Text style={styles.textView}>Oops! Something went wrong.</Text>
          </View>
          <TouchableOpacity onPress={() => setVisible(false)}>
            <Text style={styles.tryText}>TRY AGAIN</Text>
          </TouchableOpacity>
        </CustomModal>
        <Button title="Open Modal" onPress={() => setVisible(true)} />
      </View>
    </SafeAreaView>
  );
};

export default Fixture;

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 200,

    alignItems: 'center',
    justifyContent:"center"
  },
  textView: {
    height: 42,
    width: 138,
    color: '#4A4A4A',
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    letterSpacing: 0,
    lineHeight: 21,
    textAlign: 'center',
    // alignItems:"center"
    justifyContent:"center"
  },
  tryText:{
    height: 16,
    width: 77,
    color: '#F5112D',
    fontFamily: 'Roboto-Bold',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    lineHeight: 16,
    textAlign: 'center',
  }
});
