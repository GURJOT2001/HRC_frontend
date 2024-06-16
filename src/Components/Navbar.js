import React, {useState} from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Dialog from '@mui/material/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import Advance from './Advance';
import Add from './Add';
import Edit from './Edit';
import Delete from './Delete';
import "./Navbar.css";
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from 'axios';
import Analytics from './Analytics';

const useStyles = makeStyles(theme => ({
    paper: { 
      minWidth: "80%" ,
      height: "65%"
  },
}));

const Navbar = ({ history,selectedItem,handleCustomerSearch ,handleAdvanceSearch,refreshGrid}) => {
  const classes = useStyles();
  const [keyword, setKeyword] = useState("");
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push();
    } else {
      history.push();
    }
  };
  const [ openAdvanceInvoice, setOpenAdvanceInvoice ] = useState(false);
  const [ openAddInvoice, setOpenAddInvoice ] = useState(false);
  const [ openDeleteInvoice, setOpenDeleteInvoice ] = useState(false);
  const [ openEditInvoice, setOpenEditInvoice ] = useState(false);
  const [ Predictvariant, setPredictVariant ] = useState("outlined");
  const [ Viewvariant, setViewVariant ] = useState("outlined");
  const [ Advancevariant, setAdvanceVariant ] = useState("outlined");
  const [ Openvariant, setOpenVariant ] = useState("outlined");
  const [ Editvariant, setEditVariant ] = useState("outlined");
  const [ Deletevariant, setDeleteVariant ] = useState("outlined");
  const [ Refreshvariant, setRefreshVariant ] = useState("outlined");
  const [ openViewAnalytics, setOpenViewAnalytics ] = useState(false);

  const predictOpen = () => {
    setPredictVariant("contained");
    setViewVariant("outlined");
    setAdvanceVariant("outlined");
    setOpenVariant("outlined");
    setEditVariant("outlined");
    setDeleteVariant("outlined");
    axios.post("http://127.0.0.1:5000/all")
      .then(response => {
            console.log(response)
      })
      .catch(error => {
            console.log(error)
        })
  };

  // const predictClose = () => {
  //   setOpenAdvanceInvoice(false);
  // };
  const viewOpen = () => {
    setOpenViewAnalytics(true);
    setPredictVariant("outlined");
    setViewVariant("contained");
    setAdvanceVariant("outlined");
    setOpenVariant("outlined");
    setEditVariant("outlined");
    setDeleteVariant("outlined");
  };

  const viewClose = () => {
    setOpenViewAnalytics(false);
  };
  const advanceOpen = () => {
    setOpenAdvanceInvoice(true);
    setPredictVariant("outlined");
    setViewVariant("outlined");
    setAdvanceVariant("contained");
    setOpenVariant("outlined");
    setEditVariant("outlined");
    setDeleteVariant("outlined");
  };
  const refresh = () => {
    setRefreshVariant(true);
    setDeleteVariant("outlined");
    setEditVariant("outlined");
    setOpenVariant("outlined");
    setPredictVariant("outlined");
    setViewVariant("outlined");
    setAdvanceVariant("outlined");
    setRefreshVariant("contained");
    window.location.reload();
    };

  const advanceClose = () => {
    setOpenAdvanceInvoice(false);
  };
  const addOpen = () => {
    setOpenAddInvoice(true);
    setOpenVariant("contained");
    setEditVariant("outlined");
    setDeleteVariant("outlined");
    setPredictVariant("outlined");
    setViewVariant("outlined");
    setAdvanceVariant("outlined");
  };

  const addClose = () => {
    setOpenAddInvoice(false);
    refreshGrid()
  };
  const editOpen = () => {
    setOpenEditInvoice(true);
    setEditVariant("contained");
    setOpenVariant("outlined");
    setDeleteVariant("outlined");
    setPredictVariant("outlined");
    setViewVariant("outlined");
    setAdvanceVariant("outlined");
  };

  const editClose = () => {
    setOpenEditInvoice(false);
    refreshGrid()
  };
  const deleteOpen = () => {
    setOpenDeleteInvoice(true);
    setDeleteVariant("contained");
    setEditVariant("outlined");
    setOpenVariant("outlined");
    setPredictVariant("outlined");
    setViewVariant("outlined");
    setAdvanceVariant("outlined");
  };

  const deleteClose = () => {
    setOpenDeleteInvoice(false);
    refreshGrid()
  };

  


 
  return (
      <div className="Navcon">
        <div className="Navbu1">
          <ButtonGroup 
            className="Navbar1" 
            variant= "outlined"
            aria-label="outlined button group">
            <Button
                variant={Predictvariant}
                onClick={predictOpen}
                disabled={selectedItem.length < 1}
                style={{color: '#FFFFFF', width:"180px"}}
            >
              PREDICT
            </Button>
            <Button 
              variant={Viewvariant}
              onClick={viewOpen}
              style={{color: '#FFFFFF', width:"180px"}}
            >
              ANALYTICS VIEW
            </Button>
            <Dialog open={openViewAnalytics} onClose={viewClose}>
              <Analytics
                viewClose={viewClose}
              />
            </Dialog>
            <Button 
              variant={Advancevariant}
              onClick={advanceOpen}
              style={{color: '#FFFFFF', width:"180px"}}>ADVANCE SEARCH
            </Button>
            <Dialog open={openAdvanceInvoice} onClose={advanceClose}>
                  
                    <Advance
                    advanceClose={advanceClose}
                    handleAdvanceSearch={handleAdvanceSearch}
                    />
            </Dialog>
            <Button 
              variant={Refreshvariant}
              onClick={refresh}
              style={{color: '#FFFFFF', width:"auto"}}>
              <RefreshIcon>Refresh</RefreshIcon>
            </Button>
            
          </ButtonGroup>
        </div>
        <div className="Search">
          <form onSubmit={searchSubmitHandler}>
          <input
            type="text"
            className="searchBox"
            placeholder="Search Customer ID"
            onChange={(e) => {setKeyword(e.target.value);handleCustomerSearch(e.target.value)}}
            style={{height:"33px", textAlign:"center"}}
          />
          </form>
        </div>
        <div className="Navbu2">
          <ButtonGroup className="Navbar2"  aria-label="outlined button group">
              <Button
                variant={Openvariant}
                onClick={addOpen}
                disabled={selectedItem.length > 0}
                style={{color: '#FFFFFF', width:"180px"}}>ADD</Button>
              <Dialog classes={{ paper : classes.paper}} open={openAddInvoice} onClose={addClose}>
                 
                    <Add
                    addClose={addClose}
                    />
               
              </Dialog>
              <Button 
                variant={Editvariant}
                onClick={editOpen}
                disabled={selectedItem.length !== 1}
                style={{color: '#FFFFFF', width:"180px"}}>EDIT</Button>
                <Dialog open={openEditInvoice} onClose={editClose}>
                    <Edit
                    selectedItem={selectedItem}
                    editClose={editClose}
                    />
               
              </Dialog>
            <Button 
              variant={Deletevariant}
              onClick={deleteOpen}
              disabled={selectedItem.length === 0}
              style={{color: '#FFFFFF', width:"180px"}}>DELETE</Button>
              <Dialog open={openDeleteInvoice} onClose={deleteClose}>
                    <Delete
                    selectedItem={selectedItem}
                      deleteClose={deleteClose}
                    />
                
              </Dialog>
          </ButtonGroup>
        </div>
      </div>
  );
}


export default Navbar;