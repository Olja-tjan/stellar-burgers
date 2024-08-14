import { fetchWithRefresh, forgotPasswordApi, getUserApi, loginUserApi, logoutApi, refreshToken, registerUserApi, resetPasswordApi, updateUserApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

// export const refreshTokenThunk = createAsyncThunk(
//   'user/refreshToken',
//   async () => refreshToken()
// )

// export const fetchWithRefreshThunk = createAsyncThunk(
//   'user/fetchWithRefresh',
//   async () => fetchWithRefresh()
// )

// export const registerUserThunk = createAsyncThunk(
//   'user/registerUser',
//   async () => registerUserApi()
// )

// export const loginUserThunk = createAsyncThunk(
//   'user/loginUser',
//   async () => loginUserApi()
// )

export const getUserThunk = createAsyncThunk(
  'user/getUser',
  async () => getUserApi()
)

// export const updateUserThunk = createAsyncThunk(
//   'user/updateUser',
//   async () => updateUserApi()
// )

// export const logoutThunk = createAsyncThunk(
//   'user/logout',
//   async () => logoutApi()
// )

// export const forgotPasswordThunk = createAsyncThunk(
//   'user/forgotPassword',
//   async () => forgotPasswordApi()
// )

// export const resetPasswordThunk = createAsyncThunk(
//   'user/resetPassword',
//   async () => resetPasswordApi()
// )

interface UserState {
  isLoading: boolean,
  user: TUser
}

const initialState: UserState = {
  isLoading: false,
  user: {
    email: '',
    name: ''
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectLoadUser: (sliceState) => sliceState.isLoading,
    selectUser: (sliceState) => sliceState.user
  },
  extraReducers: (builder) => {
    builder
    .addCase(getUserThunk.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getUserThunk.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(getUserThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user
    })
  }
})

export const { selectLoadUser, selectUser } = userSlice.selectors;

export default userSlice.reducer;
