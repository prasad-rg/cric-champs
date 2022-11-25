import {Modal, StyleSheet, Text, View, Animated, Platform} from 'react-native';
import React, {useState} from 'react';

const StopMatchModal = ({visible, children}) => {
  const [showModal, setShowModal] = useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);

  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // setTimeout(() => setShowModal(false),200);
      setShowModal(false);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Animated.View
            style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
            {children}
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
};

export default StopMatchModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginTop: Platform.OS === 'ios' ? 50 : 0,
    paddingLeft: Platform.OS === 'ios' ? '60%' : '60%',
  },
  modalContainer: {
    height: 48,
    width: 130,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 3,
  },
});
