import React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
function Watchlist(props) {
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(name);
  //   const idx = props.coinList.map((e) => e.name).indexOf(name);
  //   console.log(idx);
  //   const coinSymbol = props.coinList[idx].symbol.toUpperCase();

  //   if (coinSymbol === "USDT") {
  //     props.findLiveCoin(coinSymbol);
  //   } else {
  //     let newCoinSymbol = coinSymbol + "USDT";
  //     console.log(coinSymbol);
  //     props.findLiveCoin(newCoinSymbol);
  //   }
  // };
  return (
    <div>
      <Card>
        {props.coinWatchlist.map((e, idx) => {
          return (
            <div key={e.s + idx}>
              <h3>{e.s}</h3>
              <h3>{e.c}</h3>
            </div>
          );
        })}
      </Card>
    </div>
  );
}

export default Watchlist;
