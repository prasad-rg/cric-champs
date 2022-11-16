import {StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import { Table,TableWrapper,Row,Rows,Col } from 'react-native-table-component';

const LiveScreen = () => {

    const Content={
        tableHead:['Batsman','R','B','4s','6s','SR'],
        tableTitle:['Anupam K','Sripathi J'],
        tableData:[
            ['0','0','0','0','0'],
            ['0','0','0','0','0'],
        ],
    }




  return (
    <View style={styles.container}>
      <View style={styles.headerText}>
        <Text style={styles.codetext}>Code Warriors</Text>
        <Text style={styles.numberText}>96/3</Text>
        <Text style={styles.overText}>(10.0)</Text>
      </View>
      <View style={styles.scoreView}>
        <View>
          <Text style={styles.heading1}>Coastal Riders</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.number1}>67/3</Text>
            <Text style={styles.secondNumber}>(8.3)</Text>
          </View>
        </View>
        <View style={{width: '20%', marginHorizontal: '30%'}}>
          <Text style={styles.heading2}>CRR</Text>
          <Text style={styles.number2}>6.07</Text>
        </View>

        <View style={{width: '20%', marginLeft: '-30%'}}>
          <Text style={styles.heading2}>REQ</Text>
          <Text style={styles.number2}>7.72</Text>
        </View>
      </View>

        <Text style={styles.runsText}>Coastal Riders need 29 runs to win</Text>


        <View>
        <Table borderStyle={{}}>
            <Row data={Content.tableHead}
            flexArr={[4,1,1,1,1,1]}
            style={styles.header}
            textStyle={styles.header_text}
            />
            <TableWrapper style={styles.tableWrapper}>
                <Col data={Content.tableTitle}
                style={styles.S_no}
                heightArr={[28,28]}
                textStyle={styles.S_no_text}
                />
                <Rows
                data={Content.tableData}
                style={styles.S_no}
                // flexArr={[0.1,1,1,1,1,1]}
                textStyle={styles.S_no_text}
                />

            </TableWrapper>
        </Table>
        </View>
    </View>
  );
};

export default LiveScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerText: {
    height: 48,
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'baseline',
    padding: 18,
    backgroundColor: 'rgba(217,226,233,0.5)',
  },
  codetext: {
    height: 19,
    width: 90,
    color: '#8E9BA8',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
  },
  numberText: {
    height: 19,
    width: 90,
    color: '#000000',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
    marginHorizontal: 17,
  },
  overText: {
    height: 19,
    width: 37,
    color: '#000000',
    fontFamily: 'Roboto-Light',
    fontSize: 14,
    fontWeight: '300',
    letterSpacing: 0,
    lineHeight: 16,
    marginLeft: -70,
  },
  scoreView: {
    height: 77,
    margin: 15,
    padding: 10,


    flexDirection: 'row',
  },
  heading1: {
    height: 16,
    //   width: 165,
    color: '#8E9BA8',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,

  },
  heading2: {
    height: 16,
    //   width: 48,
    color: '#8E9BA8',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,

  },
  heading3: {
    height: 16,
    //   width: 48,
    color: '#8E9BA8',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
    textAlign: 'center',

  },
  number1: {
    height: 30,
    width: 70,
    color: '#000000',
    fontFamily: 'Roboto-Medium',
    fontSize: 24,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 28,
    paddingTop: 7,
  },
  number2: {
    height: 30,
    width: 36,
    color: '#000000',
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 21,
    textAlign: 'center',
    paddingTop: 7,
  },
  number3: {
    height: 30,
    width: 36,
    color: '#000000',
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 21,
    textAlign: 'center',
    paddingTop: 7,
  },
  secondNumber: {
    height: 30,
    width: 40,
    color: '#000000',
    fontFamily: 'Roboto-Light',
    fontSize: 20,
    fontWeight: '300',
    letterSpacing: 0,
    lineHeight: 24,
    marginTop: 8.5,
  },
  runsText:{
    height: 16,
    width: 277,
    color: '#E05140',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
    marginHorizontal:25,
  },
  header:{
    backgroundColor: 'rgba(217,226,233,0.5)',
    height:48,
    
  },
  header_text:{
    // height: 24,
//   width: 53,
  color: 'rgba(0,0,0,0.87)',
  fontFamily: 'Roboto-Bold',
  fontSize: 13,
  fontWeight: 'bold',
  letterSpacing: 0,
  lineHeight: 24,
  padding:10
  }
});
