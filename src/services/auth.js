import axios from 'axios';
import {BASE_URL} from '../api/baseURL';

export const 
loginUser = async userData => {
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


