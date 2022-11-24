import {BASE_URL} from '../api/baseURL';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzdjOTg2NjViZDk4YTJmOThiZTA3M2UiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2NjkyNjkwNTcsImV4cCI6MTY2OTI3MjY1N30.AEyAsXp-gTTV_0qDaoHG7xYUxGQVJg-0SWZE7XHQaYs';

export const createTournament = async formData => {
  let res = await fetch(`${BASE_URL}/api/tournament`, {
    method: 'post',
    body: formData,
    headers: {
      Authorization:
        `Bearer ${token}`,
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
      `Bearer ${token}`,

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
      `Bearer ${token}`,

    },
  });
  const jsonResponse = await res.json();
  return jsonResponse
};

