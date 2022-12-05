import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  getNewAccessToken,
  loginUser,
  logoutUser,
  registerUser,
} from '../services/auth';
import {setToken, getToken, deleteToken} from '../utils/token';

export const userLogin = createAsyncThunk('user/login', async userData => {
  try {
    const response = await loginUser(userData);
    console.log(response);
    if (response.status === 200) {
      const headers = response.headers;
      let stringifiedToken = JSON.stringify({
        accessToken: headers.authorization,
        refreshToken: headers['refresh-token'],
      });
      const isSecurelyStored = await setToken(stringifiedToken);
      if (isSecurelyStored) {
        return true;
      } else {
        return false;
      }
    } else {
      return {error: response};
    }
  } catch (error) {
    console.log(error);
    return error;
  }
});

export const userRegister = createAsyncThunk(
  'user/register',
  async userData => {
    try {
      const response = await registerUser(userData);
      console.warn(response);
      if (response.status === 200) {
        const headers = response.headers.map;
        let stringifiedToken = JSON.stringify({
          accessToken: headers.authorization,
          refreshToken: headers['refresh-token'],
        });
        // console.log(headers);
        // console.warn(stringifiedToken);
        const isSecurelyStored = await setToken(stringifiedToken);
        if (isSecurelyStored) {
          return true;
        } else {
          return false;
        }
      } else {
        return {error: response};
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  },
);

export const userLogout = createAsyncThunk('user/logout', async () => {
  try {
    const response = await logoutUser();
    // console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: null,
    isLoading: null,
    error: [],
    isInitialAppLaunch: true,
  },
  reducers: {
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.isLoading = false;
      // state.error = 'Error In Logging Out';
    },
    changeInitialLaunchStatus: state => {
      state.isInitialAppLaunch = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(userLogin.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      if (action.payload?.error) {
        state.error = action.payload.error;
        state.isLoggedIn = false;
        state.isLoading = false;
      } else {
        state.isLoggedIn = action.payload;
        state.error = null;
        state.isLoading = false;
      }
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(userRegister.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(userRegister.fulfilled, (state, action) => {
      if (action.payload?.error) {
        state.error = action.payload.error;
        state.isLoggedIn = false;
        state.isLoading = false;
      } else {
        state.isLoggedIn = action.payload;
        state.error = null;
        state.isLoading = false;
      }
    });
    builder.addCase(userRegister.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(userLogout.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(userLogout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.error = null;
    });
    builder.addCase(userLogout.rejected, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.error = action.payload;
    });
  },
});

export const {logout, changeInitialLaunchStatus} = userSlice.actions;
export default userSlice.reducer;
