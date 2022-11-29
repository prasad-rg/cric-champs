import axios from 'axios';
import {BASE_URL} from '../api/baseURL';
import {refreshTokenIfExpired} from './auth';

export const cancelLiveTournament = async (matchId, statusMessage) => {
  const validateAndGetToken = await refreshTokenIfExpired();
  if (validateAndGetToken !== null) {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/match/change-status`,
        {matchId: matchId, statusMessage: statusMessage},
        {
          headers: {
            Authorization: validateAndGetToken,
          },
        },
      );
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
};

export const updateLiveScore = async liveScore => {
  const validateAndGetToken = await refreshTokenIfExpired();
  if (validateAndGetToken !== null) {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/match/live-score`,
        liveScore,
        {
          headers: {
            Authorization: validateAndGetToken,
          },
        },
      );
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
};

export const getPlayingPlayersList = async (
  tournamentId,
  matchId,
  team1Id,
  team2Id,
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/match/live-score-simplified?tournamentId=${tournamentId}&matchId=${matchId}&teamId=${team1Id}&team2Id=${team2Id}`,
    );
    const data = response.data;
    return data;
  } catch (error) {
    return error.response.data;
  }
};
