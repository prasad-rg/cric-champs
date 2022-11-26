import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

const ListItem = ({title, bodyText,styleDropText={}}) => {
  const [showContent, setShowContent] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowContent(!showContent)}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
      {showContent && (
        <View style={styles.body}>
          <Text style={[styles.bodyText,styleDropText]}>{bodyText}</Text>
        </View>
      )}
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
    borderRadius: 3,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  title: {
    borderColor: 'rgba(217,226,233,0.5)',
    color: '#666666',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    letterSpacing: 0,
    lineHeight: 24,
  },

  body: {
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  bodyText: {
    color: '#666666',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    letterSpacing: 0,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
