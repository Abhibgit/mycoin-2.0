import React, { useState } from "react";
import { Autocomplete, Button, TextField, Grid } from "@mui/material";

function Search(props) {
  const [coinName, setCoinName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(coinName);
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
    setCoinName(value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Autocomplete
          freeSolo
          placeholder="Search…"
          sx={{ width: 300, backgroundColor: "beige" }}
          options={props.coinList.map((e) => e.name)}
          onChange={handleAutocomplete}
          renderInput={(params) => (
            <TextField
              id="searchfield"
              {...params}
              label="Enter coin name..."
              sx={{ colour: "secondary" }}
              type="search"
              value={coinName}
            />
          )}
        />
        <Button
          variant="contained"
          type="submit"
          style={{ backgroundColor: "beige", color: "black" }}
        >
          Search
        </Button>
      </form>
    </>
  );
}

export default Search;
