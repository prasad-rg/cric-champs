import {StyleSheet, View, Platform, Text} from 'react-native';
import React, {useState} from 'react';
import {TextField} from 'rn-material-ui-textfield';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import GradientButton from '../components/GradientButton';
import AddProfileDetails from '../components/AddProfileDetails';
import RadioButton from '../components/RadioButton';
import ToggleSwitch from '../components/ToggleSwitch';

const AddPlayer = ({navigation}) => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');

  const Designation = [
    {label: 'Captain', value: 'League', id: 0},
    {label: 'Vice Captain', value: 'Knockout', id: 1},
  ];

  const Expertise = [
    {label: 'Batting', value: 'Batting', id: 0},
    {label: 'Bowling', value: 'Bowling', id: 1},
    {label: 'All Rounder', value: 'All Rounder', id: 1},
    {label: 'Wicket Keeper', value: 'Wicket Keeper', id: 1},
  ];

  const Batting = [
    {label: 'Captain', value: 'Captain', id: 0},
    {label: 'Vice Captain', value: 'Vice Captain', id: 1},
  ];

  const Bowling = [
    {label: 'Right Handed', value: 'Right Handed', id: 0},
    {label: 'Left Handed', value: 'Left Handed', id: 1},
  ];
  const BowlingType = [
    {label: 'Right Handed', value: 'Right Handed', id: 0},
    {label: 'Left Handed', value: 'Left Handed', id: 1},
  ];

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
            // baseColor="rgba(224, 224, 224, 1)"
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
            label="City / Town (Optional)"
            formatText={this.formatText}
            onSubmitEditing={this.onSubmit}
            ref={this.fieldRef}
            textColor="#666666"
            tintColor="rgba(0, 0, 0, 0.4)"
            baseColor="rgba(0, 0, 0, .38)"
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
        <View
          style={{
            height: 84,
            width: 241,
            marginLeft: 50,
            marginTop: 31,
          }}>
          <View style={{flexDirection: 'row',alignItems:'center'}}>
            <Text style={styles.designation}>{`Designation :`}</Text>
           <ToggleSwitch/>
          </View>
          <View style={{flexDirection: 'row', paddingTop: 24}}>
            <RadioButton
              radio_props={Designation}
              formHorizontal={true}
              style={{
                marginBottom: 0,
                width: 'auto',
                paddingRight: 10,
                marginRight: 15,
              }}
            />
          </View>
        </View>
        <View
          style={{
            height: 139,
            width: 300,
            marginLeft: 50,
            marginTop: 31,
            flexWrap: 'wrap',
          }}>
          <View style={{flexDirection: 'row',alignItems:'center'}}>
            <Text style={styles.designation}>{`Expertise :`}</Text>
            <ToggleSwitch/>
          </View>
          <View
            style={{
              width: 300,
              height: 119,
              paddingTop:9,
            }}>
            <RadioButton
              radio_props={Expertise}
              formHorizontal={true}
              flexWrap={{flexWrap:'wrap'}}
              style={{
                marginBottom: 0,
                width: 'auto',
                paddingRight: 10,
                marginRight: 15,
                marginTop:15
              }}
           
            />
          </View>
        </View>
        <View
          style={{
            height: 84,
            width: 241,
            marginLeft: 50,
            marginTop: 31,
          }}>
          <View style={{flexDirection: 'row',alignItems:'center'}}>
            <Text style={styles.designation}>{`Batting :`}</Text>
            <ToggleSwitch/>
          </View>
          <View style={{flexDirection: 'row', paddingTop: 24}}>
            <RadioButton
              radio_props={Batting}
              formHorizontal={true}
              style={{
                marginBottom: 0,
                width: 'auto',
                paddingRight: 10,
                marginRight: 15,
              }}
            />
          </View>
        </View>
        <View
          style={{
            height: 84,
            width: 241,
            marginLeft: 50,
            marginTop: 31,
          }}>
          <View style={{flexDirection: 'row',alignItems:'center'}}>
            <Text style={styles.designation}>{`Bowling :`}</Text>
            <ToggleSwitch/>
          </View>
          <View style={{flexDirection: 'row', paddingTop: 24}}>
            <RadioButton
              radio_props={Bowling}
              formHorizontal={true}
              style={{
                marginBottom: 0,
                width: 'auto',
                paddingRight: 10,
                marginRight: 15,
              }}
            />
          </View>
        </View>
        <View
          style={{
            height: 84,
            width: 241,
            marginLeft: 50,
            marginTop: 31,
          }}>
          <View style={{flexDirection: 'row',alignItems:'center'}}>
            <Text style={styles.designation}>{`Bowling Type :`}</Text>
            <Text>Togggle</Text>
          </View>
          <View style={{flexDirection: 'row', paddingTop: 24}}>
            <RadioButton
              radio_props={BowlingType}
              formHorizontal={true}
              style={{
                marginBottom: 0,
                width: 'auto',
                paddingRight: 10,
                marginRight: 15,
              }}
            />
          </View>
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
    backgroundColor: '#FFFFFF',
  },
  form: {
    paddingHorizontal: 50,
    marginTop: 10,
  },
  designation: {
    height: 16,
    width: 86,
    color: '#999999',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
    marginRight: 10.5,
  },
});
