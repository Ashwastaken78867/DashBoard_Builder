// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import widgetsReducer from './widgetsSlice';

const store = configureStore({
  reducer: {
    widgets: widgetsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
