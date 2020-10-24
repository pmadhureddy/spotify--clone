import { createSlice } from "@reduxjs/toolkit";

export const playlistSlice = createSlice({
  name: "playlist",
  initialState: {
    playlist: null,
  },
  reducers: {
    setPlaylist: (state, action) => {
      console.log(action)
      state.playlist = action.payload;
    },
  },
});

export const { setPlaylist } = playlistSlice.actions;

export const selectPlaylist = (state) => state.playlist;

export default playlistSlice.reducer;
