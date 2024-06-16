import React, { useState } from "react";
import Box from "@mui/material/Box";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import "./Add.css";

const useStyles = makeStyles({
  color: {
    "& .MuiDatePicker-input": {
      color: "white",
    },
  },
  root: {
    width: "auto",
    "& .MuiOutlinedInput-input": {
      color: "white",
    },
    "& .MuiInputLabel-root": {
      color: "#ffff",
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
function Add(props) {
  const classes = useStyles();
  const [value, setValue] = useState({});

  let handleValues = (e, name, v) => {
    let selectedData = value;
    let newData = {};
    newData[name] = v;
    selectedData = { ...selectedData, ...newData };
    setValue(selectedData);
  };

  let changeDate = (date) => {
    let d = new Date(date);
    let dateFormat = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
    return dateFormat
  }

  let handleSubmit = () => {
    let options = {
      clear_date:changeDate(value.clear_date),
      posting_date:changeDate(value.posting_date),
      document_create_date:changeDate(value.document_create_date),
      due_in_date:changeDate(value.due_in_date),
      baseline_create_date:changeDate(value.baseline_create_date)
    }
    options = {...value,...options}

    axios.post("http://localhost:8080/api/customer", options).then((res) => {
      console.log(res);
      setTimeout(() => {
        props.addClose();
      }, 100);
    });
  };

  return (
    <React.Fragment>
      <DialogContent style={{ background: "#39495E" }}>
        <div>
          <h6 className="headadd">ADD</h6>

          <Box
            label="Add"
            alignItems="center"
            component="form"
            noValidate
            sx={{
              display: "grid",
              gridTemplateColumns: { sm: "1fr 1fr 1fr 1fr" },
              gap: 2,
            }}
          >
            <TextField
              id="outlined-basic"
              label="Bussiness Code"
              variant="outlined"
              className={classes.root}
              value={value.business_code}
              onChange={(e) => handleValues(e, "business_code", e.target.value)}
            />
            <TextField
              className={classes.root}
              id="outlined-basic"
              label="Customer Number"
              variant="outlined"
              value={value.cust_number}
              onChange={(e) => handleValues(e, "cust_number", e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                className={classes.color}
                label="Clear Date"
                value={value.clear_date}
                onChange={(newValue) => {
                  handleValues("", "clear_date", newValue);
                }}
                renderInput={(params) => (
                  <TextField className={classes.root} {...params} />
                )}
              />
            </LocalizationProvider>
            <TextField
              className={classes.root}
              id="outlined-basic"
              label="Business Year"
              variant="outlined"
              value={value.business_year}
              onChange={(e) => handleValues(e, "business_year", e.target.value)}
            />
            <TextField
              className={classes.root}
              id="outlined-basic"
              label="Document Id"
              variant="outlined"
              value={value.doc_id}
              onChange={(e) => handleValues(e, "doc_id", e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Posting Date"
                value={value.posting_date}
                onChange={(newValue) => {
                  handleValues("", "posting_date", newValue);
                }}
                renderInput={(params) => (
                  <TextField className={classes.root} {...params} />
                )}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Document Create Date"
                value={value.document_create_date}
                onChange={(newValue) => {
                  handleValues("", "document_create_date", newValue);
                }}
                renderInput={(params) => (
                  <TextField className={classes.root} {...params} />
                )}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Due Date"
                value={value.due_in_date}
                onChange={(newValue) => {
                  handleValues("", "due_in_date", newValue);
                }}
                renderInput={(params) => (
                  <TextField className={classes.root} {...params} />
                )}
              />
            </LocalizationProvider>
            <TextField
              className={classes.root}
              id="outlined-basic"
              label="Invoice Currency"
              variant="outlined"
              value={value.invoice_currency}
              onChange={(e) =>
                handleValues(e, "invoice_currency", e.target.value)
              }
            />
            <TextField
              className={classes.root}
              id="outlined-basic"
              label="Document Type"
              variant="outlined"
              value={value.document_type}
              onChange={(e) => handleValues(e, "document_type", e.target.value)}
            />
            <TextField
              className={classes.root}
              id="outlined-basic"
              label="Posting Id"
              variant="outlined"
              value={value.posting_id}
              onChange={(e) => handleValues(e, "posting_id", e.target.value)}
            />
            <TextField
              className={classes.root}
              id="outlined-basic"
              label="Total Open Amount"
              variant="outlined"
              value={value.total_open_amount}
              onChange={(e) =>
                handleValues(e, "total_open_amount", e.target.value)
              }
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Baseline Create Date"
                value={value.baseline_create_date}
                onChange={(newValue) => {
                  handleValues("", "baseline_create_date", newValue);
                }}
                renderInput={(params) => (
                  <TextField className={classes.root} {...params} />
                )}
              />
            </LocalizationProvider>
            <TextField
              className={classes.root}
              id="outlined-basic"
              label="Customer Payment Terms"
              variant="outlined"
              value={value.cust_payment_terms}
              onChange={(e) =>
                handleValues(e, "customer_payment_terms", e.target.value)
              }
            />
            <TextField
              className={classes.root}
              id="outlined-basic"
              label="Invoice Id"
              variant="outlined"
              value={value.invoice_id}
              onChange={(e) => handleValues(e, "invoice_id", e.target.value)}
            />
          </Box>
        </div>
      </DialogContent>
      <DialogActions style={{ background: "#39495E" }}>
        <Button
          onClick={handleSubmit}
          style={{ color: "#FFFFFF", width: "50%", borderColor: "white" }}
        >
          ADD
        </Button>
        <Button
          onClick={props.addClose}
          style={{ color: "#FFFFFF", width: "50%", borderColor: "white" }}
        >
          CANCEL
        </Button>
      </DialogActions>
    </React.Fragment>
  );
}

export default Add;
