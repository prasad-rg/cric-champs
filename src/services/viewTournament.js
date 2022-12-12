import {BASE_URL} from '../api/baseURL';
import axios from 'axios';
import {refreshTokenIfExpired} from './auth';

export const getTournamentByCode = async code => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/tournament/${code.trim('')}`,
    );
    const data = response.data.data[0];
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getMatchesByTournamentId = async tournamentId => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/match?tournamentId=${tournamentId}`,
    );
    const data = response.data;
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getTeamsByTournamentId = async tournamentId => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/team?tournamentId=${tournamentId}`,
    );
    const data = response.data;
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getStandingsByTournamentId = async tournamentId => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/tournament/standings?tournamentId=${tournamentId}`,
    );
    const data = response.data;
    console.warn(data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getGroundsByTournamentId = async tournamentId => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/tournament/ground-details/all?tournamentId=${tournamentId}`,
    );
    const data = response.data;
    // console.log(data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getStatsByTournamentId = async (tournamentId, query) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/tournament/stats/${tournamentId}?query=${query}`,
    );
    const data = response.data;
    // console.log(data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getUmpiresByTournamentId = async tournamentId => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/participant/umpire/all?tournamentId=${tournamentId}`,
    );
    const data = response.data;
    // console.log(data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getPlayersByTeamIdAndTournamentId = async (
  teamId,
  tournamentId,
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/participant/player/all?tournamentId=${tournamentId}&teamId=${teamId}`,
    );
    const data = response.data;
    // console.log(data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getTeamInfoByTeamIdAndTournamentId = async (
  teamId,
  tournamentId,
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/team/team-stats?tournamentId=${tournamentId}&teamId=${teamId}`,
    );
    const data = response.data;
    // console.log(data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getPlayerDetailsByTeamIdAndTournamentIdAndPlayerId = async (
  playerId,
  teamId,
  tournamentId,
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/participant/player/${playerId}?tournamentId=${tournamentId}&teamId=${teamId}`,
    );
    const data = response.data;
    // console.log(data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getGroundDetailByGroundIdAndTournamentId = async (
  groundId,
  tournamentId,
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/tournament/ground-details/${groundId}?tournamentId=${tournamentId}`,
    );
    const data = response.data;
    // console.log(data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getUmpireDetailsByUmpireIdAndTournamentId = async (
  umpireId,
  tournamentId,
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/participant/umpire?tournamentId=${tournamentId}&umpireId=${umpireId}`,
    );
    const data = response.data;
    // console.log(data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getScoreBoardByMatchIdAndBothTeamId = async (
  matchId,
  team1Id,
  team2Id,
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/match/get-scoreboard?matchId=${matchId}&teamId=${team1Id}&team2Id=${team2Id}`,
    );
    const data = response.data;
    // console.log(data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getLiveScoresByMatchIdAndBothTeamId = async (
  matchId,
  team1Id,
  team2Id,
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/match/live-score?tournamentId&matchId=${matchId}&teamId=${team1Id}&team2Id=${team2Id}`,
    );
    const data = response.data;
    console.info('==========', data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getInfoByMatchId = async matchId => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/match/get-particular-match?matchId=${matchId}`,
    );
    const data = response.data;
    console.info('Info response', data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};
export const getGraphValues = async (matchId, team1Id, team2Id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/match/graph?matchId=${matchId}&team1Id=${team1Id}&team2Id=${team2Id}`,
    );
    const data = response.data;
    console.info('Info response', data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};
export const forgotPassword = async email => {
  console.log('email', email);
  try {
    const response = await axios.get(`${BASE_URL}/api/otp?email=${email}`);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const verifyOTP = async data => {
  console.log('data from', data);
  try {
    const response = await axios.post(`${BASE_URL}/api/otp`, data);
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

export const resetPassword = async (data, token) => {
  console.log('token', token);
  try {
    const response = await axios.post(
      `${BASE_URL}/api/otp/reset-password`,
      data,
      {
        headers: {
          'OTP-VERIFICATION-TOKEN': token,
        },
      },
    );
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

export const getMatchesByTournamentIdWithAdmin = async tournamentId => {
  const validateAndGetToken = await refreshTokenIfExpired();
  if (validateAndGetToken !== null) {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/match?tournamentId=${tournamentId}`,
        {
          headers: {
            Authorization: validateAndGetToken,
          },
        },
      );
      const data = response.data;
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
};
