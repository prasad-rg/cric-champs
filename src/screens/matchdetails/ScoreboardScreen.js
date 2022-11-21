import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from 'react-native-table-component';


const ScoreboardScreen = () => {
  const [tableHead, setTableHead] = useState([
    'Batsman',
    'R',
    'B',
    '4s',
    '6s',
    'SR',
  ]);
  const [tableData, setTableData] = useState([
    ['Anupam K \nc Mohan b Nilesh', '0', '0', '0', '0', '0'],
    // ['Sripathi J', '0', '0', '0', '0', '0'],
    // ['Anupam K', '0', '0', '0', '0', '0'],
    // ['Sripathi J', '0', '0', '0', '0', '0'],
    // ['Anupam K', '0', '0', '0', '0', '0'],
  

  ]);
  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.mainView}>
        <Text style={styles.header}>UDL Strikers Innings</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.number1}>67/3</Text>
          <Text style={styles.secondNumber}>(8.3)</Text>
        </View>
      </View>
  
          <Table style={{marginTop:10}}>
            <Row
              data={tableHead}
              flexArr={[3, 1, 1, 1, 1, 1]}
              style={styles.table_header}
              textStyle={styles.header_text}
            />
            <TableWrapper>
              <Rows
                data={tableData}
                heightArr={[50, 50, 50, 50, 50, 50]}
                flexArr={[3, 1, 1, 1, 1, 1]}
                textStyle={styles.row_text}
              />
            </TableWrapper>
          </Table>
  
        <View style={{flexDirection:"row",paddingHorizontal:10,justifyContent:"space-between",marginRight:"13%"}}>
          <Text style={styles.fallText}> Extras</Text>
          <Text>3  (b 2, lb 0, w1, nb 0, p 0)</Text>
        </View>
        {/* <View style={{borderWidth:1}}>
          <Text style={styles.fallText}>Fall of Wickets</Text>
        </View>
        <View style={{borderWidth:1}}>
          <Text style={styles.fallText}>Fall of Wickets</Text>
        </View> */}
        </ScrollView>
    </View>
  );
};

export default ScoreboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    width: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  header: {
    height: 16,
    //   width: 165,
    color: '#8E9BA8',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
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
  table_header: {
    borderWidth: 1,
    borderColor: 'rgba(217,226,233,0.5)',
    height: 48,
    backgroundColor: 'rgba(217,226,233,0.5)',
  },
  header_text: {
    // height: 24,
    // width: 53,
    color: 'rgba(0,0,0,0.87)',
    fontFamily: 'Roboto-Bold',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0,
    lineHeight: 24,
    paddingHorizontal: 15,
  },
  row_text: {
    paddingHorizontal: 15,
  },
  fallText:{
    height:50
  }
});
