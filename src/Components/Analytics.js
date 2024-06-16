import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Chart from "./Chart";
import Dialog from '@mui/material/Dialog';
import "./Analytics.css";


const useStyles = makeStyles(() =>({
    root: {
      width: "auto",
      "& .MuiOutlinedInput-input": {
        color: "white"
      },
      "& .MuiInputLabel-root": {
        color: "white"
      },
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#14AFF1"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
        color: "white"
      },
      "& .MuiInputLabel-root.Mui-focused": {
        color: "white"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "white"
      }
    },
  }));
function ANALYTICS (props) {
    const classes = useStyles();
    const [ openChart, setOpenChart ] = useState(false);
    const [value, setValue] = useState({});
    
    const chartClose = (props) => {
        setOpenChart(false);
    };
    let handleValues = (e, name, v) => {
        let selectedData = value;
        let newData = {}
        newData[name] = v;
        selectedData = {...selectedData,...newData}
        setValue(selectedData);
      };
    
      let handleSubmit = () => {
        setOpenChart(true);
        axios.post("http://localhost:8080/api/customer",value).then((res) => {
          console.log(res)
          setTimeout(() => {
            props.chartClose()
          }, 100);
        })
      }
      
    return (
        <React.Fragment>
            <DialogContent style={{background: "#39495E"}}>
                <div>
                    <h6 className="headanalytics">ANALYTICS VIEW</h6>
                <Box
                    alignItems="top"
                    component="form"
                    noValidate
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { sm: '1fr 1fr' },
                        gap: 2,
                    }}
                >
                    <Box
                
                        alignItems="left"
                        component="form"
                        color= "white"
                        noValidate
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { sm: '1fr' },
                            gap: 2,
                        }}
                    >
                        <heading>Clear Date</heading>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            value={value.clear_date_from}
                            inputFormat="dd/MM/yyy"
                            onChange={(newValue) => {
                                handleValues("", "clear_date_from", newValue)
                            }}
                            renderInput={(params) => <TextField 
                                className={classes.root}
                                {...params} />}
                        />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            value={value.clear_date_to}
                            inputFormat="dd/MM/yyy"
                            onChange={(newValue) => {
                                handleValues("", "clear_date_to", newValue)
                            }}
                            renderInput={(params) => <TextField 
                                className={classes.root}
                                {...params} />}
                        />
                        </LocalizationProvider>
                    </Box>
                    
                    <Box
                        alignItems="right"
                        component="form"
                        color="white"
                        noValidate
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { sm: '1fr' },
                            gap: 2,
                        }}
                    >
                        <heading>Due Date</heading>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            value={value.due_date_from}
                            inputFormat="dd/MM/yyy"
                            onChange={(newValue) => {
                                handleValues("", "due_date_from", newValue)
                            }}
                            renderInput={(params) => <TextField 
                                className={classes.root}
                                {...params} />}
                        />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            value={value.due_date_to}
                            inputFormat="dd/MM/yyy"
                            onChange={(newValue) => {
                                handleValues("", "due_date_to", newValue)
                            }}
                            renderInput={(params) => <TextField 
                                className={classes.root}
                                {...params} />}
                        />
                        </LocalizationProvider>
                    </Box>
                    <Box
                        alignItems="left"
                        component="form"
                        color="white"
                        noValidate
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { sm: '1fr' },
                            gap: 2,
                        }}
                    >
                        <heading>Baseline Create Date</heading>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            value={value.baseline_create_date_from}
                            inputFormat="dd/MM/yyy"
                            onChange={(newValue) => {
                                handleValues("", "baseline_create_date_from", newValue)
                            }}
                            renderInput={(params) => <TextField 
                                className={classes.root}
                                {...params} />}
                        />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            value={value.baseline_create_date_to}
                            inputFormat="dd/MM/yyy"
                            onChange={(newValue) => {
                                handleValues("", "baseline_create_date_to", newValue)
                            }}
                            renderInput={(params) => <TextField 
                                className={classes.root}
                                {...params} />}
                        />
                        </LocalizationProvider>
                    </Box>
                    <Box
                        alignItems="top"
                        component="form"
                        color="white"
                        noValidate
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { sm: '1fr' },
                            gap: 2,
                          }}
                    >
                        <heading>Invoice Currency</heading>
                        <div className='invoice'>
                        <TextField  
                            id="outlined-basic"
                            label="Invoice Currency" 
                            variant="outlined" 
                            className={classes.root}
                            value={value.invoice_currency}
                            onChange={(e) => handleValues(e, "invoice_currency", e.target.value)}
                        />
                        </div>
                    </Box> 
                </Box>
            </div>
            </DialogContent>
            <DialogActions style={{background: "#39495E"}}>
                <Button onClick={handleSubmit} style={{color: '#FFFFFF', width:"50%", borderColor: "white"}}>SUBMIT</Button>
                <Dialog  
                    sx={{
                        "& .MuiDialog-container": {
                            "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "2000px",  
                            },
                        },
                        }} 
                    open={openChart} 
                    chartClose={chartClose} 
                >
                    <Chart
                        chartClose={chartClose}
                    />
                </Dialog>
                <Button onClick={props.viewClose} style={{color: '#FFFFFF', width:"50%", borderColor: "white"}}>CANCEL</Button>
            </DialogActions>
        </React.Fragment>
    );
    
}

export default ANALYTICS;