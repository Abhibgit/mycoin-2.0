import React from "react";
import CoinInformation from "../../components/CoinProfile/CoinInformation";
import WatchlistPage from "../WatchlistPage/WatchListPage";
import { Grid } from "@mui/material";
import Watchlist from "../../components/Watchlist/Watchlist";
function CoinProfilePage(props) {
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
          <CoinInformation
            saveWatchlistCoin={props.saveWatchlistCoin}
            profileCoinInfo={props.profileCoinInfo}
            profileCoin={props.profileCoin}
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

export default CoinProfilePage;
