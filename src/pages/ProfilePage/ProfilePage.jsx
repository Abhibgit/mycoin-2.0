import React from "react";
import Profile from "../../components/Profile/Profile";
import { useLocation } from "react-router-dom";
import Watchlist from "../../components/Watchlist/Watchlist";
import { Grid } from "@mui/material";
import TopCoins from "../../components/TopCoins/TopCoins";

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
      <Grid container spacing={4} direction="row" justifyContent="center">
        <Grid item xs={11} md={6} sx={{ marginTop: { xs: 4, md: 2 } }}>
          <Profile user={user} setUserInState={setUserInState} />
        </Grid>
        <Grid item xs={11} md={5} sx={{ marginTop: { md: 2 } }}>
          <Watchlist
            coinWatchlist={props.coinWatchlist}
            deleteWatchItem={props.deleteWatchItem}
          />
        </Grid>
        <Grid
          item
          xs={11}
          sx={{ display: { xs: "none", sm: "block", md: "block" } }}
        >
          <TopCoins
            topTenCoins={props.topTenCoins}
            coinList={props.coinList}
            saveWatchlistCoin={props.saveWatchlistCoin}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfilePage;
