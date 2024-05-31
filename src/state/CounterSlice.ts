import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.value += 1;
    },
    decrement: (state, action) => {
      state.value -= 1;
    },
    incrementBy: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    decrementBy: (state, action: PayloadAction<number>) => {
      state.value -= action.payload;
    },
  },
});

export const incrementAsync = createAsyncThunk(
  "counter/"
)

export const { increment, decrement, incrementBy, decrementBy } = counterSlice.actions;

export default counterSlice.reducer;
