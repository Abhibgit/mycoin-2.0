import React, { useState } from "react";
import Watchlist from "../../components/Watchlist/Watchlist";
import Profile from "../../components/Profile/Profile";

function ProfilePage(props) {
  console.log("Profile Page" + props);
  return (
    <div>
      <Profile
        user={props.user}
        setUserInState={props.setUserInState}
      ></Profile>
    </div>
  );
}

export default ProfilePage;
