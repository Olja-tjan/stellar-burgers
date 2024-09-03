import {
  checkedUserAuthThunk,
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
  updateUserThunk,
  userSlice,
  UserState
} from '../services/slices/userSlice';

describe('Проверка работы userSlice', function () {
  const initialState: UserState = {
    isAuthChecked: false,
    isLoading: false,
    user: null
  };

  // Запрос registerUserThunk:
  it('В запросе registerUserThunk, изменение isLoading на true при отправке pending', function () {
    const actualState = {
      isAuthChecked: false,
      isLoading: true,
      user: null
    };
    const newState = userSlice.reducer(
      { ...initialState },
      registerUserThunk.pending('', { email: '', name: '', password: '' })
    );
    expect(newState).toEqual(actualState);
  });

  it('В запросе registerUserThunk, получение ошибки и изменение isLoading на false при отправке rejected', function () {
    const actualState = {
      isAuthChecked: true,
      isLoading: false,
      user: null
    };
    const testError = new Error('test error message');
    const newState = userSlice.reducer(
      { ...initialState },
      registerUserThunk.rejected(testError, '', {
        email: '',
        name: '',
        password: ''
      })
    );
    expect(newState).toEqual(actualState);
  });

  it('В запросе registerUserThunk, обновление данных ингридиентов и изменение isLoading на false при отправке fulfilled', function () {
    const testDataUser = {
      success: true,
      accessToken: 'Bearer testToken',
      refreshToken: 'testToken',
      user: {
        email: 'test@mail.ru',
        name: 'TestUser'
      }
    };
    const actualState = {
      isAuthChecked: true,
      isLoading: false,
      user: testDataUser.user
    };
    const newState = userSlice.reducer(
      { ...initialState },
      registerUserThunk.fulfilled(testDataUser, '', {
        email: 'test@mail.ru',
        name: 'TestUser',
        password: 'testPassword'
      })
    );
    expect(newState).toEqual(actualState);
  });

  // Запрос loginUserThunk:
  it('В запросе loginUserThunk, изменение isLoading на true при отправке pending', function () {
    const actualState = {
      isAuthChecked: false,
      isLoading: true,
      user: null
    };
    const newState = userSlice.reducer(
      { ...initialState },
      loginUserThunk.pending('', { email: '', password: '' })
    );
    expect(newState).toEqual(actualState);
  });

  it('В запросе loginUserThunk, получение ошибки и изменение isLoading на false при отправке rejected', function () {
    const actualState = {
      isAuthChecked: true,
      isLoading: false,
      user: null
    };
    const testError = new Error('test error message');
    const newState = userSlice.reducer(
      { ...initialState },
      loginUserThunk.rejected(testError, '', {
        email: '',
        password: ''
      })
    );
    expect(newState).toEqual(actualState);
  });

  it('В запросе loginUserThunk, обновление данных ингридиентов и изменение isLoading на false при отправке fulfilled', function () {
    const testDataUser = {
      success: true,
      accessToken: 'Bearer testToken',
      refreshToken: 'testToken',
      user: {
        email: 'test@mail.ru',
        name: 'TestUser'
      }
    };
    const actualState = {
      isAuthChecked: true,
      isLoading: false,
      user: testDataUser.user
    };
    const newState = userSlice.reducer(
      { ...initialState },
      loginUserThunk.fulfilled(testDataUser, '', {
        email: 'test@mail.ru',
        password: 'testPassword'
      })
    );
    expect(newState).toEqual(actualState);
  });

  // Запрос checkedUserAuthThunk:
  it('В запросе checkedUserAuthThunk, изменение isLoading на true при отправке pending', function () {
    const actualState = {
      isAuthChecked: false,
      isLoading: true,
      user: null
    };
    const newState = userSlice.reducer(
      { ...initialState },
      checkedUserAuthThunk.pending('')
    );
    expect(newState).toEqual(actualState);
  });

  it('В запросе checkedUserAuthThunk, получение ошибки и изменение isLoading на false при отправке rejected', function () {
    const actualState = {
      isAuthChecked: true,
      isLoading: false,
      user: null
    };
    const testError = new Error('test error message');
    const newState = userSlice.reducer(
      { ...initialState },
      checkedUserAuthThunk.rejected(testError, '')
    );
    expect(newState).toEqual(actualState);
  });

  it('В запросе checkedUserAuthThunk, обновление данных ингридиентов и изменение isLoading на false при отправке fulfilled', function () {
    const testDataUser = {
      success: true,
      accessToken: 'Bearer testToken',
      refreshToken: 'testToken',
      user: {
        email: 'test@mail.ru',
        name: 'TestUser'
      }
    };
    const actualState = {
      isAuthChecked: true,
      isLoading: false,
      user: testDataUser.user
    };
    const newState = userSlice.reducer(
      { ...initialState },
      checkedUserAuthThunk.fulfilled(testDataUser, '')
    );
    expect(newState).toEqual(actualState);
  });

  // Запрос updateUserThunk:
  it('В запросе updateUserThunk, изменение isLoading на true при отправке pending', function () {
    const actualState = {
      isAuthChecked: false,
      isLoading: true,
      user: null
    };
    const newState = userSlice.reducer(
      { ...initialState },
      updateUserThunk.pending('', { email: '', name: '', password: '' })
    );
    expect(newState).toEqual(actualState);
  });

  it('В запросе updateUserThunk, получение ошибки и изменение isLoading на false при отправке rejected', function () {
    const actualState = {
      isAuthChecked: true,
      isLoading: false,
      user: null
    };
    const testError = new Error('test error message');
    const newState = userSlice.reducer(
      { ...initialState },
      updateUserThunk.rejected(testError, '', {
        email: '',
        name: '',
        password: ''
      })
    );
    expect(newState).toEqual(actualState);
  });

  it('В запросе updateUserThunk, обновление данных ингридиентов и изменение isLoading на false при отправке fulfilled', function () {
    const testDataUser = {
      success: true,
      accessToken: 'Bearer testToken',
      refreshToken: 'testToken',
      user: {
        email: 'test@mail.ru',
        name: 'TestUser'
      }
    };
    const actualState = {
      isAuthChecked: true,
      isLoading: false,
      user: testDataUser.user
    };
    const newState = userSlice.reducer(
      { ...initialState },
      updateUserThunk.fulfilled(testDataUser, '', {
        email: 'test@mail.ru',
        name: 'TestUser',
        password: 'testPassword'
      })
    );
    expect(newState).toEqual(actualState);
  });

  // Запрос logoutUserThunk:
  it('В запросе logoutUserThunk, изменение isLoading на true при отправке pending', function () {
    const actualState = {
      isAuthChecked: false,
      isLoading: true,
      user: null
    };
    const newState = userSlice.reducer(
      { ...initialState },
      logoutUserThunk.pending('')
    );
    expect(newState).toEqual(actualState);
  });

  it('В запросе logoutUserThunk, получение ошибки и изменение isLoading на false при отправке rejected', function () {
    const actualState = {
      isAuthChecked: true,
      isLoading: false,
      user: null
    };
    const testError = new Error('test error message');
    const newState = userSlice.reducer(
      { ...initialState },
      logoutUserThunk.rejected(testError, '')
    );
    expect(newState).toEqual(actualState);
  });

  it('В запросе logoutUserThunk, обновление данных ингридиентов и изменение isLoading на false при отправке fulfilled', function () {
    const actualState = {
      isAuthChecked: true,
      isLoading: false,
      user: null
    };
    const newState = userSlice.reducer(
      { ...initialState },
      logoutUserThunk.fulfilled({ success: true }, '')
    );
    expect(newState).toEqual(actualState);
  });
});
