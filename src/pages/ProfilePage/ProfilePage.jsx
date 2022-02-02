import React from "react";
import Profile from "../../components/Profile/Profile";
import { useLocation, useNavigate } from "react-router-dom";
import WatchlistPage from "../WatchlistPage/WatchListPage";

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
      <WatchlistPage
        coinList={props.coinList}
        coinWatchlist={props.coinWatchlist}
        saveWatchlistCoin={props.saveWatchlistCoin}
        coinWatchSymbol={props.coinWatchSymbol}
        updateParams={props.updateParams}
        coinState={props.coinState}
        deleteWatchItem={props.deleteWatchItem}
      />
    </div>
  );
}

export default ProfilePage;
