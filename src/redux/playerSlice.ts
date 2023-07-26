import { createSlice } from "@reduxjs/toolkit";

export interface PlayerState {
  random: boolean;
  alwaysShowPrimary: boolean;
  autoplay: boolean;
  autoplaySpeed: number;
  animation: number;
}

const initialState: PlayerState = {
  random: false,
  alwaysShowPrimary: false,
  autoplay: false,
  autoplaySpeed: 2000,
  animation: 1000,
};

const ANIMATION_STEP = 100;

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    toggleRandom: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.random = !state.random;
    },
    incrementAnimation: (state) => {
      state.animation += ANIMATION_STEP;
    },
    decrementAnimation: (state) => {
      if (state.animation - ANIMATION_STEP > 0) {
        state.animation -= ANIMATION_STEP;
      }
    },
    toggleAlwaysShowPrimary: (state) => {
      state.alwaysShowPrimary = !state.alwaysShowPrimary;
    },
    toggleAutoplay: (state) => {
      state.autoplay = !state.autoplay;
    },
    incrementAutoplaySpeed: (state) => {
      state.autoplaySpeed += ANIMATION_STEP;
    },
    decrementAutoplaySpeed: (state) => {
      if (state.autoplaySpeed - ANIMATION_STEP > 0) {
        state.autoplaySpeed -= ANIMATION_STEP;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  toggleRandom,
  incrementAnimation,
  decrementAnimation,
  toggleAlwaysShowPrimary,
  toggleAutoplay,
  incrementAutoplaySpeed,
  decrementAutoplaySpeed,
} = playerSlice.actions;

export default playerSlice.reducer;
