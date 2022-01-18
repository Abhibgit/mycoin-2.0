import React, { useState } from "react";
import { Autocomplete, Button, TextField } from "@mui/material";

function Search(props) {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name);
    const idx = props.coinList.map((e) => e.name).indexOf(name);
    console.log(idx);
    const coinSymbol = props.coinList[idx].symbol.toUpperCase();

    if (coinSymbol === "USDT") {
      props.findLiveCoin(coinSymbol);
    } else {
      let newCoinSymbol = coinSymbol + "USDT";
      console.log(coinSymbol);
      props.findProfileCoin(newCoinSymbol);
    }
  };

  const handleAutocomplete = (event, value) => {
    setName(value);
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
              value={name}
            />
          )}
        />
        <Button variant="contained" type="submit" />
      </form>
    </div>
  );
}

export default Search;
