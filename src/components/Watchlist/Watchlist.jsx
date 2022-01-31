import React from "react";

import { Card, Button, Typography, CardContent } from "@mui/material";

function Watchlist(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    props.deleteWatchItem(event.target.id);
  };

  return (
    <div>
      {props.coinWatchlist.map((e, idx) => {
        return (
          <Card key={e + idx}>
            <CardContent>
              <Button onClick={handleSubmit} id={e.s}>
                X
              </Button>
              <Typography>{e.s}</Typography>
              <Typography>${e.c}</Typography>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default Watchlist;
