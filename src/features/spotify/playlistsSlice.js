import { createSlice } from "@reduxjs/toolkit";

export const playlistsSlice = createSlice({
  name: "playlists",
  initialState: {
    playlists: [],
  },
  reducers: {
    setPlaylists: (state, action) => {
      state.playlists = action.payload;
    },
  },
});

export const { setPlaylists } = playlistsSlice.actions;

export const selectPlaylists = (state) => state.playlists;

export default playlistsSlice.reducer;
