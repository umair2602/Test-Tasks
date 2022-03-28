import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { creatorReducer } from "../store-feature/saCreator";

export const store = configureStore({
  reducer: {
    creator: creatorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
