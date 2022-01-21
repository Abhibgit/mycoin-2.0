import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function WatchlistForm(props) {
  const [limit, setLimit] = useState({
    upperLimit: 0,
    lowerLimit: 0,
  });
  const [expanded, setExpanded] = React.useState(false);

  const handleAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleChange = (e) => {
    setLimit({ ...limit, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    // console.log(e);
  };

  return (
    <div>
      {props.coinWatchSymbol.map((e, idx) => {
        return (
          <>
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
                  <TextField
                    sx={{ marginBottom: 0.5 }}
                    label="Upper Threshold"
                    size="small"
                    name="upperLimit"
                    type="number"
                    onChange={handleChange}
                    value={limit.upperLimit}
                  >
                    Upper Threshold
                  </TextField>
                  <TextField
                    sx={{ marginBottom: 0.5 }}
                    label="Lower Threshold"
                    size="small"
                    type="number"
                    name="lowerLimit"
                    onChange={handleChange}
                    value={limit.lowerLimit}
                  >
                    Lower Threshold
                  </TextField>
                  <Button
                    type="submit"
                    variant="outlined"
                    sx={{ margin: 0.5 }}
                    size=""
                  >
                    Save Changes
                  </Button>
                </AccordionDetails>
              </AccordionDetails>
            </Accordion>
          </>
        );
      })}
    </div>
  );
}

export default WatchlistForm;
