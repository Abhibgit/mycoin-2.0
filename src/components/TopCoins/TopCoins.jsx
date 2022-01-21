import React, { useState } from "react";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { IconButton } from "@mui/material";

function TopCoins(props) {
  return (
    <div>
      <TableContainer component={Paper}>
        <h1>Top Performing Coins</h1>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Symbol</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Price Change %</TableCell>
              <TableCell align="center">Open Price</TableCell>
              <TableCell align="center">High Price</TableCell>
              <TableCell align="center">Low Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.topTenCoins.map((row) => (
              <TableRow sx={{ border: 0 }}>
                <TableCell align="center">{row.s}</TableCell>
                <TableCell align="center">${row.c}</TableCell>
                <TableCell align="center">% {row.P}</TableCell>
                <TableCell align="center">${row.o}</TableCell>
                <TableCell align="center">${row.h}</TableCell>
                <TableCell align="center">${row.l}</TableCell>
                {props.user.id !== "" ? (
                  <IconButton
                    align="center"
                    onClick={() => props.saveWatchlistCoin(row.s)}
                    value={row.s}
                  >
                    <BookmarkBorderIcon />
                  </IconButton>
                ) : (
                  <IconButton align="center" value={row.s}>
                    <BookmarkBorderIcon />
                  </IconButton>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TopCoins;
