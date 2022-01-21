import React from "react";
import Watchlist from "../../components/Watchlist/Watchlist";
import Profile from "../../components/Profile/Profile";
import { useLocation, useNavigate } from "react-router-dom";

function ProfilePage(props) {
  const { state } = useLocation();
  // console.log("Profile Page", state);
  let user = "";
  let setUserInState = "";
  if (state === null) {
    user = props.user;
    setUserInState = props.setUserInState;
  } else {
    user = state.user;
    setUserInState = state.setUserInState;
  }

  return (
    <div>
      <Profile user={user} setUserInState={setUserInState}></Profile>
    </div>
  );
}

export default ProfilePage;
