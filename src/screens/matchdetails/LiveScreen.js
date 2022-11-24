import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from 'react-native-table-component';
import Circle from '../../components/Circle';
import DotBall from '../../components/DotBall';

const LiveScreen = () => {
  const [tableHead, setTableHead] = useState([
    'Batsman',
    'R',
    'B',
    '4s',
    '6s',
    'SR',
  ]);
  const [tableData, setTableData] = useState([
    ['Anupam K', '0', '0', '0', '0', '0'],
    ['Sripathi J', '0', '0', '0', '0', '0'],
  ]);
  const [tableHeader, setTableHeader] = useState([
    'Bowler',
    'O',
    'M',
    'R',
    'W',
    'ER',
  ]);
  const [data, setData] = useState([['Sashikant D', '0', '0', '0', '0', '0']]);

  const [over, setOver] = useState(['5.3', '5.2', '5.1']);

  return (
    <View style={styles.container}>
      <ScrollView>
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

        <View style={{marginTop: 25}}>
          <Table>
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
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(217,226,233,0.8)',
          }}>
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
                heightArr={[80, 80, 80, 80, 80, 80]}
                flexArr={[3, 1, 1, 1, 1, 1]}
                textStyle={styles.row_text}
              />
            </TableWrapper>
          </Table>
        </View>
        <View style={styles.middleView}>
          <View style={styles.pshipView}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.pship}>P'ship:</Text>
              <Text style={styles.runs}>{'   '}21 runs</Text>
              <Text style={styles.pship}> (18 balls)</Text>
            </View>
            <View style={{flexDirection: 'row', alignSelf: 'baseline'}}>
              <Text style={styles.pship}>FoW:</Text>
              <Text style={styles.runs}>{'   '}46/3</Text>
              <Text style={styles.pship}> (5.3)</Text>
            </View>
          </View>
        </View>
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.recent_view}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.recent_view}>
            <View
              style={{
                margin: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              <Text style={styles.recent}>Recent</Text>
              <DotBall />
              <Text style={styles.line}>|</Text>
              <Circle style={{backgroundColor: '#E05140'}} text="W" />
              <DotBall />
              <DotBall />
              <DotBall />
              <Circle style={{backgroundColor: '#4A90E2'}} text="2" />
              <DotBall />
              <Text style={styles.line}>|</Text>
              <Circle style={{backgroundColor: '#4A90E2'}} text="2" />
              <Circle style={{backgroundColor: '#5FB100'}} text="4" />
              <DotBall />
              <DotBall />
            </View>
          </View>
        </ScrollView>
        <View style={styles.headerText}>
          <Text style={styles.recent}>Commentary</Text>
        </View>

        <View style={styles.commentaryView}>
          <Text style={styles.recent}>5.3</Text>
          <Circle
            style={{
              backgroundColor: '#D8D8D8',
              height: 22,
              width: 22,
              borderRadius: 11,
            }}
            text="0"
            textStyle={{color: 'black'}}
          />
          <Text style={{width: '50%'}}>Deepanjan to Sunder, no runs</Text>
        </View>

        <View style={styles.commentaryView}>
          <Text style={styles.recent}>5.2</Text>
          <Circle
            style={{
              backgroundColor: '#D8D8D8',
              height: 22,
              width: 22,
              borderRadius: 11,
            }}
            text="0"
            textStyle={{color: 'black'}}
          />
          <Text style={{width: '50%'}}>Deepanjan to Ashley, 1 run</Text>
        </View>

        <View style={styles.commentaryView}>
          <Text style={styles.recent}>5.1</Text>
          <Circle
            style={{
              backgroundColor: '#ffffff',
              height: 22,
              width: 22,
              borderRadius: 11,
            }}
            text="0"
            textStyle={{color: 'white'}}
          />
          <Text style={{width: '50%'}}>
            Deepanjan to Ashley, 4 runs! Its a beautiful stroke straight through
            the covers!
          </Text>
        </View>
        <View style={styles.endView}>
          <Text style={styles.end_of_over}>
            End of Over : 5 | 4 runs | 1 wt | 31/3 | RR : 6.6
          </Text>
        </View>
        <View style={styles.commentaryView}>
          <Text style={styles.recent}>4.6</Text>
          <Circle
            style={{
              backgroundColor: '#D8D8D8',
              height: 22,
              width: 22,
              borderRadius: 11,
            }}
            text="0"
            textStyle={{color: 'black'}}
          />
          <Text style={{width: '50%'}}>Deepanjan to Sunder, no runs</Text>
        </View>

        <View style={styles.commentaryView}>
          <Text style={styles.recent}>4.5</Text>
          <Circle
            style={{
              backgroundColor: '#D8D8D8',
              height: 22,
              width: 22,
              borderRadius: 11,
            }}
            text="0"
            textStyle={{color: 'black'}}
          />
          <Text style={{width: '50%'}}>Deepanjan to Ashley, 1 run</Text>
        </View>

        <View style={styles.commentaryView}>
          <Text style={styles.recent}>4.4</Text>
          <Circle
            style={{
              backgroundColor: '#5FB100',
              height: 22,
              width: 22,
              borderRadius: 11,
            }}
            text="4"
            textStyle={{color: '#FFFFFF'}}
          />
          <Text style={{width: '50%'}}>
            Deepanjan to Ashley, 4 runs! Its a beautiful stroke straight through
            the covers!
          </Text>
        </View>
      </ScrollView>
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
    padding: 5,

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
  runsText: {
    height: 16,
    width: 277,
    color: '#E05140',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
    marginHorizontal: 19,
    marginTop: -20,
  },
  header: {
    backgroundColor: 'rgba(217,226,233,0.5)',
    height: 48,
    margin: 1,
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
  pship: {
    height: 15,
    // width: 40,
    color: 'rgba(0,0,0,0.87)',
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    letterSpacing: 0,
    lineHeight: 15,
  },
  runs: {
    // height: 24,
    // width: 40,
    color: 'rgba(0,0,0,0.87)',
    fontFamily: 'Roboto-Regular',
    fontWeight: 'bold',
    fontSize: 13,
    letterSpacing: 0,
    // lineHeight: 24,
  },
  middleView: {
    borderBottomColor: 'rgba(217,226,233,0.5)',
    height: 55,
    borderBottomWidth: 1,
  },
  pshipView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  recent: {
    height: 19,
    // width: 45,
    color: 'rgba(0,0,0,0.87)',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 16,
  },
  line: {
    height: 18,
    width: 1,
    backgroundColor: '#000000',
  },
  recent_view: {
    // borderWidth: 1,
    height: 54,
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  commentaryView: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  endView: {
    height: 51,
    marginTop: 20,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: 'rgba(217,226,233,0.5)',
    borderBottomColor: 'rgba(217,226,233,0.5)',
    borderBottomWidth: 1,
  },
  end_of_over: {
    height: 24,
    width: 241,
    color: '#9C5D29',
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    letterSpacing: 0,
    lineHeight: 24,
    margin: 15,
  },
});
