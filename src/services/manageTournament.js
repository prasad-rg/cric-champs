import {BASE_URL} from '../api/baseURL';

export const createTournament = async formData => {
  let res = await fetch(`${BASE_URL}/api/tournament`, {
    method: 'post',
    body: formData,
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzdjOTg2NjViZDk4YTJmOThiZTA3M2UiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2NjkxMjU2MjAsImV4cCI6MTY2OTEyOTIyMH0.fsjSpbhsVcANg4OYURGhjGGeM4-aUefwiD0rvA3-Q7s',
    },
  });
  const jsonResponse = await res.json();
  return jsonResponse
};

export const createTeam = async formData => {
  let res = await fetch(`${BASE_URL}/api/team`, {
    method: 'post',
    body: formData,
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzdjOTg2NjViZDk4YTJmOThiZTA3M2UiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2NjkxMjU2MjAsImV4cCI6MTY2OTEyOTIyMH0.fsjSpbhsVcANg4OYURGhjGGeM4-aUefwiD0rvA3-Q7s',
    },
  });
  const jsonResponse = await res.json();
  return jsonResponse
};

export const addParticipant = async formData => {
  let res = await fetch(`${BASE_URL}/api/participant`, {
    method: 'post',
    body: formData,
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzdjOTg2NjViZDk4YTJmOThiZTA3M2UiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2NjkxMjU2MjAsImV4cCI6MTY2OTEyOTIyMH0.fsjSpbhsVcANg4OYURGhjGGeM4-aUefwiD0rvA3-Q7s',
    },
  });
  const jsonResponse = await res.json();
  return jsonResponse
};

