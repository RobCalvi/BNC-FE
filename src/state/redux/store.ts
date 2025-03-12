import { configureStore } from '@reduxjs/toolkit';
import dashboardSlice from './features/dashboardSlice';


const store = configureStore({
  reducer: {
    dashboard: dashboardSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
