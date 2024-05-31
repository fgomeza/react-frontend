import { configureStore } from "@reduxjs/toolkit";
import CounterSliceReducer from "./CounterSlice";

export const store = configureStore({
  reducer: {
    counter: CounterSliceReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch