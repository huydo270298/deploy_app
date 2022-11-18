import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../../api/userApi';
import StorageKeys from '../../../constants/storage-keys.js'

export const register = createAsyncThunk(
  'users/register',
  async (payload) => {
    const response = await userApi.register(payload);
    
    //save data to local storage
    // localStorage.setItem(StorageKeys.TOKEN, data.jwt);
    if(response.code === '01') {
      localStorage.setItem(StorageKeys.TOKEN, response.data.accessToken);
      localStorage.setItem(StorageKeys.USER, JSON.stringify(response.data.userInfo));
    }

    //return user data
    return response;
  }
)

export const login = createAsyncThunk(
  'users/login',
  async (payload) => {
    const response = await userApi.login(payload);
    //save data to local storage
    localStorage.setItem(StorageKeys.TOKEN, response.data.accessToken);
    if(response.code === '01') {
      if(response.data.userInfo.roleName === 'ADMIN') {
        localStorage.setItem(StorageKeys.ADMIN, JSON.stringify(response.data.userInfo))
      }

      if(response.data.userInfo.roleName === 'USER') {
        localStorage.setItem(StorageKeys.USER, JSON.stringify(response.data.userInfo));
      }
    }

    //return user data
    return response;
  }
)

export const update = createAsyncThunk(
  'users/update',
  async (payload) => {
    const data = await userApi.put(payload);

    //return user data
    return data;
  }
)

const userSlice = createSlice({
  name: 'author',
  initialState: {
    user: JSON.parse(localStorage.getItem(StorageKeys.USER))?.id || null,
    admin: JSON.parse(localStorage.getItem(StorageKeys.ADMIN))?.id || null,
  },
  reducers: {
    logout(state) {
      //clear local storage
      localStorage.removeItem(StorageKeys.USER)
      localStorage.removeItem(StorageKeys.ADMIN)
      localStorage.removeItem(StorageKeys.TOKEN)

      state.current = {};
    }
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      if (action.payload.data) {
        state.user = action.payload.data.userInfo.id
      }
    },
    [login.fulfilled]: (state, action) => {
      if (action.payload.data?.userInfo.roleName === 'USER') {
        state.user = action.payload.data.userInfo.id
      }

      if (action.payload.data?.userInfo.roleName === 'ADMIN') {
        state.admin = action.payload.data.userInfo.id
      }
    },
  }
});
const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer