import EncryptedStorage from 'react-native-encrypted-storage';

export const setToken = async tokenValue => {
  try {
    await EncryptedStorage.setItem('auth', tokenValue);
    return {status: true};
  } catch (error) {
    return {status: false};
  }
};
