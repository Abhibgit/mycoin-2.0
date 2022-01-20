import React, { useState, useEffect } from "react";
import NavBar from "./navbar/NavBar";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import CoinInformation from "./components/CoinProfile/CoinInformation";
import Watchlist from "./components/Watchlist/Watchlist";
import axios from "axios";
import TopCoins from "./components/TopCoins/TopCoins";
import { Grid } from "@mui/material";

const ticker = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");
let coinWatchSymbol = [];
let coinWatchlistArray = [];
let topTenSymbol = [];
let topTen = [];
let topTenArray = [];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [coinList, setCoinList] = useState([]);
  const [profileCoin, setProfileCoin] = useState({});
  const [profileCoinInfo, setProfileCoinInfo] = useState({});
  const [tickerSymbol, setTickerSymbol] = useState("");
  const [coinWatchlist, setCoinWatchlist] = useState([]);
  const [topTenCoins, setTopTenCoins] = useState([]);

  let coinFeed = [];

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
      )
      .then((response) => {
        setCoinList(response.data);
        console.log("the api has been pinged");
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
    return () => {
      ticker.close();
    };
  }, []);

  //The ticker.onmessage is the websocket that provides the coinFeed with the realtime data.
  useEffect(() => {
    ticker.onopen = () => {
      console.log("Connected");
      topTen = coinList.slice(0, 11);
      let coinSymbolMap = topTen.map((e) => e.symbol.toUpperCase());
      coinSymbolMap.forEach(function (e) {
        if (e === "USDT") {
          // topTenSymbol.push(e);
          console.log("invalid");
        } else {
          let newCoinSymbol = e + "USDT";
          topTenSymbol.push(newCoinSymbol);
        }
      });
      console.log(console.log(topTenSymbol));
    };
    ticker.onmessage = (message) => {
      //Maps the data to put the symbol from Binance
      coinFeed = JSON.parse(message.data);
      let idxTemplate = coinFeed.map((e) => e.s);
      //searches the mapped coinFeed for one symbol for the profile page, then sets it to ProfileCoin state
      let singleIdx = idxTemplate.indexOf(tickerSymbol);
      setProfileCoin(coinFeed[singleIdx]);
      //clears the array (necessary for memory bottleneck), iterates through watchlist coins array to display multiple tickers
      coinWatchlistArray = [];
      coinWatchSymbol.forEach(function (e) {
        let watchSingleIdx = idxTemplate.indexOf(e);
        coinWatchlistArray = [...coinWatchlistArray, coinFeed[watchSingleIdx]];
        setCoinWatchlist([]);
        setCoinWatchlist(coinWatchlistArray);
      });
      // For the top 10 coins saved from the API
      // goes through each of them to repeat the above code for saved coins.
      topTenArray = [];
      topTenSymbol.forEach(function (e) {
        if (e === "USDT") {
          console.log("This is from USDT");
        } else if (e === "USDCUSDT") {
          console.log("this is USDC");
        } else {
          let topTenIndex = idxTemplate.indexOf(e);
          return (topTenArray = [...topTenArray, coinFeed[topTenIndex]]);
        }
      });
      setTopTenCoins(topTenArray);
      console.log(topTenCoins);
    };
  }, [tickerSymbol, coinWatchSymbol, coinFeed]);

  // useEffect(() => {}, [coinFeed, coinList]);

  const findProfileCoin = (symbol) => {
    setProfileCoin({});
    setTickerSymbol(symbol);
    handleCoinProfileData();
  };

  const saveWatchlistCoin = (symbol) => {
    console.log(symbol);
    coinWatchSymbol.push(symbol);
  };

  const handleCoinProfileData = (name) => {
    let coinMap = coinList.map((e) => e.name);
    let idx = coinMap.indexOf(name);
    setProfileCoinInfo(coinList[idx]);
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <NavBar
            coinList={coinList}
            findProfileCoin={findProfileCoin}
            handleCoinProfileData={handleCoinProfileData}
          />
        </Grid>
        <Grid item xs={8}>
          <TopCoins topTenCoins={topTenCoins} coinList={coinList} />
        </Grid>
        <Grid item xs={8}>
          {/* <CoinInformation
            profileCoinInfo={profileCoinInfo}
            profileCoin={profileCoin}
          /> */}
        </Grid>
        <Grid item xs={4}>
          <Watchlist
            coinList={coinList}
            coinWatchlist={coinWatchlist}
            saveWatchlistCoin={saveWatchlistCoin}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
