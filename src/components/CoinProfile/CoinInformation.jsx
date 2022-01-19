import React from "react";

function CoinInformation(props) {
  return (
    <div>
      <h3>{props.profileCoin && props.profileCoin.s}</h3>
      <h3>{props.profileCoin && props.profileCoin.c}</h3>
    </div>
  );
}

export default CoinInformation;
