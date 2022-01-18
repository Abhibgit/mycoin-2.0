import React, { useState, useEffect } from "react";
import NavBar from "./navbar/NavBar";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import CoinProfilePage from "./pages/ProfilePage/ProfilePage";
import axios from "axios";

const ticker = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");

function App() {
  const [coinList, setCoinList] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [coinData, setCoinData] = useState([]);
  const [tickerIdx, setTickerIdx] = useState(0);
  const [profileCoin, setProfileCoin] = useState("");
  const [tickerObj, setTickerObj] = useState([]);

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
      setTickerObj(message.data.s);
      console.log(message.data.s, "this is the message data");
    };
  }, []);

  const findProfileCoin = (symbol) => {
    console.log(symbol, "this is the symbol");
    const idx = ticker.s.indexOf(symbol);
    setTickerIdx(idx);
    console.log(tickerIdx, "this is the ticker index");
  };

  const addWatchlistCoin = (symbol) => {
    setCoinData([...coinData, symbol]);
  };

  const findTickerIdx = (idx) => {};

  if (isLoading) {
    return <span>Loading...</span>;
  }
  return (
    <div>
      <NavBar coinList={coinList} findProfileCoin={findProfileCoin} />
      <DashboardPage ticker={ticker} />
      <CoinProfilePage
        coinList={coinList}
        coinData={coinData}
        ticker={ticker}
        tickerIdx={tickerIdx}
      />
      {console.log(ticker)}
    </div>
  );
}

export default App;
