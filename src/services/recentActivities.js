import axios from 'axios';
import {BASE_URL} from '../api/baseURL';
import {refreshTokenIfExpired} from './auth';

export const getRecentActivities = async tournamentIds => {
  // console.log(tournamentIds);
  const validateAndGetToken = await refreshTokenIfExpired();
  console.log(validateAndGetToken);
  if (validateAndGetToken !== null) {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/user/recent-activities`,
        tournamentIds,

        {
          headers: {
            Authorization: validateAndGetToken,
          },
        },
      );
      // console.log("response from api",response)
      return response;
    } catch (error) {
      return error.response.data.message;
    }
  }
};
