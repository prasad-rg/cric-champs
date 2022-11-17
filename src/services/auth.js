import axios from 'axios';
import {Platform} from 'react-native';
const FormData = global.FormData;
import {BASE_URL} from '../api/baseURL';

export const loginUser = async userData => {
  try {
    const response = await axios.post(`${BASE_URL}/api/user/login`, userData);
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const registerUser = async formData => {
  let res = await fetch(`${BASE_URL}/api/user`, {
    method: 'post',
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data; ',
    },
  });
  console.log(res);
  // let responseJson = await res.json();
  // if (responseJson) {
  //   alert('Upload Successful');
  // } else {
  //   //if no file selected the show alert
  //   alert('Please Select File first');
};

// console.log(formData);
// try {
//   const response = await fetch(`${BASE_URL}/api/user`, {
//     method: 'POST',
//     data: formData,
//   });
//   console.warn(response);
//   // const jsonResponse = await response.json();
//   // console.log(jsonResponse);
// } catch (err) {
//   console.warn(err);
// }

// console.log(data.__boundary);
// try {
//   // console.log(data._parts);

//   const response = await axios.post(`${BASE_URL}/api/user`, data);
//   console.log(response.data);
//   // return response.data;
// } catch (error) {
//   console.log(error.response.data);
//   // return error.response.data.message;
// }
// };
