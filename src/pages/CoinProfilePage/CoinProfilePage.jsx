import React from "react";
import CoinInformation from "../../components/CoinProfile/CoinInformation";
import { Grid } from "@mui/material";
import Watchlist from "../../components/Watchlist/Watchlist";
import SearchBar from "../../components/SearchBar/SearchBar";

function CoinProfilePage(props) {
  return (
    <>
      <Grid container spacing={4} direction="row" justifyContent="center">
        <Grid
          item
          xs={8}
          md={6}
          sx={{
            marginTop: { xs: 4, md: 6 },

            display: { xs: "none", sm: "block", md: "block" },
          }}
        >
          <SearchBar
            coinList={props.coinList}
            ticker={props.ticker}
            findProfileCoin={props.findProfileCoin}
            handleCoinProfileData={props.handleCoinProfileData}
          />
        </Grid>
        <Grid
          item
          xs={11}
          md={5}
          sx={{
            display: { xs: "none", sm: "block", md: "block" },
            marginTop: { md: 2 },
          }}
        >
          <Watchlist
            coinWatchlist={props.coinWatchlist}
            deleteWatchItem={props.deleteWatchItem}
          />
        </Grid>
        <Grid item xs={12} md={10} sx={{ marginTop: { xs: 1, md: -5 } }}>
          <CoinInformation
            saveWatchlistCoin={props.saveWatchlistCoin}
            profileCoinInfo={props.profileCoinInfo}
            profileCoin={props.profileCoin}
          />
        </Grid>
        <Grid
          item
          xs={11}
          md={5}
          sx={{
            marginLeft: 2,
            display: { xs: "block", sm: "none", md: "none" },
          }}
        >
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
