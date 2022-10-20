import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../pages/components/userSlice'

const rootReducer = {
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;