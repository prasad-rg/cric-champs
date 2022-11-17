import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Table,Row,TableWrapper,Rows } from 'react-native-table-component';

const StandingsScreen = ({navigation}) => {
  const [tableHead, setTableHead] = useState([
    'Team',
    'M',
    'W',
    'L',
    'NR',
    'PTS',
    'RR',
  ]);
  const [tableData, setTableData] = useState([
    ['UDL Strikers','6', '4', '2', '0', '8', '3.678'],
    ['Paras XI','6', '3', '2', '1', '7', '3.678'],
    ['Team Dabangg','5', '3', '2', '0', '6', '3.678'],
    ['Parra Warriors','6', '2', '1', '0', '4', '3.678'],
 
  ]);
  return (
    <View style={{marginTop: 20}}>
    <Table>
      <Row
        data={tableHead}
        flexArr={[3, 1.2, 1, 1, 1, 1.3,1.8]}
        style={styles.table_header}
        textStyle={styles.header_text}
      />
      <TableWrapper>
        <Rows
          data={tableData}
          heightArr={[50, 50, 50, 50, 50, 50]}
          flexArr={[3, 1.2, 1, 1, 1, 1.3,1.8]}
          style={styles.row}
          textStyle={styles.row_text}
        />
      </TableWrapper>
    </Table>
  </View>
  // <View
  //   style={{
  //     borderBottomWidth: 1,
  //     borderBottomColor: 'rgba(217,226,233,0.8)',
  //   }}>
  )
}

export default StandingsScreen

const styles = StyleSheet.create({
  table_header: {
    borderWidth: 1,
    borderColor: 'rgba(217,226,233,0.5)',
    height: 48,
    backgroundColor: '#DEDEDE',
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
  row:{
    // borderWidth:1,
    height:65,
    borderTopWidth: 0.2,
    borderTopColor: 'rgba(217,226,233,0.5)',
    borderBottomColor: 'rgba(217,226,233,0.5)',
    borderBottomWidth: 0.2,

  },
  row_text: {
    paddingHorizontal: 15,
    fontFamily: 'Roboto-Regular',
  },
})