import React, { useState, useEffect } from "react";
import NavBar from "./navbar/NavBar";
import axios from "axios";
import { Grid } from "@mui/material";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import WatchlistPage from "./pages/WatchlistPage/WatchListPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import CoinProfilePage from "./pages/CoinProfilePage/CoinProfilePage";
import AuthPage from "./pages/AuthPage/AuthPage";

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
//coinWatchlistArray is the variable that needs to have memory refreshed and current data reinserted
let coinWatchlistArray = [];
// Top 10 added at the beginning of the ticker
let topTenSymbol = [];
// Variable that holds the 10 objects in an array from API ping
let topTen = [];
// Holds the array that gets refreshed
let topTenArray = [];
let token;
let userDoc;
let notificationsArray;
//Aware that this is not considered React best practices, however due to the nature of the data streams it was
//the only option to handle the data.
let coinState;
let coinWatchlist = [];

function App() {
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [coinList, setCoinList] = useState([]);
  const [profileCoin, setProfileCoin] = useState({});
  const [profileCoinInfo, setProfileCoinInfo] = useState({});
  const [tickerSymbol, setTickerSymbol] = useState("");
  const [topTenCoins, setTopTenCoins] = useState([]);
  //same as coinWatchSymbol, however it's required due to the speed of data renderering
  const [notifications, setNotifications] = useState([]);
  // const [coinState, setCoinState] = useState([{}]);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    watchlist: [],
  });
  const setUserInState = (incomingUserData) => {
    setUser(incomingUserData);
  };

  let coinFeed = [];
  let coinWatchlistArray = [];
  //

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
      )
      .then((response) => {
        setCoinList(response.data);
        console.log("api pinged");
        setIsLoading(false);
        token = localStorage.getItem("token");
        if (token) {
          userDoc = JSON.parse(atob(token.split(".")[1])).user;
          setUser(userDoc);
        }
      })
      .catch((err) => console.log(err));
    return () => {
      ticker.close();
    };
  }, []);

  useEffect(() => {
    console.log("useEffect triggered");
    coinState = user.watchlist;
    setNotifications(user.notifications);
    notificationsArray = user.notifications;
    let userMap = user.watchlist.map((e) => e.name);
    userMap.forEach(function (e) {
      coinWatchSymbol.push(e);
    });
  }, [user.id]);

  // The ticker.onmessage is the websocket that provides the coinFeed with the realtime data.
  // Due to the nature of what is happening with the websocket from Binance and the API calls from CoinGecko
  // It was required for us to set it up in this way. Calling functions off of the websocket ping is
  // not a possibility, as the data flow is too fast and the state with React would batch data together
  // not rerendering. Ideally, if the data was being streamed from just Binance, this would have made it easier
  // However, the search functionality with coin names, made it a requirement. Furthermore, because the
  // indices are constantly changing with the websocket (a coin is only ever displayed IF it has been traded
  // in that moment), the data would have to be wiped and reiterated through.
  useEffect(() => {
    ticker.onopen = () => {
      console.log("websocket connected");
      console.log(notifications);
      // Grabs the current top 10 from the API coinlist and maps through to set it into the "flow"
      topTen = coinList.slice(0, 12);
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
    //Ticker "flow", pings every second.
    ticker.onmessage = (message) => {
      console.log(coinWatchlist);
      console.log(user.watchlist);
      console.log(coinState);
      console.log(coinWatchlist.length);
      console.log(coinState.length);
      console.log(coinWatchlist.length !== coinState.length);
      if (coinWatchlist.length !== coinState.length) {
        coinState = [];
        coinState = user.watchlist;
        console.log(coinState);
        console.log(coinWatchlist);
        console.log(user.watchlist);
      }
      if (Object.keys(coinState).length < 6) {
        coinState = user.watchlist;
      }
      notificationsArray = user.notifications;
      //Maps the data to grab the symbol from Binance so that the index can be located
      coinFeed = JSON.parse(message.data);
      let idxTemplate = coinFeed.map((e) => e.s);
      //searches the mapped coinFeed for one symbol for the profile page, then sets it to ProfileCoin state to be displayed
      let singleIdx = idxTemplate.indexOf(tickerSymbol);
      setProfileCoin(coinFeed[singleIdx]);
      coinWatchSymbol.forEach(function (e) {
        let watchSingleIdx = idxTemplate.indexOf(e);
        coinWatchlistArray = [...coinWatchlistArray, coinFeed[watchSingleIdx]];
        coinWatchlist = coinWatchlistArray;
      });
      //clears the array (necessary for memory bottleneck with React State), iterates through watchlist coins array to display multiple tickers
      // This will display the watchlist for the user, this is the main portion of the ticker "flow".
      // For the top 10 coins saved from the API
      // goes through each of them to repeat the above code used for saved coins
      topTenArray = [];
      let topTenIndex = [];
      topTenSymbol.forEach(function (e) {
        if (e === "USDCUSDT") {
          console.log("this is USDC");
        } else {
          if (idxTemplate.indexOf(e) === -1) {
            console.log("undefined");
          } else {
            topTenIndex = idxTemplate.indexOf(e);
          }
          return (topTenArray = [...topTenArray, coinFeed[topTenIndex]]);
        }
      });
      setTopTenCoins(topTenArray);
      checkParams();
    };
  }, [tickerSymbol, coinWatchSymbol, coinFeed]);

  const findProfileCoin = (symbol) => {
    setProfileCoin({});
    setTickerSymbol(symbol);
    handleCoinProfileData();
  };

  async function saveWatchlistCoin(symbol) {
    //saves the coin to the user, and add its to the "flow"
    if (coinWatchSymbol.includes(symbol) === true) {
      toast(`You've already saved ${symbol}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      try {
        const fetchResponse = await fetch(`/api/users/${user._id}/coins`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            watchlist: { name: symbol },
          }),
        });
        console.log(fetchResponse);

        if (!fetchResponse.ok) throw new Error("Fetch failed - Bad request");

        let token = await fetchResponse.json();
        localStorage.setItem("token", token);

        const userDoc = JSON.parse(atob(token.split(".")[1])).user;
        console.log("created_coin: " + userDoc);
        setUserInState(userDoc);
      } catch (err) {
        console.log("CoinCreate error", err);
        setIsError("CoinCreate Failed - Try Again");
      }
      coinWatchSymbol.push(symbol);
    }
  }

  async function updateParams(params) {
    console.log(coinState);
    let objIdx = coinState.map((e) => e.name).indexOf(params.name);
    let objId = coinState[objIdx]._id;

    try {
      const fetchResponse = await fetch(`/api/users/coins/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: objId,
          name: params.name,
          upperLimit: params.upperLimit,
          lowerLimit: params.lowerLimit,
        }),
      });
      console.log(fetchResponse);

      if (!fetchResponse.ok) throw new Error("Fetch failed - Bad request");

      let token = await fetchResponse.json();
      localStorage.setItem("token", token);

      const userDoc = JSON.parse(atob(token.split(".")[1])).user;
      console.log("created_coin: " + userDoc);
      setUserInState(userDoc);
    } catch (err) {
      console.log("CoinParams error", err);
      setIsError("CoinParams Failed - Try Again");
    }
    checkParams();
  }

  const checkParams = () => {
    if (coinWatchlist.length === coinState.length) {
      coinWatchlist.map(({ c, s }, idx) => {
        if (Object.keys(coinState[idx])) {
          if (Object.keys(coinState[idx]).includes("lowerLimit")) {
            if (parseInt(c) < coinState[idx].lowerLimit) {
              notificationCheck(
                `${s} is below your threshold of $${coinState[idx].lowerLimit}`
              );
            } else {
              console.log("not lower");
            }
            if (Object.keys(coinState[idx]).includes("upperLimit")) {
              if (parseInt(c) > coinState[idx].upperLimit) {
                notificationCheck(
                  `${s} is above your threshold of $${coinState[idx].upperLimit}`
                );
              } else {
                console.log("not higher");
              }
            }
          }
        }
      });
    } else {
      console.log("these don't match FOOL!");
    }
  };

  const notificationCheck = (alertmsg) => {
    if (Object.keys(notificationsArray).length === 0) {
      console.log("this is hitting");
      toast(alertmsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      sendNotification(alertmsg);
    } else {
      let msgCheck = notificationsArray.map((m) => m.message);
      if (msgCheck.includes(alertmsg) === false) {
        console.log("this is bypassing");
        toast(alertmsg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        sendNotification(alertmsg);
      } else {
        console.log("duplicate notification");
      }
    }
  };

  async function sendNotification(alertmsg) {
    try {
      const fetchResponse = await fetch(
        `/api/users/${user._id}/coins/notifications`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: alertmsg,
          }),
        }
      );
      console.log(fetchResponse);

      if (!fetchResponse.ok) throw new Error("Fetch failed - Bad request");

      let token = await fetchResponse.json();
      localStorage.setItem("token", token);

      const userDoc = JSON.parse(atob(token.split(".")[1])).user;
      console.log("created_coin: " + userDoc);
      setUserInState(userDoc);
    } catch (err) {
      console.log("CoinParams error", err);
      setIsError("CoinParams Failed - Try Again");
    }
  }

  const handleCoinProfileData = (name) => {
    let coinMap = coinList.map((e) => e.name);
    let idx = coinMap.indexOf(name);
    setProfileCoinInfo(coinList[idx]);
  };

  async function deleteWatchItem(params) {
    let watchlistMap = coinState.map((e) => e.name);
    let itemIdx = watchlistMap.indexOf(params);
    let itemId = coinState[itemIdx]._id;

    try {
      const fetchResponse = await fetch(`/api/users/coins/${user._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: itemId,
        }),
      });
      console.log(fetchResponse);

      if (!fetchResponse.ok) throw new Error("Fetch failed - Bad request");

      let token = await fetchResponse.json();
      localStorage.setItem("token", token);

      const userDoc = JSON.parse(atob(token.split(".")[1])).user;
      setUserInState(userDoc);
    } catch (err) {
      console.log("Delete error", err);
      setIsError("Delete error Failed - Try Again");
    }

    coinWatchSymbol = coinWatchSymbol.filter((e) => e !== params);
    let idxTemplate = coinFeed.map((e) => e.s);
    coinWatchlistArray = [];
    if (coinWatchSymbol.length > 0) {
      coinWatchSymbol.forEach(function (e) {
        console.log(e);
        let watchSingleIdx = idxTemplate.indexOf(e);
        coinWatchlistArray = [...coinWatchlistArray, coinFeed[watchSingleIdx]];
        coinWatchlist = coinWatchlistArray;
      });
    } else {
      coinWatchlist = [];
    }
  }

  async function removeNotification(params) {
    try {
      const fetchResponse = await fetch(
        `/api/users/${user._id}/coins/notifications`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: params,
          }),
        }
      );
      console.log(fetchResponse);

      if (!fetchResponse.ok) throw new Error("Fetch failed - Bad request");

      let token = await fetchResponse.json();
      localStorage.setItem("token", token);

      const userDoc = JSON.parse(atob(token.split(".")[1])).user;
      setUserInState(userDoc);
    } catch (err) {
      console.log("Delete error", err);
      setIsError("Delete error Failed - Try Again");
    }
    let filterNotification = notifications.filter((e) => e._id !== params);
    setNotifications(...notifications, filterNotification);
  }

  if (isLoading) {
    return <span>Loading...</span>;
  }
  return (
    <div>
      <Router>
        <ThemeProvider theme={themeOptions}>
          <ToastContainer />
          <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="center"
            style={{
              minHeight: "100vh",
            }}
          >
            <Grid item xs={12}>
              <NavBar
                coinList={coinList}
                findProfileCoin={findProfileCoin}
                handleCoinProfileData={handleCoinProfileData}
                user={user}
                setUserInState={setUserInState}
                notifications={notifications}
                removeNotification={removeNotification}
              />
            </Grid>

            {user.id !== "" ? (
              <>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <DashboardPage
                        topTenCoins={topTenCoins}
                        coinList={coinList}
                        saveWatchlistCoin={saveWatchlistCoin}
                        setUserInState={setUserInState}
                        coinWatchlist={coinWatchlist}
                        deleteWatchItem={deleteWatchItem}
                      />
                    }
                  />
                  <Route
                    path={"/user/profile"}
                    element={
                      <ProfilePage
                        user={user}
                        setUserInState={setUserInState}
                        coinWatchlist={coinWatchlist}
                        deleteWatchItem={deleteWatchItem}
                      />
                    }
                  />
                  <Route
                    path={"/coin/profile"}
                    element={
                      <CoinProfilePage
                        saveWatchlistCoin={saveWatchlistCoin}
                        profileCoinInfo={profileCoinInfo}
                        profileCoin={profileCoin}
                        coinWatchSymbol={coinWatchSymbol}
                        updateParams={updateParams}
                        coinState={coinState}
                        coinWatchlist={coinWatchlist}
                        deleteWatchItem={deleteWatchItem}
                      />
                    }
                  />
                  <Route
                    path={"/watchlist"}
                    element={
                      <WatchlistPage
                        coinList={coinList}
                        coinWatchlist={coinWatchlist}
                        saveWatchlistCoin={saveWatchlistCoin}
                        coinWatchSymbol={coinWatchSymbol}
                        updateParams={updateParams}
                        coinState={coinState}
                        deleteWatchItem={deleteWatchItem}
                      />
                    }
                  />
                </Routes>
              </>
            ) : (
              <>
                <Grid>
                  <AuthPage setUserInState={setUserInState} />
                </Grid>
              </>
            )}
          </Grid>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
