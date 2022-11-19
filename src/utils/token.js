import EncryptedStorage from 'react-native-encrypted-storage';

export const setToken = async tokenValue => {
  try {
    await EncryptedStorage.setItem('auth', tokenValue);
    return {status: true};
  } catch (error) {
    return {status: false};
  }
};

export const getToken = async () => {
  try {
    const authTokens = await EncryptedStorage.getItem('auth');
    if (authTokens !== undefined) {
      return authTokens;
    }
    return undefined;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const deleteToken = async () => {
  try {
    await EncryptedStorage.removeItem('auth');
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
