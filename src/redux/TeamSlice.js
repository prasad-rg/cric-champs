import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';


export const loginUser = async userData => {
    try {
      const response = await axios.post(`${BASE_URL}/api/user/login`, userData);
      return response;
    } catch (error) {
      return error.response.data.message;
    }
  };

  
export const createTournament = createAsyncThunk('user/login', async userData => {

})