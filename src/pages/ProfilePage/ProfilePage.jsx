import React from "react";
import Profile from "../../components/Profile/Profile";
import { useLocation, useNavigate } from "react-router-dom";
import Watchlist from "../../components/Watchlist/Watchlist";
import { Grid } from "@mui/material";

function ProfilePage(props) {
  const { state } = useLocation();
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
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="left"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={8} style={{ margin: 50 }}>
          <Profile user={user} setUserInState={setUserInState} />
        </Grid>
        <Grid item xs={2} style={{ margin: 50 }}>
          <Watchlist
            coinWatchlist={props.coinWatchlist}
            deleteWatchItem={props.deleteWatchItem}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfilePage;
