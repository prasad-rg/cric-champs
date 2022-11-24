import axios from 'axios';
import {BASE_URL} from '../api/baseURL';

export const addOvers = async oversData => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/tournament/over`,
      oversData,

      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzdjOTg2NjViZDk4YTJmOThiZTA3M2UiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2NjkxODQ3NzksImV4cCI6MTY2OTE4ODM3OX0.FuxrUMecs2oJJpoPaJ7H326991nB6XckVI23JzbiS64',
        },
      },
    );
    // console.log("response from api",response)
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};
