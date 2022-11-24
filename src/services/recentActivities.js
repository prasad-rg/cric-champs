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
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzdjOTg2NjViZDk4YTJmOThiZTA3M2UiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2NjkyNzIxMjksImV4cCI6MTY2OTI3NTcyOX0.nG0AXFpAl-vrbsW79XbC9sfyfncj1KMUH7Ztpv1Upfg',
        },
      },
    );
    // console.log("response from api",response)
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};
