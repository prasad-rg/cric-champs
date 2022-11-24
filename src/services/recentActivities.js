import axios from 'axios';
import {BASE_URL} from '../api/baseURL';

export const getRecentActivities = async tournamentIds => {
  console.log(tournamentIds);
  try {
    const response = await axios.post(
      `${BASE_URL}/api/user/recent-activities`,
      tournamentIds,

      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzdjOTg2NjViZDk4YTJmOThiZTA3M2UiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2NjkyODg4ODgsImV4cCI6MTY2OTI5MjQ4OH0.iwalM2BrOhVSfJ-9z1gQJEPVIgy4IWzuhQW93Z5ADnE',
        },
      },
    );
    // console.log("response from api",response)
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};
