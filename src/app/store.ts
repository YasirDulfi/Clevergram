import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
 import loginReducer from '../features/login/loginSlice';
import homeReducer from '../features/home/homeSlice';

export const store = configureStore({
  reducer: {
    home: homeReducer,
    login: loginReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
