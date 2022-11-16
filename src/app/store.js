import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../pages/components/Auth/userSlice.js'
import videoReducer from './videoSlice'
import langReducer from './langSlice'

const rootReducer = {
  user: userReducer,
  video: videoReducer,
  language: langReducer
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;