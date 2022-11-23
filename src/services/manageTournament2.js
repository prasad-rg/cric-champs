import axios from 'axios';
import {BASE_URL} from '../api/baseURL';

const token =
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzdjOTg2NjViZDk4YTJmOThiZTA3M2UiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2NjkyMTE1ODMsImV4cCI6MTY2OTIxNTE4M30.mepbGgbOjI9nmqBaOvuWaQRSz-qayNj7OnezUZu7SgA';

export const addOvers = async oversData => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/tournament/over`,
      oversData,

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

export const addGrounds = async formData => {
  let res = await fetch(`${BASE_URL}/api/tournament/ground`, {
    method: 'post',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonResponse = await res.json();
  return jsonResponse;
};

export const addUmpires = async formData => {
  let res = await fetch(`${BASE_URL}/api/tournament/ground`, {
    method: 'post',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonResponse = await res.json();
  return jsonResponse;
};