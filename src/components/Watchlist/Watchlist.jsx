import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Watchlist(props) {
  const [coinName, setCoinName] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(coinName);
    const idx = props.coinList.map((e) => e.name).indexOf(coinName);
    console.log(idx);
    const coinSymbol = props.coinList[idx].symbol.toUpperCase();
    if (coinSymbol === "USDT") {
      props.findLiveCoin(coinSymbol); //can't find this prop
      props.handleCoinProfileData(coinName);
    } else {
      let newCoinSymbol = coinSymbol + "USDT";
      props.findProfileCoin(newCoinSymbol);
      props.handleCoinProfileData(coinName);
    }
  };
  return (
    <div>
      {props.coinWatchlist.map((e, idx) => {
        return (
          <div key={e.s + idx}>
            <Card>
              <h3>{e.s}</h3>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

export default Watchlist;
