import {
  Modal,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';

const CustomChooseModal = ({visible, children, onPress}) => {
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
      // setTimeout(() => setShowModal(false), 0);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
      setShowModal(false);
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackground}>
        <View style={{bottom: 10, width: '75%'}}>
          <TouchableOpacity
            style={{width: 15, height: 15, alignSelf: 'flex-end'}}
            onPress={onPress}>
            <Image
              source={require('../../assets/images/icon-close.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.modalContainer}>
          <Animated.View
            style={[
              styles.modalContainer,
              {transform: [{scale: scaleValue}]},
              {flex: 1},
            ]}>
            {children}
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomChooseModal;

const styles = StyleSheet.create({
  image: {
    height: 15,
    width: 15,

    alignSelf: 'flex-end',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
  },
  modalContainer: {
    flex: 0.5,
    width: '80%',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderRadius: 20,
    // borderWidth: 1,
  },
});
