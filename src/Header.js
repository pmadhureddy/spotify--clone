import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "./features/spotify/userSlice";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

function Header() {
  const { user } = useSelector(selectUser);

  return (
    <div className="header">
      <div className="header__left">
        <SearchIcon className="header__searchIcon" />
        <input
          className="header__searchInput"
          type="text"
          placeholder="search for Artists, Songs"
        />
      </div>
      <div className="header__right">
        <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
        <h4>{user?.display_name}</h4>
        <ArrowDropDownIcon />
      </div>
    </div>
  );
}

export default Header;
