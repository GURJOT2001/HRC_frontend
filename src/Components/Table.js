import React,{useEffect} from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";
import axios from "axios";
import Navbar from './Navbar';


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "sl_no",
    numeric: false,
    disablePadding: true,
    label: "Sl no"
  },
  {
    id: "business_code",
    numeric: true,
    disablePadding: false,
    label: "Business Code"
  },
  {
    id: "cust_number",
    numeric: true,
    disablePadding: false,
    label: "Customer Number"
  },
  {
    id: "clear_date",
    numeric: true,
    disablePadding: false,
    label: "Clear Date"
  },
  {
    id: "business_year",
    numeric: true,
    disablePadding: false,
    label: "Business Year"
  },
  {
    id: "doc_id",
    numeric: true,
    disablePadding: false,
    label: "Document Id"
  },
  {
    id: "posting_date",
    numeric: true,
    disablePadding: false,
    label: "Posting Date"
  },
  {
    id: "document_create_date",
    numeric: true,
    disablePadding: false,
    label: "Document Create Date",
  },
  {
    id: "due_in_date",
    numeric: true,
    disablePadding: false,
    label: "Due In Date"
  },
  {
    id: "invoice_currency",
    numeric: true,
    disablePadding: false,
    label: "Invoice Currency"
  },
  {
    id: "document_type",
    numeric: true,
    disablePadding: false,
    label: "Document Type"
  },
  {
    id: "posting_id",
    numeric: true,
    disablePadding: false,
    label: "Posting Id"
  },
  {
    id: "total_open_amount",
    numeric: true,
    disablePadding: false,
    label: "Total Open Amount"
  },
  {
    id: "baseline_create_date",
    numeric: true,
    disablePadding: false,
    label: "Baseline Create Date"
  },
  {
    id: "cust_payment_terms",
    numeric: true,
    disablePadding: false,
    label: "Customer Payment Terms"
  },
  {
    id: "invoice_id",
    numeric: true,
    disablePadding: false,
    label: "Invoice Id"
  },
  {
    id: "aging_bucket",
    numeric: true,
    disablePadding: false,
    label: "Aging Bucket"
  }
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts"
            }}
            style={{color: '#FFFFFF'}}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "left" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{color: '#FFFFFF'}}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              style={{color: '#FFFFFF'}}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("sl_no");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedItem,setItem] = React.useState([]);
  const [oRows,setORows] = React.useState([]);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const [rows,setRow] = React.useState([]);
  useEffect(() =>{
    axios.get("http://localhost:8080/api/customer").then((res) => {
      setRow(res.data)
      setORows(res.data)
    })
  },[])


  let refreshGrid = () => {
    axios.get("http://localhost:8080/api/customer").then((res) => {
      setRow(res.data)
      setORows(res.data)
      setItem([])
    })
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
    //  document.querySelectorAll('input[type=checkbox]').forEach(i => {
    //    console.log(i)
    //     i.checked = true;
    //     return i;
    //   });
      let arr = []
     document.querySelectorAll('input[type=checkbox]').forEach(i => {
       console.log(i,i.value)
        rows.map((j) => {
          if(j.sl_no == i.value){
            console.log(j)
            arr.push(j)
          }
          return j
        })
        return i;
      })
      console.log(arr)
      setItem(arr)
      return;
    }
    setItem([]);
  };

  let handleAdvanceSearch = (filter) => {
    let arr = oRows;
    Object.keys(filter).map((i) => {
      arr = arr.filter(j => j[i].toString().indexOf(filter[i]) > -1);
      return arr;
    })
    setRow(arr)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let handleCustomerSearch = (value) => {
    let arr = oRows;
    arr = arr.filter(i => i.cust_number.toString().indexOf(value) > -1)
    setRow(arr)
  }


  let handleCheckBox = (e,data) => {
    console.log(data)
    let arr = selectedItem;
    let arr123 = arr.filter(i => i.sl_no !== data.sl_no)
    let arre = arr.filter(i => i.sl_no === data.sl_no)
    if(!(arre && arre.length > 0)){
      arr123.push(data);
    }
    console.log(arr123)
    setItem(arr123)
  }

  const isSelected = (sl_no) => selectedItem.filter(i => i.sl_no === sl_no).length > 0;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  
  return (
    <React.Fragment>
      <div className="back">
                    <Navbar
                      selectedItem={selectedItem}
                      refreshGrid={refreshGrid}
                      handleCustomerSearch= {handleCustomerSearch}
                      handleAdvanceSearch={handleAdvanceSearch}
                    />
                </div>
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 , background: "#39495E", color: "#FFFFFF"}}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750}}
            aria-labelledby="tableTitle"
            size={"small"}
          >
            <EnhancedTableHead
              numSelected={selectedItem.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rowsPerPage}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.sl_no);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleCheckBox(event, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.sl_no}
                      selected={isItemSelected}
                      style={{color: '#FFFFFF'}}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          value={row.sl_no}
                          inputProps={{
                            "aria-labelledby": labelId
                          }}
                          onClick={(e) => handleCheckBox(e,row)}
                          style={{color: '#FFFFFF'}}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        align='center'
                        style={{color: '#FFFFFF'}}
                      >
                        {row.sl_no}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        align='center'
                        style={{color: '#FFFFFF'}}
                      >
                        {row.business_code}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        align='center'
                        style={{color: '#FFFFFF'}}
                      >
                        {row.cust_number}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        align='center'
                        style={{color: '#FFFFFF'}}
                      >
                        {row.clear_date}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        align='center'
                        style={{color: '#FFFFFF'}}
                      >
                        {row.business_year}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        align='center'
                        style={{color: '#FFFFFF'}}
                      >
                        {row.doc_id}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        align='center'
                        style={{color: '#FFFFFF'}}
                      >
                        {row.posting_date}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        align='center'
                        style={{color: '#FFFFFF'}}
                      >
                        {row.document_create_date}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        align='center'
                        style={{color: '#FFFFFF'}}
                      >
                        {row.due_in_date}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        align='center'
                        style={{color: '#FFFFFF'}}
                      >
                        {row.invoice_currency}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        align='center'
                        style={{color: '#FFFFFF'}}
                      >
                        {row.document_type}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        align='center'
                        style={{color: '#FFFFFF'}}
                      >
                        {row.posting_id}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        align='center'
                        style={{color: '#FFFFFF'}}
                      >
                        {row.total_open_amount}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        align='center'
                        style={{color: '#FFFFFF'}}
                      >
                        {row.baseline_create_date}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        align='center'
                        style={{color: '#FFFFFF'}}
                      >
                        {row.cust_payment_terms}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        align='center'
                        style={{color: '#FFFFFF'}}
                      >
                        {row.invoice_id}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        align='center'
                        style={{color: '#FFFFFF'}}
                      >
                        {row.aging_bucket}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 20 * emptyRows
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25,50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          style={{color: '#FFFFFF'}}
        />
      </Paper>
    </Box>
    </React.Fragment>
  );
}
