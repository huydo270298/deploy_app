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
    localStorage.setItem(StorageKeys.AUTH, JSON.stringify(data.data));
    const auth = JSON.parse(localStorage.getItem(StorageKeys.AUTH));
    if (auth) {
      auth.roleName === 'ADMIN' &&
      localStorage.setItem(StorageKeys.ADMIN, JSON.stringify(data.data)); 
      auth.roleName === 'USER' &&
      localStorage.setItem(StorageKeys.USER, JSON.stringify(data.data));
    } 

    // if (data.data.roleName === 'ADMIN') {
    //   localStorage.setItem(StorageKeys.ADMIN, JSON.stringify(data.data));
    // }

    //return user data
    return data;
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
      localStorage.removeItem(StorageKeys.AUTH)
      // localStorage.removeItem(StorageKeys.TOKEN)

      state.current = {};
    }
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      console.log(action);
      if (action.payload.data) {
        state.user = action.payload.data.id
      }
    },
    [login.fulfilled]: (state, action) => {
      
      if (action.payload.data?.roleName === 'USER') {
        state.user = action.payload.data.id
      }

      if (action.payload.data?.roleName === 'ADMIN') {
        state.admin = action.payload.data.id
      }
    },
  }
});
const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer