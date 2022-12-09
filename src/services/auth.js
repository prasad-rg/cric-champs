import {BASE_URL} from '../api/baseURL';
import axios from 'axios';
import {deleteToken, getToken, setToken} from '../utils/token';
import jwt_decode from 'jwt-decode';

export const loginUser = async userData => {
  try {
    const response = await axios.post(`${BASE_URL}/api/user/login`, userData);
    return response;
  } catch (error) {
    // console.warn(error.response);
    return error.response.data.message;
  }
};

export const registerUser = async formData => {
  let res = await fetch(`${BASE_URL}/api/user`, {
    method: 'post',
    body: formData,
    // headers: {
    //   'Content-Type': 'multipart/form-data;',
    // },
  });
  // console.log(res);
  return res;
};

export const logoutUser = async () => {
  try {
    const token = await getToken();
    const jsonToken = JSON.parse(token);
    // return jsonToken.refreshToken;
    const res = await axios.delete(`${BASE_URL}/api/user/login`, {
      headers: {'Refresh-Token': jsonToken.refreshToken},
    });
    if (res.data.status) {
      await deleteToken();
      return res.data;
    }
  } catch (error) {
    return error.data;
  }
};

export const getNewAccessToken = async (oldAcccessToken, refreshToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/refresh`, {
      headers: {Authorization: oldAcccessToken, 'refresh-token': refreshToken},
    });
    if (response.status === 200) {
      const headers = response.headers;
      let stringifiedToken = JSON.stringify({
        accessToken: headers.authorization,
        refreshToken: refreshToken,
      });
      const isSecurelyStored = await setToken(stringifiedToken);
      if (isSecurelyStored) {
        return headers.authorization;
      } else {
        return false;
      }
    } else {
      return {error: response};
    }
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};

export const refreshTokenIfExpired = async () => {
  const result = await getToken();
  const jsonToken = JSON.parse(result);
  const refreshToken = jsonToken.refreshToken;
  const decodedRefreshToken = jwt_decode(refreshToken);
  let isRefreshExpired =
    decodedRefreshToken.exp - Math.floor(Date.now() / 1000) < 1 ? true : false;
  if (!isRefreshExpired) {
    const accessToken = jsonToken.accessToken.substr(7);
    const decode = jwt_decode(accessToken);
    let isAuthTokenExpired =
      decode.exp - Math.floor(Date.now() / 1000) < 1 ? true : false;
    if (isAuthTokenExpired) {
      const newToken = await getNewAccessToken(
        jsonToken.accessToken,
        jsonToken.refreshToken,
      );
      return newToken;
    } else {
      return jsonToken.accessToken;
    }
  } else {
    return null;
  }
};

export const getUserDetails = async () => {
  const validateAndGetToken = await refreshTokenIfExpired();
  if (validateAndGetToken !== null) {
    try {
      const response = await axios.get(`${BASE_URL}/api/user`, {
        headers: {
          Authorization: validateAndGetToken,
        },
      });
      // console.log("response from api",response)
      return response.data.data[0];
    } catch (error) {
      return error.response.data.message;
    }
  } else {
    return null;
  }
};
