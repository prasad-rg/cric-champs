import {BASE_URL} from '../api/baseURL';
import {refreshTokenIfExpired} from './auth';

export const createTournament = async formData => {
  const validateAndGetToken = await refreshTokenIfExpired();
  if (validateAndGetToken !== null) {
    try {
      let res = await fetch(`${BASE_URL}/api/tournament`, {
        method: 'post',
        body: formData,
        headers: {
          Authorization: validateAndGetToken,
        },
      });
      const jsonResponse = await res.json();
      return jsonResponse;
    } catch (error) {
      // console.log("I am error",error)
      return error;
    }
  }
};

export const createTeam = async formData => {
  const validateAndGetToken = await refreshTokenIfExpired();
  if (validateAndGetToken !== null) {
    try {
      let res = await fetch(`${BASE_URL}/api/team`, {
        method: 'post',
        body: formData,
        headers: {
          Authorization: validateAndGetToken,
        },
      });
      const jsonResponse = await res.json();
      return jsonResponse;
    } catch (error) {
      return error;
    }
  }
};

export const addParticipant = async formData => {
  const validateAndGetToken = await refreshTokenIfExpired();
  if (validateAndGetToken !== null) {
    try {
      let res = await fetch(`${BASE_URL}/api/participant`, {
        method: 'post',
        body: formData,
        headers: {
          Authorization: validateAndGetToken,
        },
      });
      const jsonResponse = await res.json();
      return jsonResponse;
    } catch (error) {
      return error;
    }
  }
};
