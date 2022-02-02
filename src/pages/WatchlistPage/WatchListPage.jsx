import React from "react";
import WatchlistForm from "../../components/Watchlist/WatchlistForm";
import Watchlist from "../../components/Watchlist/Watchlist";
import { Grid } from "@mui/material";

function WatchListPage(props) {
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
          <WatchlistForm
            coinWatchSymbol={props.coinWatchSymbol}
            updateParams={props.updateParams}
            coinState={props.coinState}
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

export default WatchListPage;
