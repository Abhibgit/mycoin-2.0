import React, { useState, useEffect } from "react";
import NavBar from "./navbar/NavBar";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import CoinInformation from "./components/CoinProfile/CoinInformation";
import Watchlist from "./components/Watchlist/Watchlist";
import axios from "axios";
import TopCoins from "./components/TopCoins/TopCoins";
import { Grid } from "@mui/material";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Logout from "./components/Logout/Logout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import WatchlistPage from "./pages/WatchlistPage/WatchListPage";

export const themeOptions = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#212121",
    },
    secondary: {
      main: "#faf6dc",
    },
  },
});

const ticker = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");

//coinWatchSymbol stores coins that are saved
let coinWatchSymbol = [];
let coinWatchlistArray = [];
let topTenSymbol = [];
let topTen = [];
let topTenArray = [];

function App() {
  const [isError, setIsError] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [coinList, setCoinList] = useState([]);
  const [profileCoin, setProfileCoin] = useState({});
  const [profileCoinInfo, setProfileCoinInfo] = useState({});
  const [tickerSymbol, setTickerSymbol] = useState("");
  const [coinWatchlist, setCoinWatchlist] = useState([]);
  const [topTenCoins, setTopTenCoins] = useState([]);
  //same as coinWatchSymbol, however it's required due to the speed of data
  const [userCoinDb, setUserCoinDb] = useState([]);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });
  const setUserInState = (incomingUserData) => {
    setUser(incomingUserData);
  };

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
          console.log("invalid");
        } else {
          let newCoinSymbol = e + "USDT";
          topTenSymbol.push(newCoinSymbol);
        }
      });
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
          console.log("this is USDT");
        } else if (e === "USDCUSDT") {
          console.log("this is USDC");
        } else {
          let topTenIndex = idxTemplate.indexOf(e);
          return (topTenArray = [...topTenArray, coinFeed[topTenIndex]]);
        }
      });
      setTopTenCoins(topTenArray);
    };
  }, [tickerSymbol, coinWatchSymbol, coinFeed]);

  const findProfileCoin = (symbol) => {
    setProfileCoin({});
    setTickerSymbol(symbol);
    handleCoinProfileData();
  };

  async function saveWatchlistCoin(symbol) {
    try {
      // 1. POST our new user info to the server
      const fetchResponse = await fetch("/api/coins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: user.id,
          name: symbol,
        }),
      });

      // 2. Check "fetchResponse.ok". False means status code was 4xx from the server/controller action
      if (!fetchResponse.ok) throw new Error("Fetch failed - Bad request");

      let token = await fetchResponse.json(); // 3. decode fetch response to get jwt from srv
      localStorage.setItem("token", token); // 4. Stick token into localStorage

      const userDoc = JSON.parse(atob(token.split(".")[1])).user; // 5. Decode the token + put user document into state
      console.log("created_coin: " + userDoc);
      this.props.setUserInState(userDoc);
    } catch (err) {
      console.log("CoinCreate error", err);
      setIsError({ error: "CoinCreate Failed - Try Again" });
    }
    coinWatchSymbol.push(symbol);
    setUserCoinDb([...userCoinDb, symbol]);
  }

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
      <ThemeProvider theme={themeOptions}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <NavBar
              coinList={coinList}
              findProfileCoin={findProfileCoin}
              handleCoinProfileData={handleCoinProfileData}
              user={user}
            />
          </Grid>
          <Grid item xs={8}>
            <CoinInformation
              saveWatchlistCoin={saveWatchlistCoin}
              profileCoinInfo={profileCoinInfo}
              profileCoin={profileCoin}
            />
          </Grid>
          <Grid item xs={4}>
            <WatchlistPage
              coinList={coinList}
              coinWatchlist={coinWatchlist}
              saveWatchlistCoin={saveWatchlistCoin}
              coinWatchSymbol={coinWatchSymbol}
            />
          </Grid>
          <Grid item xs={8}>
            <TopCoins
              topTenCoins={topTenCoins}
              coinList={coinList}
              saveWatchlistCoin={saveWatchlistCoin}
            />
          </Grid>
          {user.id === "" ? (
            <>
              <SignUpPage setUserInState={setUserInState} />
              <LoginPage setUserInState={setUserInState} />
            </>
          ) : (
            <>
              <ProfilePage user={user} setUserInState={setUserInState} />
              <Logout />
            </>
          )}
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default App;
