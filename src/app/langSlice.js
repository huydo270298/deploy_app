import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const change = createAsyncThunk(
  'language/change',
  (id) => {
    localStorage.setItem('i18nextLng', id); 
    return id;
  }
)

const langReducer = createSlice({
  name: 'language',
  initialState: {
    current: localStorage.getItem('i18nextLng') || 'en'
  },
  reducers: {},
  extraReducers: {
    [change.fulfilled]: (state, action) => {
      state.videoId = action.payload
    },
  }
});
const { reducer } = langReducer;
export default reducer