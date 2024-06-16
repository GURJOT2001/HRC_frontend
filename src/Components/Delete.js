import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import "./Delete.css";
import axios from "axios";

function Delete(props) {
  let deleteData = () => {
    let data = "";
    props.selectedItem.map((i) => {
      data += i.sl_no + "&";
      return data;
    });
    axios
      .delete("http://localhost:8080/api/customer?id="+data)
      .then((res) => {
        console.log(res);
        setTimeout(() => {
          props.deleteClose();
        }, 1000);
      });
  };
  return (
    <React.Fragment>
      <DialogContent style={{ background: "#39495E" }}>
        <div>
          <h3 className="headdelete">Delete Records ?</h3>
          <Box
            alignItems="center"
            component="form"
            noValidate
            sx={{
              display: "grid",
              gridTemplateColumns: { sm: "1fr" },
              gap: 2,
            }}
          >
            <Typography style={{ margin: "auto", color: "white" }} variant="h6">
              Are you sure you want to delete these record[s] ?
            </Typography>
          </Box>
        </div>
      </DialogContent>

      <DialogActions style={{ background: "#39495E" }}>
        <Button
          onClick={deleteData}
          style={{ color: "#FFFFFF", width: "50%", borderColor: "white" }}
        >
          DELETE
        </Button>
        <Button
          onClick={props.deleteClose}
          style={{ color: "#FFFFFF", width: "50%", borderColor: "white" }}
        >
          CANCEL
        </Button>
      </DialogActions>
    </React.Fragment>
  );
}

export default Delete;
