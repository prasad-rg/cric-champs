import {
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {TextField} from 'rn-material-ui-textfield';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import GradientButton from '../components/GradientButton';
import AddProfileDetails from '../components/AddProfileDetails';

const AddPlayer = ({navigation}) => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');

  const handelLogin = () => {
    console.log(name, city, phone);
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <AddProfileDetails
          profilePictureUri={require('../../assets/images/profile2.png')}
          backroundImageUri={require('../../assets/images/dhoni.jpeg')}
          title="Add Player"
          navigation={navigation}
        />
        <View style={styles.form}>
          <TextField
            label="Player Name"
            formatText={this.formatText}
            onSubmitEditing={this.onSubmit}
            ref={this.fieldRef}
            textColor="#666666"
            tintColor="rgba(0, 0, 0, 0.4)"
            baseColor="rgba(0, 0, 0, .38)"
            lineWidth={1}
            onChangeText={text => setName(text)}
            autoCapitalize="none"
            style={{
                fontFamily: 'Roboto-Medium',
                fontSize: 16,
                fontWeight: '500',
                letterSpacing: 0.57,
                lineHeight: 19,
              }}
            // labelTextStyle={{ fontFamily:"Roboto-Medium",fontWeight:'500',color:"#000000",opacity:0.8}}
          />
          <TextField
            label="City / Town (Optional)"A
            formatText={this.formatText}
            onSubmitEditing={this.onSubmit}
            ref={this.fieldRef}
            textColor="#666666"
            tintColor="rgba(0, 0, 0, 0.4)"
            baseColor="rgba(224, 224, 224, 0.38)"
            lineWidth={1}
            onChangeText={text => setCity(text)}
            autoCapitalize="none"
            style={{
                fontFamily: 'Roboto-Medium',
                fontSize: 16,
                fontWeight: '500',
                letterSpacing: 0.57,
                lineHeight: 19,
              }}
          />
          <TextField
            label="Phone No, (Optional)"
            keyboardType="number-pad"
            formatText={this.formatText}
            onSubmitEditing={this.onSubmit}
            ref={this.fieldRef}
            textColor="#666666"
            tintColor="rgba(0, 0, 0, 0.4)"
            lineWidth={1}
            onChangeText={text => setPhone(text)}
            autoCapitalize="none"
            style={{
                fontFamily: 'Roboto-Medium',
                fontSize: 16,
                fontWeight: '500',
                letterSpacing: 0.57,
                lineHeight: 19,
              }}
          />
        </View>
      </KeyboardAwareScrollView>
      <View style={{marginBottom: Platform.OS === 'ios' ? 20 : 0}}>
        <GradientButton
          start={{x: 0, y: 0}}
          end={{x: 2, y: 0}}
          colors={['#FFBA8C', '#FE5C6A']}
          text="SAVE PLAYER"
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

export default AddPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FFFFFF'
  },
  form: {
    paddingHorizontal: 30,
    marginTop: 10,
  },
});
