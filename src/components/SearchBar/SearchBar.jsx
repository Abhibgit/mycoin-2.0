import React, { useState } from "react";
import { Autocomplete, Button, TextField } from "@mui/material";

function Search(props) {
  let coinName = "";

  const handleSubmit = (event) => {
    event.preventDefault();
    const idx = props.coinList.map((e) => e.name).indexOf(coinName);
    console.log(idx);
    const coinSymbol = props.coinList[idx].symbol.toUpperCase();
    if (coinSymbol === "USDT") {
      props.findLiveCoin(coinSymbol);
      props.handleCoinProfileData(coinName);
    } else {
      let newCoinSymbol = coinSymbol + "USDT";
      props.findProfileCoin(newCoinSymbol);
      props.handleCoinProfileData(coinName);
    }
  };

  const handleAutocomplete = (event, value) => {
    coinName = value;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Autocomplete
          placeholder="Search…"
          sx={{ width: 300, colour: "secondary" }}
          options={props.coinList.map((e) => e.name)}
          onChange={handleAutocomplete}
          renderInput={(params) => (
            <TextField
              id="searchfield"
              {...params}
              label="Search..."
              sx={{ colour: "secondary" }}
              type="search"
              value={coinName}
            />
          )}
        />
        <Button variant="contained" type="submit" />
      </form>
    </div>
  );
}

export default Search;
