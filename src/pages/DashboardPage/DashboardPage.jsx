import React from "react";
import TopCoins from "../../components/TopCoins/TopCoins";
import { Grid } from "@mui/material";
import AuthPage from "../AuthPage/AuthPage";
import Watchlist from "../../components/Watchlist/Watchlist";

function DashboardPage(props) {
  return (
    <>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="left"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={8} style={{ margin: 50 }}>
          <TopCoins
            topTenCoins={props.topTenCoins}
            coinList={props.coinList}
            saveWatchlistCoin={props.saveWatchlistCoin}
          />
        </Grid>
        <Grid item xs={2} style={{ margin: 50 }}>
          <Watchlist
            coinWatchlist={props.coinWatchlist}
            deleteWatchItem={props.deleteWatchItem}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default DashboardPage;
