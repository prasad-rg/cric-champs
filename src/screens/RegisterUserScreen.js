import {View, StyleSheet} from 'react-native';
import React from 'react';
import AddProfileDetails from '../components/AddProfileDetails';
import {TextField} from 'rn-material-ui-textfield';
import GradientButton from '../components/GradientButton';
import RadioButton from '../components/RadioButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const radio_props = [
  {label: 'Male', value: 'Male', id: 0},
  {label: 'Female', value: 'Female', id: 1},
];

const RegisterUserScreen = ({navigation}) => {
  return (
    <View style={styles.primaryContainer}>
      <KeyboardAwareScrollView>
        <AddProfileDetails navigation={navigation} title="Register">
          <View style={styles.container}>
            <TextField
              label="Full Name"
              formatText={this.formatText}
              onSubmitEditing={this.onSubmit}
              ref={this.fieldRef}
              textColor="#666666"
              tintColor="rgba(153, 153, 153, 0.4)"
              baseColor="rgba(0, 0, 0, .38)"
              lineWidth={1}
              onChangeText={text => console.log(text)}
            />
            <TextField
              label="Email"
              keyboardType="email-address"
              formatText={this.formatText}
              onSubmitEditing={this.onSubmit}
              ref={this.fieldRef}
              textColor="#666666"
              tintColor="rgba(153, 153, 153, 0.4)"
              baseColor="rgba(0, 0, 0, .38)"
              lineWidth={1}
              onChangeText={text => console.log(text)}
              autoCapitalize="none"
            />
            <TextField
              label="Phone No (Optional)"
              keyboardType="email-address"
              formatText={this.formatText}
              onSubmitEditing={this.onSubmit}
              ref={this.fieldRef}
              textColor="#666666"
              tintColor="rgba(153, 153, 153, 0.4)"
              baseColor="rgba(0, 0, 0, .38)"
              lineWidth={1}
              onChangeText={text => console.log(text)}
              autoCapitalize="none"
              style={{
                fontFamily: 'Roboto-Medium',
                color: '#666666',
                fontSize: 15,
              }}
            />
            <TextField
              label="City (Optional)"
              formatText={this.formatText}
              onSubmitEditing={this.onSubmit}
              ref={this.fieldRef}
              textColor="#666666"
              tintColor="rgba(153, 153, 153, 0.4)"
              baseColor="rgba(0, 0, 0, .38)"
              lineWidth={1}
              onChangeText={text => console.log(text)}
            />
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <RadioButton
                radio_props={radio_props}
                formHorizontal={true}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{width: 97, marginRight: 25}}
              />
            </View>
          </View>
        </AddProfileDetails>
      </KeyboardAwareScrollView>
      <GradientButton
        start={{x: 0, y: 0}}
        end={{x: 2, y: 0}}
        colors={['#FFBA8C', '#FE5C6A']}
        text="PROCEED"
        onPress={() => navigation.navigate('SetPasswordScreen')}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{width: '100%', marginBottom: 10, height: 48}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 50,
  },
  primaryContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default RegisterUserScreen;
