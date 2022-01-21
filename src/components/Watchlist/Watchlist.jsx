import React, { useState, useMemo } from "react";

import { Card } from "@mui/material";

function Watchlist(props) {
  return (
    <div>
      {props.coinWatchlist.map((e, idx) => {
        return (
          <>
            <Card>{e.s}</Card>
          </>
        );
      })}
    </div>
  );
}

export default Watchlist;
