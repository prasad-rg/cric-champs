import {BASE_URL} from '../api/baseURL';
import axios from 'axios';

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
    console.log(data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};
