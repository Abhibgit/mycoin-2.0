import React, { useState } from "react";
import { Autocomplete, Button, TextField, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Search(props) {
  const [coinName, setCoinName] = useState("");
  const navigate = useNavigate();

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
    navigate("/coin/profile");
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
          sx={{ width: 300, backgroundColor: "#fcfaed" }}
          options={props.coinList.map((e) => e.name)}
          onChange={handleAutocomplete}
          renderInput={(params) => (
            <TextField
              id="searchfield"
              {...params}
              placeholder="Enter coin name..."
              sx={{ colour: "secondary" }}
              type="search"
              value={coinName}
            />
          )}
        />
        <Button
          variant="contained"
          type="submit"
          size="small"
          style={{ backgroundColor: "#fcfaed", color: "black", width: 300 }}
        >
          Search
        </Button>
      </form>
    </>
  );
}

export default Search;
