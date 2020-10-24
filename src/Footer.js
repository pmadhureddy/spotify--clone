import React from "react";
import "./Footer.css";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import { Grid, Slider } from "@material-ui/core";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setPlaying, setItem } from "./features/spotify/userSlice";

function Footer({ spotify }) {
  const dispatch = useDispatch();
  const { playing, item } = useSelector(selectUser);

  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((r) => {
      // console.log(r);

      dispatch(setPlaying(r.is_playing));
      console.log(r.item);
      dispatch(setItem(r.item));
    });
  }, [spotify, playing]);

  const handlePlayPause = () => {
    if (playing) {
      console.log(playing);
      spotify.pause();
      dispatch(setPlaying({ playing: false }));
    } else {
      spotify.play();
      dispatch(setPlaying({ playing: true }));
    }
  };

  const skipNext = () => {
    spotify.skipToNext();
    spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch(setItem({ item: r.item }));
      dispatch(setPlaying({ playing: true }));
    });
  };

  const skipPrevious = () => {
    spotify.skipToPrevious();
    spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch(setItem({ item: r.item }));
      dispatch(setPlaying({ playing: true }));
    });
  };
  return (
    <div className="footer">
      <div className="footer__left">
        <img
          className="footer__albumLogo"
          src={item?.album.images[0].url}
          alt={item?.name}
        />
        {item ? (
          <div className="footer__songInfo">
            <h4>{item.name}</h4>
            <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
          </div>
        ) : (
          <div className="footer__songInfo">
            <h4>No song is playing</h4>
            <p>...</p>
          </div>
        )}
      </div>

      <div className="footer__center">
        <ShuffleIcon className="footer__green" />
        <SkipPreviousIcon onClick={skipNext} className="footer__icon" />
        {playing ? (
          <PauseCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        ) : (
          <PlayCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize="large"
            className="footer__icon"
          />
        )}
        <SkipNextIcon onClick={skipPrevious} className="footer__icon" />
        <RepeatIcon className="footer__green" />
      </div>
      <div className="footer__right">
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
            <Slider
              aria-labelledby="continuous-slider"
              className="Muislider-root"
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
