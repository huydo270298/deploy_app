import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const play = createAsyncThunk(
  'video/play',
  (id) => {
    localStorage.setItem('idVideo', id); 
    return id;
  }
)

const videoReducer = createSlice({
  name: 'video',
  initialState: {
    videoId: localStorage.getItem('idVideo') || null
  },
  reducers: {},
  extraReducers: {
    [play.fulfilled]: (state, action) => {
      state.videoId = action.payload
    },
  }
});
const { actions, reducer } = videoReducer;
export const { logout } = actions;
export default reducer