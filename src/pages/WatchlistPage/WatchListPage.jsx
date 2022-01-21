import React from "react";
import WatchlistForm from "../../components/Watchlist/WatchlistForm";
import Watchlist from "../../components/Watchlist/Watchlist";
import { Grid } from "@mui/material";

function WatchListPage(props) {
  return (
    <>
      <Grid>
        <Grid item xs={2}>
          <WatchlistForm coinWatchSymbol={props.coinWatchSymbol} />
        </Grid>
        <Grid item xs={2}>
          <Watchlist coinWatchlist={props.coinWatchlist} />
        </Grid>
      </Grid>
    </>
  );
}

export default WatchListPage;
