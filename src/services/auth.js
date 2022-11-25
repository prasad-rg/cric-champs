import {BASE_URL} from '../api/baseURL';
import axios from 'axios';
import {getToken, setToken} from '../utils/token';
import jwt_decode from 'jwt-decode';

export const loginUser = async userData => {
  try {
    const response = await axios.post(`${BASE_URL}/api/user/login`, userData);
    return response;
  } catch (error) {
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

// export const logoutUser = async userDetails => {
//   let res = await axios.delete(`${BASE_URL}/api/user/login`,)
// }

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
