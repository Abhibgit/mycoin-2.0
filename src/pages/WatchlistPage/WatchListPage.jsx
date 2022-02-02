import React from "react";
import WatchlistForm from "../../components/Watchlist/WatchlistForm";
import Watchlist from "../../components/Watchlist/Watchlist";
import { Grid, Card } from "@mui/material";

function WatchListPage(props) {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <WatchlistForm
            coinWatchSymbol={props.coinWatchSymbol}
            updateParams={props.updateParams}
            coinState={props.coinState}
          />
        </Grid>
        <Grid item xs={3}>
          <Watchlist
            coinWatchlist={props.coinWatchlist}
            deleteWatchItem={props.deleteWatchItem}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default WatchListPage;
