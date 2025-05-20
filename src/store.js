import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice'
import profileReducer from './features/profileSlice'
import idReducer from './features/idCardSlice'
import organizationReducer from './features/organizationSlice';
import regionReducer from './features/regionSlice';
import zoneReducer from './features/zoneSlice'
import woredaReducer from './features/woredaSlice'
import salaryReducer from './features/salarySlice'
import maritalStatusReducer from './features/maritalStatusSlice'

const store = configureStore({
  reducer: {
    user:userReducer,
    profile:profileReducer,
    idCard:idReducer,
    organization:organizationReducer,
    region:regionReducer,
    zone:zoneReducer,
    woreda:woredaReducer,
    salary:salaryReducer,
    maritalStatus:maritalStatusReducer
  },
});

export default store;
