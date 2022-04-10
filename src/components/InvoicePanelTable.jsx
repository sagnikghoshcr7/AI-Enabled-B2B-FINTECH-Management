import React, { useContext, useEffect, useState } from "react";
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
import { headCells } from "./headCells";
import { CircularProgress } from "@material-ui/core";
import "../styles.css";

import InputBase from "@material-ui/core/InputBase";
import RefreshIcon from "@material-ui/icons/Refresh";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";

import DeleteDialogForm from "./DeleteDialogForm";
import AddFormDialog from "./AddFormDialog";
import EditDialogForm from "./EditDialogForm";
import { SERVER_URL, ROLL_NUMBER } from "../utils/constants";
import { useCallback } from "react";
import AdvanceSearch from "./AdvanceSearch";
import { RowSelectContext } from "../contexts/RowSelectContext";
import AnalyticsView from "./AnalyticsView";

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
    overflowX: "auto !important",
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
  tablecellbutton: {
    cursor: "pointer",
  },
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
  const [toatalDataCount, setToatalDataCount] = useState(0);
  const [rowData, setRowData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(1);
  const [tempSelectedRowIndex, setTempSelectedRowIndex] = useState(1);
  const [rowOffset, SetRowOffset] = useState(0);
  const [rowSortDesc, setRowSortDesc] = useState(0);
  const [rowFirstCount, setRowFirstCount] = useState(0);
  const [rowCustNo, setRowCustNo] = useState("");
  const [viewCircularProgress, setViewCircularProgress] = useState(true);
  const [advSearchParams, setAdvSearchParams] = useState(["", "", "", ""]);
  const [advDocumentId, setAdvDocumentId] = useState("");
  const [advInvoiceId, setAdvInvoiceId] = useState("");
  const [advBusinessYear, setAdvBusinessYear] = useState("");
  const [addOrderByColumn, setAddOrderByColumn] = useState("");
  const [predictDataObj, setPredictDataObj] = useState([]);

  const { rowSelectArr, setRowSelectArr } = useContext(RowSelectContext);

  const rowCountOptions = [5, 10, 20];

  const rowCountHandleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    setSelectedRowIndex(tempSelectedRowIndex);
    displayData();
  }, [tempSelectedRowIndex]);

  useEffect(() => {
    displayData();
  }, [rowOffset, rowFirstCount]);

  useEffect(() => {
    // console.log("value -> ", advSearchParams);
    setAdvDocumentId(advSearchParams[0]);
    setAdvInvoiceId(advSearchParams[1]);
    setRowCustNo(advSearchParams[2]);
    setAdvBusinessYear(advSearchParams[3]);
    displayData();
  }, [
    advSearchParams,
    advDocumentId,
    advInvoiceId,
    advBusinessYear,
    rowCustNo,
  ]);

  const handleMenuItemClick = (event, index) => {
    setSelectedRowIndex(index);
    setTempSelectedRowIndex(index);
    // displayData();
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
      limit: rowCountOptions[tempSelectedRowIndex],
      order_by_column: addOrderByColumn,
      sort_desc: rowSortDesc,
      doc_id: advDocumentId,
      invoice_id: advInvoiceId,
      cust_number: rowCustNo,
      business_year: advBusinessYear,
    });

    var config = {
      method: "post",
      url: SERVER_URL + "hrc/api/load",
      // url: "http://9982-103-2-132-50.ngrok.io/hrc/api/load",

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
        setViewCircularProgress(false);
        // console.log(rowData);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const countTotalData = (e) => {
    var config = {
      method: "post",
      url: SERVER_URL + "hrc/api/CountServlet",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        const toatalDataCount = response.data;
        setToatalDataCount(toatalDataCount);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const predictData = (e) => {
    var data = predictDataObj;

    var config = {
      method: "post",
      url: "http://127.0.0.1:5000/predict",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": true,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    displayData();
    countTotalData();
    predictData();
  }, []);

  const refreshButtonClick = (event) => {
    SetRowOffset(0);
    setTempSelectedRowIndex(1);
    setAdvDocumentId("");
    setAdvInvoiceId("");
    setRowCustNo("");
    setAdvBusinessYear("");
    setRowFirstCount(0);
    displayData();
  };

  // for selecting all checkboxes
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(rowData.map((row) => row.sl_no));
      setRowSelectArr(rowData.map((row) => row.sl_no));
      // console.log(selected);
      // console.log(rowData.map((row) => row.sl_no));
      return;
    }
    setSelected([]);
  };

  let newSelected = [];

  // for checkbox selection
  const handleClick = (event, sl_no) => {
    const selectedIndex = selected.indexOf(sl_no);
    // console.log(selectedIndex);

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, sl_no);
      // console.log(sl_no)
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
    setRowSelectArr(newSelected);
    // console.log(newSelected);
    // console.log(newSelected[newSelected.length - 1]);
  };

  const isSelected = (sl_no) => selected.indexOf(sl_no) !== -1;

  let prdDummyArr = [];
  const predictButtonClick = () => {
    rowSelectArr.map((rowVal) => {
      prdDummyArr.push(rowData[rowVal - 1]);
    });
    setPredictDataObj(JSON.stringify(prdDummyArr));
    // console.log(predictDataObj);
  };

  let goPreviousButton;

  if (rowFirstCount !== 0) {
    goPreviousButton = <NavigateBeforeIcon />;
  }

  let dataloaderCircularProgress;

  if (viewCircularProgress === true) {
    dataloaderCircularProgress = (
      <div
        style={{
          width: "90vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "6vh 0",
        }}
      >
        <CircularProgress disableShrink color="secondary" />
        <h6 style={{ color: "#C0C6CA", padding: "1vw 0 0 0" }}>Loading</h6>
      </div>
    );
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
                onClick={predictButtonClick}
              >
                Predict
              </Button>
              <AnalyticsView />
              <AdvanceSearch
                displayData={displayData}
                setAdvSearchParams={(advSearchPropsArray) =>
                  setAdvSearchParams(advSearchPropsArray)
                }
              />
            </Grid>
            <Grid
              item
              xs={3}
              direction="row"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <RefreshIcon
                onClick={refreshButtonClick}
                style={{
                  color: "#15AEF2",
                  fontSize: "31",
                  padding: "1px 7px",
                  border: "1px solid",
                  borderRadius: "5px",
                }}
              />
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
                  onChange={(e) => {
                    setRowCustNo(e.target.value);
                    displayData();
                  }}
                />
              </Paper>
            </Grid>
            <Grid container item xs={5} justify="space-between">
              <AddFormDialog displayData={displayData} />
              <EditDialogForm displayData={displayData} />
              <DeleteDialogForm
                displayData={displayData}
                countTotalData={countTotalData}
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
                      // align={headCell.numeric ? "right" : "left"}
                      // padding={headCell.disablePadding ? "none" : "default"}
                      // style={{width: '6vw'}}
                      className={classes.tablecellbutton}
                      style={{ fontSize: "0.6rem" }}
                      padding={"none"}
                      onClick={(event) => {
                        setAddOrderByColumn(headCell.id);
                        if (rowSortDesc === 0) {
                          setRowSortDesc(1);
                        }
                        if (rowSortDesc === 1) {
                          setRowSortDesc(0);
                        }
                        displayData();
                      }}
                    >
                      <pre
                        style={{
                          margin: "auto 10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        {headCell.label}
                        <UnfoldMoreIcon
                          style={{
                            color: "#fff",
                            fontSize: "10",
                          }}
                        />
                      </pre>
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
                      <TableCell align="left">
                        {row.cust_payment_terms}
                      </TableCell>
                      <TableCell align="left">{row.invoice_id}</TableCell>
                      <TableCell align="left">-</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <Grid>{dataloaderCircularProgress}</Grid>
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
            <List
              component="nav"
              style={{ color: "#fff", paddingTop: "0", paddingBottom: "0" }}
            >
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
            {rowFirstCount + 1}-
            {rowFirstCount + rowCountOptions[selectedRowIndex]} of{" "}
            {toatalDataCount}
          </Grid>
          <Grid onClick={goNextRows} style={{ color: "#fff" }}>
            <NavigateNextIcon />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
