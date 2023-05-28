import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { accountApi } from '../api/accountApi';
import userSlice from '../api/userSlice';
import shortUrlApi from 'src/api/shortUrlApi';

export const store = configureStore({
  reducer: {
    [accountApi.reducerPath]: accountApi.reducer,
    [shortUrlApi.reducerPath]: shortUrlApi.reducer,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(accountApi.middleware)
      .concat(shortUrlApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
