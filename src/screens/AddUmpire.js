import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native';
import React, {useState} from 'react';
import {TextField} from 'rn-material-ui-textfield';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import GradientButton from '../components/GradientButton';

const AddUmpire = () => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');

  const handelLogin = () => {
    console.log(name, city, phone);
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <ImageBackground
          source={require('../../assets/images/umpire.png')}
          resizeMode="cover">
          <View style={styles.backgroundBeyondSafeArea}>
            <SafeAreaView>
              <View style={styles.profileDetailsContainer}>
                <View style={styles.header}>
                  <TouchableOpacity>
                    <Image
                      source={require('../../assets/images/goback.png')}
                      style={styles.gobackbutton}
                    />
                  </TouchableOpacity>
                  <Text style={styles.addUmpire}>Add Umpire</Text>
                </View>
                <View style={styles.profileView}>
                  <Image
                    source={require('../../assets/images/profile1.png')}
                    style={styles.profile}
                  />
                </View>
              </View>
            </SafeAreaView>
          </View>
        </ImageBackground>
        <View style={styles.form}>
          <TextField
            label="Umpire Name"
            formatText={this.formatText}
            onSubmitEditing={this.onSubmit}
            ref={this.fieldRef}
            textColor="#666666"

            tintColor="rgba(0, 0, 0, 0.4)"
            baseColor="rgba(0, 0, 0, .38)"
            lineWidth={1}
            onChangeText={text => setName(text)}
            autoCapitalize="none"
          />
          <TextField
            label="City / Town (Optional)"
            formatText={this.formatText}
            onSubmitEditing={this.onSubmit}
            ref={this.fieldRef}
            textColor="#666666"
            tintColor="rgba(153, 153, 153, 0.4)"
            lineWidth={1}
            onChangeText={text => setCity(text)}
            autoCapitalize="none"
          />
          <TextField
            label="Phone No, (Optional)"
            keyboardType="number-pad"
            formatText={this.formatText}
            onSubmitEditing={this.onSubmit}
            ref={this.fieldRef}
            textColor="#666666"
            tintColor="rgba(153, 153, 153, 0.4)"
            lineWidth={1}
            
            onChangeText={text => setPhone(text)}
            autoCapitalize="none"
          />
         
        </View>
     
      </KeyboardAwareScrollView>
      <View style={{marginBottom:Platform.OS==='ios' ? 20:0}}>
        <GradientButton
          start={{x: 0, y: 0}}
          end={{x: 2, y: 0}}
          colors={['#FFBA8C', '#FE5C6A']}
          text="SAVE UMPIRE"
          onPress={() => handelLogin()}
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

export default AddUmpire;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileDetailsContainer: {
    height: 297,
  },
  header: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  gobackbutton: {
    height: 20,
    width: 20,
  },
  addUmpire: {
    marginLeft: 32,
    height: 28,
    width: 174,
    color: 'rgba(255,255,255,0.87)',
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 28,
  },
  backgroundBeyondSafeArea: {
    backgroundColor: 'rgba(0, 102, 226, 0.9)',
    paddingRight: 20,
    paddingLeft: 20,
  },
  profile: {
    height: 105,
    width: 105,
    borderRadius: 52,
  },
  profileView: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 35,
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
  form: {
    paddingHorizontal: 30,
    marginTop:10

  },
});
