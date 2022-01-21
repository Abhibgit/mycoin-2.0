import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

function CoinInformation(props) {
  return (
    <TableContainer component={Paper}>
      <h1>Coin Profile</h1>
      <Button
        type="submit"
        label="Save Coin"
        variant="outlined"
        onClick={() => props.saveWatchlistCoin(props.profileCoin.s)}
      >
        Save Coin
      </Button>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Coin Name</TableCell>
            <TableCell align="center">Symbol</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Price Change %</TableCell>
            <TableCell align="center">Price Change</TableCell>
            <TableCell align="center">High Price</TableCell>
            <TableCell align="center">Low Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ borderRadius: 15 }}>
            <TableCell component="th" scope="row">
              {props.profileCoinInfo.name}
            </TableCell>
            <TableCell align="center">
              {props.profileCoin && props.profileCoin.s}
            </TableCell>
            <TableCell align="center">
              ${props.profileCoin && props.profileCoin.c}
            </TableCell>
            <TableCell align="center">
              % {props.profileCoin && props.profileCoin.P}
            </TableCell>
            <TableCell align="center">
              ${props.profileCoin && props.profileCoin.p}
            </TableCell>
            <TableCell align="center">
              ${props.profileCoin && props.profileCoin.h}
            </TableCell>
            <TableCell align="center">
              ${props.profileCoin && props.profileCoin.l}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Open Price</TableCell>
            <TableCell align="center">Best Bid Price</TableCell>
            <TableCell align="center">Best Bid Quantity</TableCell>
            <TableCell align="center">Best Ask Price</TableCell>
            <TableCell align="center">Best Ask Quantity</TableCell>
            <TableCell align="center">Weighted Average Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow></TableRow>
          <TableRow sx={{ borderRadius: 15 }}>
            <TableCell align="center">
              ${props.profileCoin && props.profileCoin.o}
            </TableCell>
            <TableCell align="center">
              ${props.profileCoin && props.profileCoin.c}
            </TableCell>
            <TableCell align="center">
              $ {props.profileCoin && props.profileCoin.P}
            </TableCell>
            <TableCell align="center">
              ${props.profileCoin && props.profileCoin.o}
            </TableCell>
            <TableCell align="center">
              ${props.profileCoin && props.profileCoin.h}
            </TableCell>
            <TableCell align="center">
              ${props.profileCoin && props.profileCoin.l}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CoinInformation;
