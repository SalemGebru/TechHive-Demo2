import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice'
import profileReducer from './features/profileSlice'
import idReducer from './features/idCardSlice'
import organizationReducer from './features/organizationSlice';

const store = configureStore({
  reducer: {
    user:userReducer,
    profile:profileReducer,
    idCard:idReducer,
    organization:organizationReducer
  },
});

export default store;
