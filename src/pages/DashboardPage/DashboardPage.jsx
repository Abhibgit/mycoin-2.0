import React from "react";
import TopCoins from "../../components/TopCoins/TopCoins";
import { Grid } from "@mui/material";
import Watchlist from "../../components/Watchlist/Watchlist";
import SearchBar from "../../components/SearchBar/SearchBar";

function DashboardPage(props) {
  return (
    <>
      <Grid container spacing={2} direction="row" justifyContent="center">
        <Grid item xs={8} sx={{ marginTop: 4 }}>
          <SearchBar
            coinList={props.coinList}
            ticker={props.ticker}
            findProfileCoin={props.findProfileCoin}
            handleCoinProfileData={props.handleCoinProfileData}
          />
        </Grid>
        <Grid item xs={11}>
          <Watchlist
            coinWatchlist={props.coinWatchlist}
            deleteWatchItem={props.deleteWatchItem}
          />
        </Grid>
        <Grid
          item
          xs={8}
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

export default DashboardPage;
