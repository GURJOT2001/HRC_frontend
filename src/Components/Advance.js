import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
import "./Advance.css";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';

const useStyles = makeStyles({
  root: {
    width: "auto",
    "& .MuiOutlinedInput-input": {
      color: "white",
    },
    "& .MuiInputLabel-root": {
      color: "white",
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#14AFF1",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "white",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "white",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
  },
});
function Edit(props) {
  const classes = useStyles();
  const [value,setValue] = React.useState({});

  let handleValues=(e,name,v) => {
    let selectedData = value;
    let newData = {}
    newData[name] = v;
    selectedData = {...selectedData,...newData}
    setValue(selectedData);
  }

  let advanceSearch = () => {
    console.log(value)
    props.handleAdvanceSearch(value)
    setTimeout(() => {
      props.advanceClose();
    }, 1000);
  }

  return (
    <React.Fragment>
            <DialogContent style={{ background: "#39495E" }}>

      <div>
        <h6 className="headadvance">ADVANCE SEARCH</h6>
        <Box
          alignItems="center"
          component="form"
          noValidate
          sx={{
            display: "grid",
            gridTemplateColumns: { sm: "1fr 1fr" },
            gap: 2,
          }}
        >
          <TextField
            id="outlined-basic"
            label="Document ID"
            variant="outlined"
            className={classes.root}
            value={value.doc_id}
           onChange={(e) => handleValues(e, "doc_id", e.target.value)}
          />
          <TextField
            className={classes.root}
            id="outlined-basic"
            label="Customer Number"
            variant="outlined"
            value={value.cust_number}
          onChange={(e) => handleValues(e, "cust_number", e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Invoice ID"
            variant="outlined"
            className={classes.root}
            value={value.invoice_id}
           onChange={(e) => handleValues(e, "invoice_id", e.target.value)}
          />
          <TextField
            className={classes.root}
            id="outlined-basic"
            label="Business Year"
            variant="outlined"
            value={value.business_year}
          onChange={(e) => handleValues(e, "business_year", e.target.value)}
          />
        </Box>
      </div>
      </DialogContent>

        <DialogActions style={{ background: "#39495E" }}>
          <Button
            onClick={advanceSearch}
            style={{ color: "#FFFFFF", width: "50%", borderColor: "white" }}
          >
            SEARCH
          </Button>
          <Button
            onClick={props.advanceClose}
            style={{ color: "#FFFFFF", width: "50%", borderColor: "white" }}
          >
            CANCEL
          </Button>
        </DialogActions>
    </React.Fragment>
  );
}

export default Edit;
