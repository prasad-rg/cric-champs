import axios from 'axios';
import {BASE_URL} from '../api/baseURL';
import { refreshTokenIfExpired } from './auth';

export const addOvers = async oversData => {
  const validateAndGetToken = await refreshTokenIfExpired();
  if (validateAndGetToken !== null) {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/tournament/over`,
        oversData,
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

export const addGrounds = async formData => {
  const validateAndGetToken = await refreshTokenIfExpired();
  if (validateAndGetToken !== null) {
    try {
      let res = await fetch(`${BASE_URL}/api/tournament/ground`, {
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

export const addUmpires = async formData => {
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

export const addDates = async dateData => {
  const validateAndGetToken = await refreshTokenIfExpired();
  if (validateAndGetToken !== null) {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/tournament/date`,
        dateData,

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

export const addTime = async dateData => {
  const validateAndGetToken = await refreshTokenIfExpired();
  if (validateAndGetToken !== null) {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/tournament/time`,
        dateData,

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

export const generateFixture = async data => {
  const validateAndGetToken = await refreshTokenIfExpired();
  if (validateAndGetToken !== null) {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/match/generate-fixture?tournamentId=${data}`,

        {
          headers: {
            Authorization: validateAndGetToken,
          },
        },
      );

      return response;
    } catch (error) {
      return error.response.data.errorMessage;
    }
  }
};

export const updateTeam = async formData => {
  const validateAndGetToken = await refreshTokenIfExpired();
  if (validateAndGetToken !== null) {
    try {
      let res = await fetch(`${BASE_URL}/api/team`, {
        method: 'put',
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

export const deleteTeam = async data => {
  const validateAndGetToken = await refreshTokenIfExpired();
  if (validateAndGetToken !== null) {
    try {
      let res = await fetch(`${BASE_URL}/api/team?tournamentId=63770c915e66128088aa5765&teamId=63770d86db32d1583363ae5`, {
        method: 'put',
        body: data,
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
