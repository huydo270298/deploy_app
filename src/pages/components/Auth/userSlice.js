import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../../api/userApi';
import StorageKeys from '../../../constants/storage-keys.js'

export const register = createAsyncThunk(
  'users/register',
  async (payload) => {
    const data = await userApi.register(payload);

    //save data to local storage
    // localStorage.setItem(StorageKeys.TOKEN, data.jwt);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.data));

    //return user data
    return data;
  }
)

export const login = createAsyncThunk(
  'users/login',
  async (payload) => {
    const data = await userApi.login(payload);

    //save data to local storage
    // localStorage.setItem(StorageKeys.TOKEN, data.jwt);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.data));

    //return user data
    return data;
  }
)

export const update = createAsyncThunk(
  'users/update',
  async (payload) => {
    const data = await userApi.put(payload);
    console.log(data);

    //return user data
    return data;
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: {data: JSON.parse(localStorage.getItem(StorageKeys.USER))} || {},
    settings: {},
  },
  reducers: {
    logout(state) {
      //clear local storage
      localStorage.removeItem(StorageKeys.USER)
      // localStorage.removeItem(StorageKeys.TOKEN)

      state.current = {};
    }
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.current = action.payload
    },
    [login.fulfilled]: (state, action) => {
      state.current = action.payload
    },
  }
});
const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer