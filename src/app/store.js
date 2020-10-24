import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/spotify/userSlice";
import playlistsSlice from "../features/spotify/playlistsSlice";
import playlistSlice from "../features/spotify/playlistSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    playlists: playlistsSlice,
    playlist: playlistSlice,
  },
});
