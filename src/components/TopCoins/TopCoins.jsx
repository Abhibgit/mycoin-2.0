import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Slide } from "@mui/material";
import { IconButton, Typography } from "@mui/material";

import BookmarkIcon from "@mui/icons-material/Bookmark";

function TopCoins(props) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <div>
      <Typography
        sx={{
          marginBottom: { xs: 2, md: 2 },
          fontSize: { xs: 30, md: 40 },
          textDecoration: "underline",
        }}
      >
        Top Performing Coins
      </Typography>
      <Slide
        in={setChecked}
        direction="up"
        {...(checked ? { timeout: 1000 } : {})}
      >
        <TableContainer
          component={Paper}
          sx={{ boxShadow: 3, borderRadius: 5 }}
        >
          <Table
            sx={{ minWidth: { xs: 100, md: 600 } }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow style={{ textDecoration: "underline" }}>
                <TableCell align="center">Symbol</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Price Change %</TableCell>
                <TableCell align="center">Open Price</TableCell>
                <TableCell align="center">High Price</TableCell>
                <TableCell align="center">Low Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.topTenCoins.map((row, idx) => (
                <TableRow sx={{ border: 0 }} key={row + idx}>
                  <TableCell align="center">{row.s}</TableCell>
                  <TableCell align="center">
                    ${parseInt(row.c).toFixed(4)}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: row.P > 0 ? "#4BA582" : "#f74a4a" }}
                  >
                    % {row.P}
                  </TableCell>
                  <TableCell align="center">
                    ${parseInt(row.o).toFixed(2)}
                  </TableCell>
                  <TableCell align="center">
                    ${parseInt(row.h).toFixed(2)}
                  </TableCell>
                  <TableCell align="center">
                    ${parseInt(row.l).toFixed(2)}
                  </TableCell>
                  <IconButton
                    align="center"
                    onClick={() => props.saveWatchlistCoin(row.s)}
                    value={row.s}
                  >
                    <BookmarkIcon />
                  </IconButton>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Slide>
    </div>
  );
}

export default TopCoins;
