import React from "react";

import {
  Card,
  Button,
  Typography,
  CardContent,
  CardActions,
} from "@mui/material";

function Watchlist(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    props.deleteWatchItem(event.target.id);
  };

  return (
    <div>
      <Typography style={{ fontSize: 40, color: "#202020" }}>
        Watchlist
      </Typography>
      {props.coinWatchlist.map((e, idx) => {
        return (
          <Card
            key={e + idx}
            style={{
              marginBottom: 15,
              backgroundColor: idx % 2 ? "#F6F0D8" : "#D6E5ED",
              maxHeight: 300,
            }}
            sx={{ boxShadow: 3 }}
          >
            <CardContent>
              <Typography>{e.s}</Typography>
              <br />
              <Typography>Price</Typography>
              <Typography style={{ margin: 2 }}>
                ${parseInt(e.c).toFixed(2)}
              </Typography>
              <Typography>Price Change</Typography>
              <Typography sx={{ color: e.P > 0 ? "#4BA582" : "#f74a4a" }}>
                % {e.P}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="outlined"
                onClick={handleSubmit}
                id={e.s}
                style={{ justifyContent: "right" }}
              >
                Remove
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
}

export default Watchlist;
