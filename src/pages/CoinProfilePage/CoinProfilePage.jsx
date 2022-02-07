import React from "react";
import CoinInformation from "../../components/CoinProfile/CoinInformation";
import { Grid } from "@mui/material";
import Watchlist from "../../components/Watchlist/Watchlist";

function CoinProfilePage(props) {
  return (
    <>
      <Grid container spacing={2} direction="row" justifyContent="center">
        <Grid item xs={11} sx={{ marginTop: { xs: 1, md: 10 } }}>
          <CoinInformation
            saveWatchlistCoin={props.saveWatchlistCoin}
            profileCoinInfo={props.profileCoinInfo}
            profileCoin={props.profileCoin}
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

export default CoinProfilePage;
