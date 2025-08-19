import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RegisterUseCase } from '../../../application/auth/RegisterUseCase.js';
import LoginUseCase from '../../../application/auth/LoginUseCase.js';
import { AuthRepository } from '../../../data/persistence/auth/AuthRepository.js';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const authRepository = new AuthRepository();
      const registerUseCase = new RegisterUseCase(authRepository);
      return await registerUseCase.execute(userData);
    } catch (error) {
      const errorMessage = error.message || 'Failed to register';
      return rejectWithValue(errorMessage);
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const authRepository = new AuthRepository();
      const loginUseCase = new LoginUseCase(authRepository);
      const token = await loginUseCase.execute(credentials);
      // Optionally, fetch user data using the token if needed
      return { token };
    } catch (error) {
      const errorMessage = error.message || 'Failed to login';
      return rejectWithValue(errorMessage);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // No direct actions needed for registration
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
        // Assuming token is handled elsewhere or not directly returned by the use case
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.error = null;
        // Optionally, set user data if fetched during login
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.token = null;
        state.user = null;
      });
  },
});

export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;

export default authSlice.reducer;
