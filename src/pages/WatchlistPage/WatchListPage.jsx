import React from "react";
import WatchlistForm from "../../components/Watchlist/WatchlistForm";
import Watchlist from "../../components/Watchlist/Watchlist";
import { Grid } from "@mui/material";
import TopCoins from "../../components/TopCoins/TopCoins";

function WatchListPage(props) {
  return (
    <>
      <Grid container spacing={4} direction="row" justifyContent="center">
        <Grid item xs={11} md={6} sx={{ marginTop: { xs: 1, md: 2 } }}>
          <WatchlistForm
            coinWatchSymbol={props.coinWatchSymbol}
            updateParams={props.updateParams}
            coinState={props.coinState}
            coinList={props.coinList}
          />
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
    </>
  );
}

export default WatchListPage;
