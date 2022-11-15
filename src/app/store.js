import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../pages/components/Auth/userSlice.js'
import videoReducer from './videoSlice'

const rootReducer = {
  user: userReducer,
  video: videoReducer
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;