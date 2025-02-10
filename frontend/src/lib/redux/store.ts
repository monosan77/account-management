import { configureStore } from '@reduxjs/toolkit';
import modalOpenReducer from './modalOpen';
import allAccountReducer from './Account/allAccount';
import { getAllAccountApi } from './Account/Account.service';

export const makeStore = () => {
  return configureStore({
    reducer: {
      modalOpen: modalOpenReducer,
      allAccount: allAccountReducer,
      [getAllAccountApi.reducerPath]: getAllAccountApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(getAllAccountApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
