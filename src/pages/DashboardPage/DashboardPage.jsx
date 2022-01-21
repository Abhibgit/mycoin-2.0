import React from "react";
import CoinInformation from "../../components/CoinProfile/CoinInformation";
import Watchlist from "../../components/Watchlist/Watchlist";
import TopCoins from "../../components/TopCoins/TopCoins";
import { Grid } from "@mui/material";

function DashboardPage(props) {
  return (
    <>
      <Grid item xs={8}>
        <CoinInformation
          profileCoinInfo={props.profileCoinInfo}
          profileCoin={props.profileCoin}
        />
      </Grid>
      <Grid item xs={8}>
        <TopCoins
          topTenCoins={props.topTenCoins}
          coinList={props.coinList}
          saveWatchlistCoin={props.saveWatchlistCoin}
        />
      </Grid>
      <Grid item xs={4}>
        <Watchlist
          coinList={props.coinList}
          coinWatchlist={props.coinWatchlist}
          saveWatchlistCoin={props.saveWatchlistCoin}
          handleCoinProfileData={props.handleCoinProfileData}
        />
      </Grid>
    </>
  );
}

export default DashboardPage;
