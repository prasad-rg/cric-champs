import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {loginUser, registerUser} from '../services/auth';
import {setToken} from '../utils/token';

export const userLogin = createAsyncThunk('user/login', async userData => {
  try {
    const response = await loginUser(userData);

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
  },
);

// export const userLogout = createAsyncThunk('user/logout', async userData => {
//   try {
//     const response = await registerUser(userData);
//     // console.log(response);
//     if (response.status === 200) {
//       const headers = response.headers;
//       let stringifiedToken = JSON.stringify({
//         accessToken: headers.authorization,
//         refreshToken: headers['refresh-token'],
//       });
//       const isSecurelyStored = await setToken(stringifiedToken);
//       if (isSecurelyStored) {
//         return true;
//       } else {
//         return false;
//       }
//     } else {
//       return {error: response};
//     }
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// });

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
      state.user = [];
      state.accessToken = null;
      state.isLoading = false;
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
  },
});

export const {logout, changeInitialLaunchStatus} = userSlice.actions;
export default userSlice.reducer;
