import React from "react";

import { Card } from "@mui/material";

function Watchlist(props) {
  return (
    <div>
      {props.coinWatchlist.map((e, idx) => {
        return (
          <>
            <h3>{e.s}</h3>
            <Card>${e.c}</Card>
          </>
        );
      })}
    </div>
  );
}

export default Watchlist;
