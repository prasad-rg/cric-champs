import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
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
    ['Sripathi J\nb Mohan b Nilesh', '0', '0', '0', '0', '0'],
    ['Anupam K\nc Mohan b Nilesh', '0', '0', '0', '0', '0'],
    ['Sripathi J\nb Mohan b Nilesh', '0', '0', '0', '0', '0'],
    ['Anupam K\nc Mohan b Nilesh', '0', '0', '0', '0', '0'],
 
  ]);
  const [tableHeader, setTableHeader] = useState([
    'Bowler',
    'O',
    'M',
    'R',
    'W',
    'ER',
  ]);
  const [data, setData] = useState([['Sashikant D', '0', '0', '0', '0', '0'],['Sashikant D', '0', '0', '0', '0', '0']]);

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

        <Table style={{marginTop: 10}}>
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

        <View style={styles.extraView}>
          <Text style={styles.extra}> Extras</Text>
          <View style={{flexDirection: 'row', marginHorizontal: '10%',marginLeft:"27%"}}>
            <Text style={styles.extraNumber}>3</Text>
            <Text style={styles.extraInfo}> (b 2, lb 0, w1, nb 0, p 0)</Text>
          </View>
        </View>
        <View style={{height: 50, alignItems: 'center', flexDirection: 'row'}}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalNumber}>67</Text>
        </View>
        <View>
          <Text style={styles.fallText}>Fall of Wickets</Text>
          <Text style={styles.fallView}>
            2/1 (Naveen F, 0.5), 6/2 (Prayag G, 1.4),{'\n'} 8/3 (Nithin R, 2.1)
          </Text>
        </View>
        <Table>
            <Row
              data={tableHeader}
              flexArr={[3, 1, 1, 1, 1, 1]}
              style={styles.table_header}
              textStyle={styles.header_text}
            />
            <TableWrapper>
              <Rows
                data={data}
                heightArr={[40, 40, 40, 40, 40, 40]}
                flexArr={[3, 1, 1, 1, 1, 1]}
                textStyle={styles.row_text}
              />
            </TableWrapper>
          </Table>
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
  fallText: {
    height: 50,
  },
  extraView: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  extra: {
    height: 19,
    // width: 40,
    color: 'rgba(0,0,0,0.87)',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 16,
    paddingHorizontal: 3,
  },
  extraNumber: {
    height: 19,
    // width: 40,
    color: 'rgba(0,0,0,0.87)',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,

  },
  extraInfo: {
    height: 19,
    color: 'rgba(0,0,0,0.87)',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 16,
  },
  totalText: {
    height: 19,
    color: 'rgba(0,0,0,0.87)',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  totalNumber: {
    height: 19,
    color: 'rgba(0,0,0,0.87)',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
   marginLeft:"25%"
  },
  fallText: {
    height: 50,
    color: 'rgba(0,0,0,0.87)',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(217,226,233,0.5)',
  },
  fallView:{

    color: 'rgba(0,0,0,0.87)',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 28,
    padding:15,
  }
});
