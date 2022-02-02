import React from "react";
import CoinInformation from "../../components/CoinProfile/CoinInformation";
import WatchlistPage from "../WatchlistPage/WatchListPage";

function CoinProfilePage(props) {
  return (
    <>
      <CoinInformation
        saveWatchlistCoin={props.saveWatchlistCoin}
        profileCoinInfo={props.profileCoinInfo}
        profileCoin={props.profileCoin}
      />
    </>
  );
}

export default CoinProfilePage;
