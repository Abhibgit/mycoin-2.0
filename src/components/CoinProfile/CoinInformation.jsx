import React from "react";

function CoinInformation(props) {
  return (
    <div>
      {console.log(props.ticker)}
      <h1>{props.ticker[props.tickerIdx].e}</h1>
    </div>
  );
}

export default CoinInformation;
