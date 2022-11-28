import axios from 'axios';
import {BASE_URL} from '../api/baseURL';
import {token} from '../api/token';
import { refreshTokenIfExpired } from './auth';

// const token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzdjOTg2NjViZDk4YTJmOThiZTA3M2UiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2NjkyODU3MDksImV4cCI6MTY2OTI4OTMwOX0.e74fZj2TjdvGCC603Q7Wmy7Zk_vbuBEMBzNCaJJGjIY';

export const tournamentOverview = async tournamentId => {
  const validateAndGetToken = await refreshTokenIfExpired();
  if (validateAndGetToken !== null) {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/tournament/overview?tournamentId=${tournamentId}`,

      {
        headers: {
          Authorization: validateAndGetToken,
        },
      },
    );
    return response;
  } catch (error) {
    return error.response.data.message;
  }
}
};

export const cancelTournament = async tournamentId => {
  const validateAndGetToken = await refreshTokenIfExpired();
  if (validateAndGetToken !== null) {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/tournament?tournamentId=${tournamentId}`,

      {
        headers: {
          Authorization: validateAndGetToken,
        },
      },
    );
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
}
};
