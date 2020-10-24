import React, { useEffect } from "react";
// import { Counter } from './features/counter/Counter';
import "./App.css";
import Login from "./Login";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Player";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  setToken,
  setTopArtists,
  setUser,
} from "./features/spotify/userSlice";
import { setPlaylists } from "./features/spotify/playlistsSlice";
import { setPlaylist } from "./features/spotify/playlistSlice";

const spotify = new SpotifyWebApi();

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector(selectUser);

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      dispatch(setToken(_token));
      spotify.setAccessToken(_token);

      spotify.getMe().then((user) => {
        dispatch(setUser(user));
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch(setPlaylists(playlists));
      });
      spotify.getPlaylist("3Hli1aUfLhXnaz5wBSJ60B").then((response) => {
        dispatch(setPlaylist(response));
      });

      spotify.getMyTopArtists().then((response) => {
        dispatch(setTopArtists(response));
      });
    }
  }, [token, dispatch]);

  return (
    <div className="app">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
