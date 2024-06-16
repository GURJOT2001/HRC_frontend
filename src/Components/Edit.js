import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import "./Edit.css";
import axios from "axios";

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

  const [value, setValue] = React.useState({});
  let handleValues = (e, name, v) => {
    let selectedData = value;
    let newData = {};
    newData[name] = v;
    selectedData = { ...selectedData, ...newData };
    setValue(selectedData);
  };

  let handleEdit = () => {
    axios
      .put(
        "http://localhost:8080/api/customer?id=" + props.selectedItem[0].sl_no,
        value
      )
      .then((res) => {
        console.log(res);
        setTimeout(() => {
          props.editClose();
        }, 100);
      });
  };

  return (
    <React.Fragment>
      <DialogContent style={{ background: "#39495E" }}>
        <div>
          <h6 className="headedit">EDIT</h6>
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
              label="Invoice Currency"
              variant="outlined"
              className={classes.root}
              value={value.invoice_currency}
              onChange={(e) => handleValues(e, "invoice_currency", e.target.value)}
            />
            <TextField
              className={classes.root}
              id="outlined-basic"
              label="Customer Payment Terms"
              variant="outlined"
              value={value.cust_payment_terms}
              onChange={(e) => handleValues(e, "cust_payment_terms", e.target.value)}
            />
          </Box>
        </div>
      </DialogContent>
      <DialogActions style={{ background: "#39495E" }}>
        <Button
          onClick={handleEdit}
          style={{ color: "#FFFFFF", width: "50%", borderColor: "white" }}
        >
          EDIT
        </Button>
        <Button
          onClick={props.editClose}
          style={{ color: "#FFFFFF", width: "50%", borderColor: "white" }}
        >
          CANCEL
        </Button>
      </DialogActions>
    </React.Fragment>
  );
}

export default Edit;
