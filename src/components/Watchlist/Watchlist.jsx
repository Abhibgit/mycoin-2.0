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
      {props.coinWatchlist.map((e, idx) => {
        return (
          <Card key={e + idx} style={{ margin: 15 }}>
            <CardContent>
              <Typography>{e.s}</Typography>
              <br />
              <Typography style={{ margin: 5 }}>Price</Typography>
              <Typography style={{ margin: 5 }}>
                ${parseInt(e.c).toFixed(2)}
              </Typography>
              <Typography style={{ margin: 5 }}>Price Change</Typography>
              <Typography sx={{ color: e.P > 0 ? "green" : "red", margin: 1 }}>
                % {e.P}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
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
