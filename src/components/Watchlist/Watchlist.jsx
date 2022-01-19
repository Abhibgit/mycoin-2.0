import React from "react";

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
      {console.log(props.coinWatchlist)}
      {props.coinWatchlist.map((e, idx) => {
        return (
          <div key={e.s + idx}>
            <h3>{e.s}</h3>
            <h3>{e.c}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default Watchlist;
