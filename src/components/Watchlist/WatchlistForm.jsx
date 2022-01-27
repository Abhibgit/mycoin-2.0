import React, { useState } from "react";
import { TextField, Button, FormControl } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Watchlist from "./Watchlist";

function WatchlistForm(props) {
  const [expanded, setExpanded] = useState(false);
  const [paramsState, setParamsState] = useState([]);

  const handleAccordion = (panel) => (event, isExpanded) => {
    setParamsState([]);
    setExpanded(isExpanded ? panel : false);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    console.log(e.target.id);
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

  return (
    <div>
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
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  {e}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <AccordionDetails>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      sx={{ marginBottom: 0.5 }}
                      label="Upper Threshold"
                      size="small"
                      name="upperLimit"
                      type="input"
                      onChange={handleChange}
                      id={e}
                      // value={props.coinState.upperLimit}
                    >
                      Upper Threshold
                    </TextField>
                    <TextField
                      sx={{ marginBottom: 0.5 }}
                      label="Lower Threshold"
                      size="small"
                      type="input"
                      name="lowerLimit"
                      id={props.coinState._id}
                      onChange={handleChange}
                      id={e}
                      // value={props.coinState.lowerLimit}
                    >
                      Lower Threshold
                    </TextField>
                    <Button
                      type="submit"
                      variant="outlined"
                      sx={{ margin: 0.5 }}
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
    </div>
  );
}

export default WatchlistForm;
