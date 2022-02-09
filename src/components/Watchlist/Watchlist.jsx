import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Typography,
  CardContent,
  CardActions,
  Grid,
  Grow,
} from "@mui/material";

import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";

function Watchlist(props) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  const handleSubmit = (event) => {
    props.deleteWatchItem(event.target.id);
  };

  return (
    <>
      <Typography
        sx={{
          fontSize: { xs: 30, md: 40 },
          textDecoration: "underline",
          margin: 2,
        }}
      >
        Watchlist
      </Typography>
      <Grow
        in={checked}
        style={{ transitionDelay: checked ? "500ms" : "0ms" }}
        {...(checked ? { timeout: 1000 } : {})}
      >
        <Grid container spacing={2} direction="row" justifyContent="left">
          {Object.keys(props.coinWatchlist).length !== 0 ? (
            <>
              {props.coinWatchlist.map((e, idx) => {
                return (
                  <Grid item xs={6} key={e + idx}>
                    <Card
                      sx={{
                        marginBottom: 5,
                        height: { xs: 225, md: 250 },
                        width: 175,
                        boxShadow: 3,
                        borderRadius: 5,
                      }}
                    >
                      <CardContent>
                        <Typography>{e.s}</Typography>
                        <br />
                        <Typography>Price</Typography>
                        <Typography style={{ margin: { md: 2 } }}>
                          ${parseInt(e.c).toFixed(2)}
                        </Typography>
                        <Typography>Price Change</Typography>
                        <Typography
                          sx={{ color: e.P > 0 ? "#4BA582" : "#f74a4a" }}
                        >
                          % {e.P}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={handleSubmit}
                          id={e.s}
                        >
                          <BookmarkRemoveIcon sx={{ fontSize: 20 }} />
                          Remove
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </>
          ) : (
            <>
              <h4>You have no saved coins...</h4>
            </>
          )}
        </Grid>
      </Grow>
    </>
  );
}

export default Watchlist;
