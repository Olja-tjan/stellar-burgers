import {
  TLoginData,
  TRegisterData,
  TUserResponse,
  getUserApi,
  registerUserApi,
  loginUserApi,
  updateUserApi,
  logoutApi
} from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { USER_SLICE_NAME } from '../../utils/constants';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const checkedUserAuthThunk = createAsyncThunk(
  `${USER_SLICE_NAME}/checkUser`,
  async () => getUserApi()
);


// export const registerUserThunk = createAsyncThunk(
//   `${USER_SLICE_NAME}/registerUser`,
//   async ({ email, name, password }: TRegisterData) => {
//     const data = await registerUserApi({ email, name, password });
//     if (!data?.success) return data.user;
//     setCookie('accessToken', data.accessToken);
//     localStorage.setItem('refreshToken', data.refreshToken);
//     return data.user;
//   }
// )

// export const loginUserThunk = createAsyncThunk(
//   `${USER_SLICE_NAME}/loginUser`,
//   async ({ email, password }: TLoginData) => {
//     const data = await loginUserApi({ email, password });
//     if (!data?.success) return data.user;
//     setCookie('accessToken', data.accessToken);
//     localStorage.setItem('refreshToken', data.refreshToken);
//     return data.user;
//   }
// )

export const registerUserThunk = createAsyncThunk(
  `${USER_SLICE_NAME}/registerUser`,
  ({ email, name, password }: TRegisterData) =>
    registerUserApi({ email, name, password }).then((res) => {
      setCookie('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      return res.user;
    })
)

export const loginUserThunk = createAsyncThunk(
  `${USER_SLICE_NAME}/loginUser`,
  ({ email, password }: TLoginData) =>
    loginUserApi({ email, password }).then((res) => {
      setCookie('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      return res.user;
    })
)

export const updateUserThunk = createAsyncThunk(
  `${USER_SLICE_NAME}/updateUser`,
  async ({ email, name, password }: TRegisterData) => {
    return await updateUserApi({ email, name, password });
  }
)

export const logoutUserThunk = createAsyncThunk(
  `${USER_SLICE_NAME}/logoutUser`,
  async () => {
    logoutApi().then(() => {
      localStorage.clear();
      deleteCookie('accessToken');
    });
  })

interface UserState {
  isAuthChecked: boolean,
  isLoading: boolean,
  user: TUser | null
}

const initialState: UserState = {
  isAuthChecked: false,
  isLoading: false,
  user: null
}

export const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {},
  selectors: {
    selectUser: (sliceState: UserState) => sliceState.user,
    selectIsAuthChecked: (sliceState: UserState) => sliceState.isAuthChecked,
    selectUserName: (sliceState: UserState) => sliceState.user?.name
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
        state.isAuthChecked = false;
      })
      .addCase(registerUserThunk.rejected, (state) => {
        state.isLoading = false;
        state.isAuthChecked = true;
      })
      .addCase(registerUserThunk.fulfilled,
        (state, action: PayloadAction<TUser>) => {
          state.isLoading = false;
          state.isAuthChecked = true;
          state.user = action.payload;
        })

      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true
        state.isAuthChecked = false;
      })
      .addCase(loginUserThunk.rejected, (state) => {
        state.isLoading = false
        state.isAuthChecked = true;
      })
      .addCase(loginUserThunk.fulfilled,
        (state, action: PayloadAction<TUser>) => {
          state.isLoading = false
          state.isAuthChecked = true;
          state.user = action.payload;
        })

      .addCase(checkedUserAuthThunk.pending, (state) => {
        state.isLoading = true;
        state.isAuthChecked = false;
      })
      .addCase(checkedUserAuthThunk.rejected, (state) => {
        state.isLoading = false;
        state.isAuthChecked = true;
      })
      .addCase(checkedUserAuthThunk.fulfilled,
        (state, action: PayloadAction<TUserResponse>) => {
          state.isLoading = false;
          state.isAuthChecked = true;
          state.user = action.payload.user
        })

      .addCase(updateUserThunk.pending, (state) => {
        state.isLoading = true
        state.isAuthChecked = false;
      })
      .addCase(updateUserThunk.rejected, (state) => {
        state.isLoading = false
        state.isAuthChecked = true;
      })
      .addCase(updateUserThunk.fulfilled,
        (state, action: PayloadAction<TUserResponse>) => {
          state.isLoading = false
          state.isAuthChecked = true;
          state.user = action.payload.user;
        })

      .addCase(logoutUserThunk.pending, (state) => {
        state.isLoading = true
        state.isAuthChecked = false;
      })
      .addCase(logoutUserThunk.rejected, (state) => {
        state.isLoading = false
        state.isAuthChecked = true;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false
        state.isAuthChecked = true;
      })
  }
})

export const { selectUser, selectIsAuthChecked, selectUserName } = userSlice.selectors;
