import axios from 'axios';
import {BASE_URL} from '../api/baseURL';
import { token } from '../api/token';

// const token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzdjOTg2NjViZDk4YTJmOThiZTA3M2UiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2NjkyODU3MDksImV4cCI6MTY2OTI4OTMwOX0.e74fZj2TjdvGCC603Q7Wmy7Zk_vbuBEMBzNCaJJGjIY';

export const tournamentOverview = async tournamentId => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/tournament/overview?tournamentId=${tournamentId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};
