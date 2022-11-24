import axios from 'axios';
import {BASE_URL} from '../api/baseURL';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzdjOTg2NjViZDk4YTJmOThiZTA3M2UiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2NjkyOTY4ODYsImV4cCI6MTY2OTMwMDQ4Nn0.N7hhPHHNjzF9-lkIyGJ6aat86vkcX1ykpauU0we12a8';

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

export const cancelTournament = async tournamentId => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/tournament?tournamentId=${tournamentId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};
