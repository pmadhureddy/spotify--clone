import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    playing: false,
    top_artists: null,
    item: null,
  },
  reducers: {
    setUser: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },

    setPlaying: (state, action) => {
      state.playing = action.payload;
    },

    setItem: (state, action) => {
      console.log(action);
      state.item = action.payload;
    },

    setTopArtists: (state, action) => {
      state.top_artists = action.top_artists;
    },
  },
});

export const {
  setUser,
  setToken,
  setPlaying,
  setItem,
  setTopArtists,
} = userSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUser = (state) => state.user;

export default userSlice.reducer;
