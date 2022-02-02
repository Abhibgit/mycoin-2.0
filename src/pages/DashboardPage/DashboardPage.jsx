import React from "react";
import TopCoins from "../../components/TopCoins/TopCoins";
import { Grid } from "@mui/material";

import AuthPage from "../AuthPage/AuthPage";

function DashboardPage(props) {
  return (
    <>
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        {props.user ? (
          <Grid item xs={12}>
            <TopCoins
              topTenCoins={props.topTenCoins}
              coinList={props.coinList}
              saveWatchlistCoin={props.saveWatchlistCoin}
            />
          </Grid>
        ) : (
          <Grid item xs={12}>
            <AuthPage setUserInState={props.setUserInState} />
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default DashboardPage;
