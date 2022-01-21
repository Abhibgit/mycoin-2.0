import React from "react";
import Watchlist from "../../components/Watchlist/Watchlist";
import Profile from "../../components/Profile/Profile";

function ProfilePage(props) {
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
