import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RegisterUseCase } from '../../../application/auth/RegisterUseCase.js';
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
      });
  },
});

export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthUser = (state) => state.auth.user;

export default authSlice.reducer;
