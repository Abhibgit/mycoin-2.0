import React from "react";
import WatchlistForm from "../../components/Watchlist/WatchlistForm";
import Watchlist from "../../components/Watchlist/Watchlist";
import { Grid } from "@mui/material";

function WatchListPage(props) {
  return (
    <>
      <Grid container spacing={2} direction="row" justifyContent="center">
        <Grid item xs={11} sx={{ marginTop: { xs: 1, md: 10 } }}>
          <WatchlistForm
            coinWatchSymbol={props.coinWatchSymbol}
            updateParams={props.updateParams}
            coinState={props.coinState}
            coinList={props.coinList}
          />
        </Grid>
        <Grid item xs={11}>
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
