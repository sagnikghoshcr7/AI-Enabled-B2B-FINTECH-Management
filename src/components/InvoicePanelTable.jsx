import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import {
  Grid,
  Button,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Checkbox,
  Menu,
  MenuItem,
  List,
  ListItem,
} from "@material-ui/core";

import axios from "axios";
import qs from "qs";
import InfiniteScroll from "react-infinite-scroll-component";
import { headCells } from "./headCells";
import { CircularProgress } from "@material-ui/core";
import "../styles.css";

import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";

import DeleteDialogForm from "./DeleteDialogForm";
import AddFormDialog from "./AddFormDialog";
import EditDialogForm from "./EditDialogForm";
import { SERVER_URL, ROLL_NUMBER } from "../utils/constants";
import { useCallback } from "react";
import AdvanceSearch from "./AdvanceSearch";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "2rem auto",
    width: "80%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: "0",
    },
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 600,
  },
  Grid: {
    display: "flex",
    flexDirection: "column",
  },
  checkboxbodycell: {
    padding: "2px 10px",
    transform: "scale(0.7)",
    color: theme.palette.primary.main,
  },
  checkboxhead: {
    padding: "3px 10px",
    transform: "scale(0.7)",
    color: theme.palette.primary.main,
  },
  tablecontainer: {
    maxHeight: 370,
    marginBottom: "10px",
  },
  infiniteScrollGrid: {
    paddingLeft: "30px",
    paddingRight: "30px",
  },
  main: {
    // paddingTop: '20px',
    paddingLeft: "30px",
    paddingRight: "30px",
  },
  paper: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "#273D49CC",
  },
  root: {
    "& .MuiTableCell-root": {
      padding: "1px",
      fontSize: "0.60rem",
      borderBottom: "none",
    },
    "& .PrivateSwitchBase-root-18": {
      padding: "1px 1px",
    },
    "& .MuiTableCell-stickyHeader": {
      background: "#283A46",
      fontWeight: "bolder",
      color: "#97A1A9",
      fontSize: "0.5rem",
      borderBottom: "1px solid #283A46",
    },
    "& .MuiTableCell-body": {
      color: "white",
      maxHeight: "5px",
    },
    root: {
      "& .MuiFormLabel-root": {
        fontSize: "0.25rem",
        color: "white",
      },
    },
    sizeSmall: {
      height: "3px",
    },
  },

  /* Panel Header */
  header: {
    padding: "30px 30px",
  },
  input: {
    fontSize: "0.6rem",
    marginLeft: theme.spacing(1),
    flex: 1,
  },

  labelroot: {
    fontSize: "0.5rem",
    color: theme.palette.primary,
  },
  searchpaper: {
    backgroundColor: "#fff",
    height: "30px",
    marginLeft: theme.spacing(1),
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 200,
    border: `1px solid ${theme.palette.secondary.main}`,
  },
  primary: {
    color: "white",
  },
  oultined: {
    color: "blue",
  },
}));

export default function InvoicePanelTable() {
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [remove, setRemove] = useState(false);
  const [pageCount, setCount] = useState(1);
  const [responseData, setResponseData] = useState([]);
  const [isNext, isNextFunc] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(1);
  const [rowOffset, SetRowOffset] = useState(0);
  const [rowFirstCount, setRowFirstCount] = useState(0);

  const rowCountOptions = [5, 10, 20];

  const rowCountHandleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedRowIndex(index);
    displayData();
    // console.log(selectedRowIndex);
    // console.log(rowCountOptions[selectedRowIndex]);
    setAnchorEl(null);
  };

  const rowCountHandleClose = () => {
    setAnchorEl(null);
  };

  const displayData = (e) => {
    var data = qs.stringify({
      offset: rowOffset,
      limit: rowCountOptions[selectedRowIndex],
      order_by_column: "",
      sort_desc: "0",
      cust_number: "",
      business_year: "",
    });

    var config = {
      method: "post",
      url: "http://localhost:8080/hrc/api/load",

      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        const rowData = response.data["data"];
        setRowData(rowData);
        console.log(rowData);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // fetching pages to implement infinte scroll
  const handleLoad = React.useCallback(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `${SERVER_URL}/${ROLL_NUMBER}/UpdatePage?PageNo=${pageCount}`
        );

        setResponseData([...responseData, ...response.data]);
        isNextFunc(true);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [pageCount]);

  function fetchMoreData() {
    setCount(pageCount + 1);
  }

  useEffect(() => {
    displayData();
  }, []);

  React.useEffect(() => {
    handleLoad();
  }, [handleLoad, pageCount]);

  // const handleAdd = () => {
  //   setAdd(!add);
  //   handleLoad();
  // };

  const handleRemove = () => {
    setRemove(!remove);
    handleLoad();
  };

  // const handleEdit = () => {
  //   setEdit(!edit);
  //   handleLoad();
  //   // setSelected([]);
  // };

  // for search operation using debouncing.
  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 1000);
    };
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `${SERVER_URL}/${ROLL_NUMBER}/SearchData?DocId=${e.target.value}`
        );
        setResponseData([...response.data]);
        console.log([...response.data]);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const optimisedSearch = useCallback(debounce(handleSearch), []);

  // for selecting all checkboxes
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(responseData.map((row) => row.invoiceId));
      return;
    }
    setSelected([]);
  };

  // for checkbox selection
  const handleClick = (event, invoiceId) => {
    const selectedIndex = selected.indexOf(invoiceId);
    console.log(selectedIndex);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, invoiceId);
      // console.log(invoiceId)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (invoiceId) => selected.indexOf(invoiceId) !== -1;

  let goPreviousButton;

  if (rowFirstCount !== 0) {
    goPreviousButton = <NavigateBeforeIcon />;
  }

  const goPreviousRows = () => {
    SetRowOffset(rowOffset - rowCountOptions[selectedRowIndex]);
    setRowFirstCount(rowFirstCount - rowCountOptions[selectedRowIndex]);
    displayData();
  };

  const goNextRows = () => {
    SetRowOffset(rowOffset + rowCountOptions[selectedRowIndex]);
    setRowFirstCount(rowFirstCount + rowCountOptions[selectedRowIndex]);
    displayData();
  };

  return (
    <div className={classes.main}>
      <Paper elevation={3} className={classes.paper}>
        <Grid xs={12}>
          <Grid
            container
            direction="row"
            justify="space around"
            className={classes.header}
            variant="outlined "
          >
            <Grid item xs={4} direction="row" style={{ display: "flex" }}>
              <Button
                classes={{ containedPrimary: classes.primary }}
                style={{
                  backgroundColor: "#15AEF2",
                  borderRadius: "4px 0 0 4px",
                  width: "10vw",
                }}
                variant="contained"
                color={selected.length > 0 ? "secondary" : "primary"}
                size="small"
              >
                Predict
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                style={{
                  borderColor: "#15AEF2",
                  borderWidth: "1px 0 1px 0",
                  borderRadius: "0",
                  width: "10vw",
                }}
              >
                Analytics View
              </Button>
              <AdvanceSearch />
            </Grid>
            <Grid
              item
              xs={3}
              direction="row"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Paper
                component="form"
                className={classes.searchpaper}
                alignItems="center"
              >
                <InputBase
                  className={classes.input}
                  placeholder="Search Customer Id"
                  inputProps={{
                    "aria-label": "Search by Invoice Number",
                    size: "small",
                  }}
                  onChange={optimisedSearch}
                />
              </Paper>
            </Grid>
            <Grid container item xs={5} justify="space-between">
              <AddFormDialog />
              <EditDialogForm />
              <DeleteDialogForm
                selected={selected}
                remove={remove}
                onChange={handleRemove}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid className={classes.infiniteScrollGrid} xs={12}>
          <TableContainer className={classes.tablecontainer} id="scrollableDiv">
            <Table
              className={classes.table}
              stickyHeader
              aria-label="sticky table"
              className={classes.root}
              size={"small"}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      className={classes.checkboxhead}
                      onChange={handleSelectAllClick}
                      inputProps={{ "aria-label": "select all invoice" }}
                    />
                  </TableCell>

                  {headCells.map((headCell, index) => (
                    <TableCell
                      key={headCell.id}
                      align={headCell.numeric ? "right" : "left"}
                      padding={headCell.disablePadding ? "none" : "default"}
                    >
                      {headCell.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rowData.map((row, index) => {
                  const isItemSelected = isSelected(row.sl_no);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      key={row.sl_no}
                      style={
                        isItemSelected
                          ? { background: "#2A5368" }
                          : index % 2
                          ? { background: "#283A46" }
                          : { background: "#273D49CC" }
                      }
                      onClick={(event) => handleClick(event, row.sl_no)}
                      aria-checked={isItemSelected}
                      tabIndex={-1} // to set table header tabIndex as -1
                      selected={isItemSelected}
                    >
                      <TableCell>
                        <Checkbox
                          className={classes.checkboxbodycell}
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>

                      <TableCell align="left">{row.sl_no}</TableCell>
                      <TableCell align="left">{row.business_code}</TableCell>
                      <TableCell align="left">{row.cust_number}</TableCell>
                      <TableCell align="left">
                        {typeof row.clear_date == "object"
                          ? `${row.clear_date.year}-${row.clear_date.month}-${row.clear_date.day}`
                          : "-"}
                      </TableCell>
                      <TableCell align="left">{row.business_year}</TableCell>
                      <TableCell align="left">{row.doc_id}</TableCell>
                      <TableCell align="left">
                        {typeof row.posting_date == "object"
                          ? `${row.posting_date.year}-${row.posting_date.month}-${row.posting_date.day}`
                          : "-"}
                      </TableCell>
                      <TableCell align="left">
                        {typeof row.document_create_date == "object"
                          ? `${row.document_create_date.year}-${row.document_create_date.month}-${row.document_create_date.day}`
                          : "-"}
                      </TableCell>
                      <TableCell align="left">
                        {typeof row.due_in_date == "object"
                          ? `${row.due_in_date.year}-${row.due_in_date.month}-${row.due_in_date.day}`
                          : "-"}
                      </TableCell>
                      <TableCell align="left">{row.invoice_currency}</TableCell>
                      <TableCell align="left">{row.document_type}</TableCell>
                      <TableCell align="left">{row.posting_id}</TableCell>
                      <TableCell align="left">
                        {row.total_open_amount}
                      </TableCell>
                      <TableCell align="left">
                        {typeof row.document_create_date == "object"
                          ? `${row.document_create_date.year}-${row.document_create_date.month}-${row.document_create_date.day}`
                          : "-"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid
          item
          style={{
            width: "90vw",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Grid style={{ color: "#fff" }}>Rows per page</Grid>
          <Grid style={{ backgroundColor: "#283A46", margin: "0 7px" }}>
            <List component="nav" style={{ color: "#fff", paddingTop: "0", paddingBottom: "0" }}>
              <ListItem button onClick={rowCountHandleClick}>
                {rowCountOptions[selectedRowIndex]}
              </ListItem>
            </List>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={rowCountHandleClose}
            >
              {rowCountOptions.map((option, index) => (
                <MenuItem
                  key={option}
                  selected={index === setSelectedRowIndex}
                  onClick={(event) => handleMenuItemClick(event, index)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Grid>
          <Grid onClick={goPreviousRows} style={{ color: "#fff" }}>
            {goPreviousButton}
          </Grid>
          <Grid style={{ color: "#fff" }}>
            {rowFirstCount}-{rowFirstCount + rowCountOptions[selectedRowIndex]}{" "}
            of 50000
          </Grid>
          <Grid onClick={goNextRows} style={{ color: "#fff" }}>
            <NavigateNextIcon />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

// <div
//               style={{
//                 height: "50%",
//                 paddingLeft: "50%",
//                 overflow: "hidden",
//                 paddingTop: "10px",
//               }}
//             >
//               <CircularProgress
//                 disableShrink
//                 color="secondary"
//                 className={classes.circularprogess}
//               />
//               <h6 style={{ color: "#C0C6CA" }}>Loading</h6>
//             </div>
