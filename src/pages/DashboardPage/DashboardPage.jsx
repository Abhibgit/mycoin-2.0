import React from "react";
import TopCoins from "../../components/TopCoins/TopCoins";
import { Grid } from "@mui/material";
import Watchlist from "../../components/Watchlist/Watchlist";
import SearchBar from "../../components/SearchBar/SearchBar";

function DashboardPage(props) {
  return (
    <>
      <Grid container spacing={4} direction="row" justifyContent="center">
        <Grid item xs={8} md={6} sx={{ marginTop: { xs: 4, md: 6 } }}>
          <SearchBar
            coinList={props.coinList}
            ticker={props.ticker}
            findProfileCoin={props.findProfileCoin}
            handleCoinProfileData={props.handleCoinProfileData}
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

export default DashboardPage;
