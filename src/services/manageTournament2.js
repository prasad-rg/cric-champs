import axios from 'axios';
import {BASE_URL} from '../api/baseURL';
import {refreshTokenIfExpired} from './auth';

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

export const generateFixture = async (data, type) => {
  const validateAndGetToken = await refreshTokenIfExpired();
  if (validateAndGetToken !== null) {
    try {
      if (type === 'league') {
        var response = await axios.get(
          `${BASE_URL}/api/match/generate-fixture?tournamentId=${data}`,

          {
            headers: {
              Authorization: validateAndGetToken,
            },
          },
        );
      } else if (type === 'knockout') {
        var response = await axios.get(
          `${BASE_URL}/api/match/generate-fixture-knock?tournamentId=${data}`,

          {
            headers: {
              Authorization: validateAndGetToken,
            },
          },
        );
      } else {
        var response = await axios.get(
          `${BASE_URL}/api/match/individual-match-fixture?tournamentId=${data}`,

          {
            headers: {
              Authorization: validateAndGetToken,
            },
          },
        );
      }

      return response;
    } catch (error) {
      return error.response;
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
  // console.log("hEEEYYYYY",data)
  const validateAndGetToken = await refreshTokenIfExpired();
  if (validateAndGetToken !== null) {
    try {
      let res = await fetch(
        `${BASE_URL}/api/team?tournamentId=${data.tournamentId}&teamId=${data.teamId}`,
        {
          method: 'delete',
          body: data,
          headers: {
            Authorization: validateAndGetToken,
          },
        },
      );
      const jsonResponse = await res.json();
      return jsonResponse;
    } catch (error) {
      return error;
    }
  }
};

export const updatePlayer = async formData => {
  const validateAndGetToken = await refreshTokenIfExpired();
  if (validateAndGetToken !== null) {
    try {
      let res = await fetch(`${BASE_URL}/api/participant`, {
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

export const deleteIndividualPlayer = async data => {
  // console.log("hEEEYYYYY",data)
  const validateAndGetToken = await refreshTokenIfExpired();
  if (validateAndGetToken !== null) {
    try {
      let res = await fetch(
        `${BASE_URL}/api/participant/delete-participant?participantId=${data.playerId}&tournamentId=${data.tournamentId}`,
        {
          method: 'delete',
          body: data,
          headers: {
            Authorization: validateAndGetToken,
          },
        },
      );
      const jsonResponse = await res.json();
      return jsonResponse;
    } catch (error) {
      return error;
    }
  }
};

export const deleteParticularGround = async data => {
  // console.log("hEEEYYYYY",data)
  const validateAndGetToken = await refreshTokenIfExpired();
  if (validateAndGetToken !== null) {
    try {
      let res = await fetch(
        `${BASE_URL}/api/tournament/ground?tournamentId=${data.tournamentId}&groundId=${data.groundId}`,
        {
          method: 'delete',
          body: data,
          headers: {
            Authorization: validateAndGetToken,
          },
        },
      );
      const jsonResponse = await res.json();
      return jsonResponse;
    } catch (error) {
      return error;
    }
  }
};

export const updateGround = async formData => {
  const validateAndGetToken = await refreshTokenIfExpired();
  if (validateAndGetToken !== null) {
    try {
      let res = await fetch(`${BASE_URL}/api/tournament/ground`, {
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

export const updateUmpire = async formData => {
  const validateAndGetToken = await refreshTokenIfExpired();
  if (validateAndGetToken !== null) {
    try {
      let res = await fetch(`${BASE_URL}/api/participant/update-umpire`, {
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
