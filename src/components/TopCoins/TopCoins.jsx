import React, { useState } from "react";
import { Button } from "@mui/material";

function TopCoins(props) {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const idx = props.coinList.map((e) => e.name).indexOf(name);
    console.log(idx);
    const coinSymbol = props.coinList[idx].symbol.toUpperCase();
    if (coinSymbol === "USDT") {
      props.saveWatchlistCoin(coinSymbol);
    } else {
      let newCoinSymbol = coinSymbol + "USDT";
      props.saveWatchlistCoin(newCoinSymbol);
    }
  };

  return (
    <div>
      {props.coinList.map((e) => (
        <form onSubmit={handleSubmit}>
          <Button
            key={e.id}
            variant="contained"
            type="submit"
            onClick={() => setName(e.name)}
          >
            {e.name}
          </Button>
        </form>
      ))}
    </div>
  );
}

export default TopCoins;
