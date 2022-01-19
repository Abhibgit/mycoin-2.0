import React, { useState, useEffect } from "react";
import NavBar from "./navbar/NavBar";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import CoinInformation from "./components/CoinProfile/CoinInformation";
import axios from "axios";

const ticker = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");

function App() {
  const [coinList, setCoinList] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [coinData, setCoinData] = useState({});
  const [profileCoin, setProfileCoin] = useState({});
  const [tickerSymbol, setTickerSymbol] = useState("");
  let coinFeed = [];

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
      )
      .then((response) => {
        setCoinList(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    ticker.onopen = () => {
      console.log("Connected");
    };
    ticker.onmessage = (message) => {
      coinFeed = JSON.parse(message.data);
      let idx = coinFeed.map((e) => e.s).indexOf(tickerSymbol);
      setProfileCoin(coinFeed[idx]);
      console.log(coinFeed, "this is the coin feed");
    };
  }, [tickerSymbol]);


  const findProfileCoin = (symbol) => {
    setProfileCoin({});
    setTickerSymbol(symbol);
    console.log("this is the symbol");
  };


  if (isLoading) {
    return <span>Loading...</span>;
  }
  return (
    <div>
      <NavBar coinList={coinList} findProfileCoin={findProfileCoin} />
      <CoinInformation
        coinList={coinList}
        coinData={coinData}
        profileCoin={profileCoin}
      />
    </div>
  );
}

export default App;
