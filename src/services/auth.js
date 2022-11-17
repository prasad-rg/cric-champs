import axios from 'axios';
import {BASE_URL} from '../api/baseURL';

export const registerUser = async formData => {
  const config = {
    method: 'post',
    url: `${BASE_URL}/api/user/`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  };
  try {
    const response = await axios(config);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async userData => {
  try {
    const response = await axios.post(`${BASE_URL}/api/user/login`, userData);
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
  }
};
