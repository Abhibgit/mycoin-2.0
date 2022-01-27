import React from "react";
import WatchlistForm from "../../components/Watchlist/WatchlistForm";
import Watchlist from "../../components/Watchlist/Watchlist";
import { Grid } from "@mui/material";

function WatchListPage(props) {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <WatchlistForm
            coinWatchSymbol={props.coinWatchSymbol}
            updateParams={props.updateParams}
            coinState={props.coinState}
          />
        </Grid>
        <Grid item xs={4}>
          <Watchlist coinWatchlist={props.coinWatchlist} />
        </Grid>
      </Grid>
    </>
  );
}

export default WatchListPage;
