import React, { useState, useEffect } from "react";
import { TextField, Button, Card, CardContent } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

let apiInfo = [];
let mapped = [];
function WatchlistForm(props) {
  const [expanded, setExpanded] = useState(false);
  const [paramsState, setParamsState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noWatchlist, setNoWatchlist] = useState(true);
  let reverse = [];

  useEffect(() => {
    setTimeout(() => {
      if (Object.keys(props.coinWatchSymbol).length !== 0) {
        const obj = Object.values(props.coinWatchSymbol);
        obj.map((e) => {
          let reduce = e.replace(/USDT/gm, "");

          reverse.push(reduce.toLowerCase());
        });
        const apiMap = props.coinList.map((e) => e.symbol);
        reverse.map((e) => {
          let idxMap = apiMap.indexOf(e);
          mapped.push(idxMap);
        });

        mapped.map((e) => {
          apiInfo.push(props.coinList[e]);
        });
        setIsLoading(false);
        setNoWatchlist(false);
      } else {
        setIsLoading(false);
      }
    }, 1000);
  }, [props.coinWatchSymbol]);

  const handleAccordion = (panel) => (event, isExpanded) => {
    setParamsState([]);
    setExpanded(isExpanded ? panel : false);
  };

  const handleChange = (e) => {
    setParamsState({
      ...paramsState,
      name: e.target.id,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.updateParams(paramsState);
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }
  return (
    <div>
      <Card sx={{ boxShadow: 3, backgroundColor: "#fcfaed" }}>
        <CardContent>
          <Typography style={{ margin: 20, fontSize: 45 }}>
            Watchlist Parameters
          </Typography>
          {props.coinWatchSymbol.map((e, idx) => {
            return (
              <div key={e + idx}>
                <Accordion
                  expanded={expanded === `panel + ${idx}`}
                  onChange={handleAccordion(`panel + ${idx}`)}
                  style={{ marginTop: 30, marginBottom: 15 }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography
                      sx={{ width: "33%", flexShrink: 0, fontSize: 22 }}
                    >
                      {apiInfo[idx].name} - {e}
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}></Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <AccordionDetails>
                      <form onSubmit={handleSubmit}>
                        <Typography>Upper Threshold</Typography>
                        <TextField
                          sx={{ marginBottom: 0.5, marginRight: 5 }}
                          placeholder={
                            props.coinState[idx]
                              ? `$${props.coinState[idx].upperLimit}`
                              : "Set a limit"
                          }
                          size="small"
                          name="upperLimit"
                          type="input"
                          onChange={handleChange}
                          id={e}
                        />
                        <Typography>Lower Threshold</Typography>
                        <TextField
                          sx={{ marginBottom: 0.5, marginRight: 5 }}
                          placeholder={
                            props.coinState[idx]
                              ? `$${props.coinState[idx].lowerLimit}`
                              : "Set a limit"
                          }
                          size="small"
                          type="input"
                          name="lowerLimit"
                          onChange={handleChange}
                          id={e}
                        />
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{ backgroundColor: "#6dbf71" }}
                        >
                          Save Changes
                        </Button>
                      </form>
                    </AccordionDetails>
                  </AccordionDetails>
                </Accordion>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

export default WatchlistForm;
