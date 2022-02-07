import React from "react";
import TopCoins from "../../components/TopCoins/TopCoins";
import Watchlist from "../../components/Watchlist/Watchlist";
import { Grid } from "@mui/material";

function TopTen(props) {
  return (
    <>
      <Grid container spacing={2} direction="row" justifyContent="center">
        <Grid item xs={11} sx={{ marginTop: { xs: 1, md: 10 } }}>
          <TopCoins
            topTenCoins={props.topTenCoins}
            coinList={props.coinList}
            saveWatchlistCoin={props.saveWatchlistCoin}
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

export default TopTen;
