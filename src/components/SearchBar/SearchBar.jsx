import React, { useState } from "react";
import {
  Autocomplete,
  Button,
  TextField,
  CardContent,
  Card,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

function Search(props) {
  const [coinName, setCoinName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const idx = props.coinList.map((e) => e.name).indexOf(coinName);

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
      <Card sx={{ borderRadius: 5, marginTop: { md: 8 }, maxWidth: 500 }}>
        <CardContent>
          <Typography
            sx={{
              fontSize: { xs: 18, md: 25 },
              marginBottom: { xs: 2, md: 5 },
            }}
          >
            Search for a coin
          </Typography>
          <form onSubmit={handleSubmit}>
            <Autocomplete
              freeSolo
              sx={{ width: { xs: 200, md: 300 } }}
              options={props.coinList.map((e) => e.name)}
              onChange={handleAutocomplete}
              renderInput={(params) => (
                <TextField
                  id="searchfield"
                  {...params}
                  placeholder="Enter coin name..."
                  value={coinName}
                />
              )}
            />
            <Button
              variant="outlined"
              type="submit"
              size="small"
              sx={{ marginTop: { xs: 2, md: 5 } }}
            >
              <SearchIcon />
              Search
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default Search;
