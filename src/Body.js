import React from "react";
import "./Body.css";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { selectPlaylist } from "./features/spotify/playlistSlice";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SongRow from "./SongRow";
import { setItem, setPlaying } from "./features/spotify/userSlice";

function Body({ spotify }) {
  const { playlist } = useSelector(selectPlaylist);
  const dispatch = useDispatch();

  const playPlaylist = () => {
    spotify
      .play({
        context_uri: `spotify:playlist:3Hli1aUfLhXnaz5wBSJ60B`,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch(setItem(r.item));
          dispatch(setPlaying({ playing: true }));
        });
      });
    }
    const playSong = (id) => {
      spotify
        .play({
          uris: [`spotify:track:${id}`],
        })
        .then((res) => {
          spotify.getMyCurrentPlayingTrack().then((r) => {
            dispatch(setItem({ item: r.item }));
            dispatch(setPlaying({ playing: true }));
          });
        });
    };
    return (
      <div className="body">
        <Header spotify={spotify} />
        <div className="body__info">
          <img className="body__logo" src={playlist?.images[0].url} alt="" />
          <div className="body__infoText">
            <strong>PLAYLIST</strong>
            <h2>Melody</h2>
            <p>{playlist?.description}</p>
          </div>
        </div>
        <div className="body__songs">
          <div className="body__icons">
            <PlayCircleFilledIcon
              className="body__shuffle"
              onClick={playPlaylist}
            />
            <FavoriteIcon fontSize="large" className="body__favourite" />
            <MoreHorizIcon />
          </div>
          <div>
            {playlist?.tracks.items.map((item) => (
              <SongRow playSong={playSong} track={item.track} />
            ))}
          </div>
        </div>
      </div>
    );
  };

export default Body;
