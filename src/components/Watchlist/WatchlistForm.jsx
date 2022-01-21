import React, { useState, useMemo } from "react";
import { TextField, Button } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function WatchlistForm(props) {
  const [limit, setLimit] = useState({
    upperLimit: 0,
    lowerLimit: 0,
  });

  const handleChange = (e) => {
    setLimit({ ...limit, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log(e);
  };

  return (
    <div>
      {props.coinWatchSymbol.map((e) => {
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Accordion 1</Typography>
          </AccordionSummary>
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
        </Accordion>;
      })}
    </div>
  );
}

export default WatchlistForm;
