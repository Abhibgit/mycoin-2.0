import React from "react";
import CoinInformation from "../../components/CoinProfile/CoinInformation";
import WatchlistPage from "../WatchlistPage/WatchListPage";
import TopCoins from "../../components/TopCoins/TopCoins";
import { Grid } from "@mui/material";

function DashboardPage(props) {
  return (
    <>
      <Grid item xs={8}>
        <CoinInformation
          saveWatchlistCoin={props.saveWatchlistCoin}
          profileCoinInfo={props.profileCoinInfo}
          profileCoin={props.profileCoin}
          user={props.user}
        />
      </Grid>
      <Grid item xs={8}>
        <WatchlistPage
          coinList={props.coinList}
          coinWatchlist={props.coinWatchlist}
          saveWatchlistCoin={props.saveWatchlistCoin}
          coinWatchSymbol={props.coinWatchSymbol}
        />
      </Grid>
      <Grid item xs={8}>
        <TopCoins
          topTenCoins={props.topTenCoins}
          coinList={props.coinList}
          saveWatchlistCoin={props.saveWatchlistCoin}
        />
      </Grid>
    </>
  );
}

export default DashboardPage;
