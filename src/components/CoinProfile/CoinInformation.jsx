import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SearchIcon from "@mui/icons-material/Search";

function CoinInformation(props) {
  return (
    <>
      <Typography
        sx={{
          margin: { xs: 2 },
          fontSize: { xs: 30, md: 40 },
          textDecoration: "underline",
        }}
      >
        Coin Profile
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 5 }}>
        <Typography
          sx={{
            margin: 2,
            marginTop: { xs: 4, md: 5 },
            fontSize: { xs: 28, md: 35 },
          }}
        >
          {props.profileCoinInfo.name}
        </Typography>
        <Table
          sx={{ minWidth: { xs: 100, md: 600 } }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow sx={{ textDecoration: "underline" }}>
              <TableCell align="center">Symbol</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Price Change %</TableCell>
              <TableCell align="center">Price Change</TableCell>
              <TableCell align="center">High Price</TableCell>
              <TableCell align="center">Low Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">
                {props.profileCoin && props.profileCoin.s}
              </TableCell>
              <TableCell align="center">
                ${props.profileCoin && parseInt(props.profileCoin.c).toFixed(2)}
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: props.profileCoin.P > 0 ? "#4BA582" : "#f74a4a" }}
              >
                % {props.profileCoin && props.profileCoin.P}
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: props.profileCoin.p > 0 ? "#4BA582" : "#f74a4a" }}
              >
                ${" "}
                {props.profileCoin && parseInt(props.profileCoin.p).toFixed(2)}
              </TableCell>
              <TableCell align="center">
                ${props.profileCoin && parseInt(props.profileCoin.h).toFixed(2)}
              </TableCell>
              <TableCell align="center">
                ${props.profileCoin && parseInt(props.profileCoin.l).toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Table
          sx={{ minWidth: { xs: 100, md: 600 } }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow sx={{ textDecoration: "underline" }}>
              <TableCell align="center">Open Price</TableCell>
              <TableCell align="center">Best Bid Price</TableCell>
              <TableCell align="center">Best Bid Quantity</TableCell>
              <TableCell align="center">Best Ask Price</TableCell>
              <TableCell align="center">Best Ask Quantity</TableCell>
              <TableCell align="center">Weighted Average Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">
                ${props.profileCoin && parseInt(props.profileCoin.o).toFixed(2)}
              </TableCell>
              <TableCell align="center">
                ${props.profileCoin && parseInt(props.profileCoin.c).toFixed(2)}
              </TableCell>
              <TableCell align="center">
                ${props.profileCoin && parseInt(props.profileCoin.B).toFixed(2)}
              </TableCell>
              <TableCell align="center">
                ${props.profileCoin && parseInt(props.profileCoin.o).toFixed(2)}
              </TableCell>
              <TableCell align="center">
                ${props.profileCoin && parseInt(props.profileCoin.h).toFixed(2)}
              </TableCell>
              <TableCell align="center">
                ${props.profileCoin && parseInt(props.profileCoin.l).toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button
          type="submit"
          label="Save Coin"
          variant="outlined"
          onClick={() => props.saveWatchlistCoin(props.profileCoin.s)}
          sx={{ margin: 3 }}
        >
          <BookmarkIcon />
          Save
        </Button>
        <Button
          type="submit"
          label="Save Coin"
          variant="outlined"
          onClick={props.handleNavigateSearch}
          sx={{ display: { md: "none" } }}
        >
          <SearchIcon />
          Search New Coin
        </Button>
      </TableContainer>
    </>
  );
}

export default CoinInformation;
