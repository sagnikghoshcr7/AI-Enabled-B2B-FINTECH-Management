import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import axios from "axios";
import qs from "qs";
import { withStyles } from "@material-ui/core/styles";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import InputLabel from "@material-ui/core/InputLabel";
import InputBase from "@material-ui/core/InputBase";
import { Fragment, useState } from "react";
import Grid from "@material-ui/core/Grid";

const useStyle = makeStyles((theme) => ({
  add: {
    marginLeft: theme.spacing(1),
    width: "10vw",
    border: `1px solid ${theme.palette.secondary.main}`,
    color: theme.palette.primary.main,
    background: "#273D49CC",
  },
  root: {
    maxWidth: 900,
    height: 500,
    margin: "auto",
  },
  paperWidthSm: {
    maxWidth: 1900,
  },
  label: {
    color: "#97A1A9",
  },
  button: {
    float: "right",
  },
  TextField: {
    width: 300,
    height: 60,
    color: "white",
    padding: "0px 0px",
    fontSize: "1rem",
    border: "1px solid #356680",
    borderRadius: "10px",
    opacity: "1",
    backgroundColor: "#fff",
    borderColor: "#356680",
  },
  colour: {
    borderColor: "#14AFF1",
  },
  root: {
    "& .MuiOutlinedInput-input": {
      // padding: "5px 0px",
    },
    "& .MuiInputBase-input": {
      // color: "white",
      paddingLeft: "5px",
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      paddingTop: "10px",
    },
  },
}));
export default function AddFormDialog({ displayData }) {
  const [open, setOpen] = React.useState(false);
  // const [selectedDate, handleDateChange] = useState(new Date());
  const [addBusinessCode, setAddBusinessCode] = useState("");
  const [addCustomerNo, setAddCustomerNo] = useState("");
  const [addClearDate, setAddClearDate] = useState("");
  // const [addClearDateFmt, setAddClearDateFmt] = useState("");
  const [addBusinessYear, setAddBusinessYear] = useState("");
  const [addDocumentId, setAddDocumentId] = useState("");
  const [addPostingDate, setAddPostingDate] = useState("");
  const [addDocumentCreateDate, setAddDocumentCreateDate] = useState("");
  const [addDueDate, setAddDueDate] = useState("");
  const [addInvoiceCurrency, setAddInvoiceCurrency] = useState("");
  const [addDocumentType, setAddDocumentType] = useState("");
  const [addPostingId, setAddPostingId] = useState("");
  const [addTotalOpenAmount, setAddTotalOpenAmount] = useState("");
  const [addBaselineCreateDate, setAddBaselineCreateDate] = useState("");
  const [addCustomerPaymentTerms, setAddCustomerPaymentTerms] = useState("");
  const [addInvoiceId, setAddInvoiceId] = useState("");

  useEffect(() => {
    console.log(addBusinessCode);
    // clearDateFormatting(addClearDate)
    // console.log(addClearDate);
    // console.log("2 -> ",addClearDateFmt);
  });

  // function clearDateFormatting(tempDate) {
  //   var newDate = tempDate.split("-").reverse().join("-");
  //   setAddClearDateFmt(newDate)
  //   console.log("temp -> ", tempDate);
  //   console.log("new -> ", newDate);
  //   console.log("1 -> ",addClearDate);
  //   console.log("2 -> ",addClearDateFmt);
  // }

  // function postingDateFormatting(tempDate) {
  //   var newDate = tempDate.split("-").reverse().join("-");
  //   setAddClearDateFmt(newDate)
  // }

  // function documentCreateDateFormatting(tempDate) {
  //   var newDate = tempDate.split("-").reverse().join("-");
  //   setAddClearDateFmt(newDate)
  // }

  // function dueDateFormatting(tempDate) {
  //   var newDate = tempDate.split("-").reverse().join("-");
  //   setAddClearDateFmt(newDate)
  // }

  // function baselineCreateDateFormatting(tempDate) {
  //   var newDate = tempDate.split("-").reverse().join("-");
  //   setAddClearDateFmt(newDate)
  // }

  const editData = (e) => {
    var data = qs.stringify({
      business_code: addBusinessCode,
      cust_number: addCustomerNo,
      clear_date: addClearDate,
      business_year: addBusinessYear,
      doc_id: addDocumentId,
      posting_date: addPostingDate,
      document_create_date: addDocumentCreateDate,
      // 'document_create_date1': '2019-01-05',
      due_in_date: addDueDate,
      invoice_currency: addInvoiceCurrency,
      document_type: addDocumentType,
      posting_id: addPostingId,
      // 'area_business': '',
      total_open_amount: addTotalOpenAmount,
      baseline_create_date: addBaselineCreateDate,
      cust_payment_terms: addCustomerPaymentTerms,
      invoice_id: addInvoiceId,
      // 'isOpen': '0',
      // 'aging_bucket': '',
      // 'is_deleted': '0',
      // 'predicted': ''
    });
    var config = {
      method: "post",
      url: "localhost:8080/Grey_Goose/api/add",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        displayData();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const classes = useStyle();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const DialogContent = withStyles((theme) => ({
    root: {
      backgroundColor: "#2A3E4C",
      borderTop: `1px solid ${theme.palette.divider}`,
      margin: 0,
      padding: theme.spacing.unit * 2,
      // width:1000,
    },
  }))(MuiDialogContent);

  const DialogActions = withStyles((theme) => ({
    root: {
      backgroundColor: "#2A3E4C",
      borderTop: `1px solid ${theme.palette.divider}`,
      margin: 0,
      padding: theme.spacing.unit,
    },
  }))(MuiDialogActions);
  return (
    <div>
      <Button
        variant="contained"
        color="#273D49CC"
        size="small"
        onClick={handleClickOpen}
        className={classes.add}
      >
        Add
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        classes={{
          paper: classes.paper,
          root: classes.root,
          paperWidthSm: classes.paperWidthSm,
        }}
      >
        <DialogTitle
          id="form-dialog-title"
          style={{ backgroundColor: "#2A3E4C" }}
          onClose={handleClose}
        >
          <font color="white">Add</font>
          <Button
            aria-label="close"
            onClick={handleClose}
            endIcon={<CloseIcon />}
            className={classes.button}
          >
            {" "}
          </Button>
        </DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={1}>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Business Code"
                className={classes.TextField}
                // inputProps={{maxLength: 2}}
                type="text"
                variant="outlined"
                // value={addBusinessCode}
                id="addBusinessCode"
                onChange={(e) => setAddBusinessCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Customer Number"
                className={classes.TextField}
                type="text"
                variant="outlined"
                // value={addCustomerNo}
                id="addCustomerNo"
                onChange={(e) => setAddCustomerNo(e.target.value)}
              />
            </Grid>

            <Grid item xs={6} sm={3}>
              <TextField
                label="Clear Date"
                InputLabelProps={{ shrink: true }}
                className={classes.TextField}
                type="date"
                variant="outlined"
                // value={addClearDate}
                id="addClearDate"
                onChange={(e) => setAddClearDate(e.target.value)}
              />
            </Grid>

            <Grid item xs={6} sm={3}>
              <TextField
                label="Business Year"
                className={classes.TextField}
                type="text"
                variant="outlined"
                // value={addBusinessYear}
                id="addBusinessYear"
                onChange={(e) => setAddBusinessYear(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Document Id"
                className={classes.TextField}
                type="text"
                variant="outlined"
                // value={addDocumentId}
                id="addDocumentId"
                onChange={(e) => setAddDocumentId(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Posting Date"
                className={classes.TextField}
                InputLabelProps={{ shrink: true }}
                type="date"
                variant="outlined"
                // value={addPostingDate}
                id="addPostingDate"
                onChange={(e) => setAddPostingDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Document Create Date"
                className={classes.TextField}
                InputLabelProps={{ shrink: true }}
                type="date"
                variant="outlined"
                // value={addDocumentCreateDate}
                id="addDocumentCreateDate"
                onChange={(e) => setAddDocumentCreateDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Due Date"
                className={classes.TextField}
                InputLabelProps={{ shrink: true }}
                type="date"
                variant="outlined"
                // value={addDueDate}
                id="addDueDate"
                onChange={(e) => setAddDueDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Invoice Currency"
                className={classes.TextField}
                type="text"
                variant="outlined"
                // value={addInvoiceCurrency}
                id="addInvoiceCurrency"
                onChange={(e) => setAddInvoiceCurrency(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Document Type"
                className={classes.TextField}
                type="text"
                variant="outlined"
                // value={addDocumentType}
                id="addDocumentType"
                onChange={(e) => setAddDocumentType(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Posting Id"
                className={classes.TextField}
                type="text"
                variant="outlined"
                // value={addPostingId}
                id="addPostingId"
                onChange={(e) => setAddPostingId(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Total Open Amount"
                className={classes.TextField}
                type="text"
                variant="outlined"
                // value={addTotalOpenAmount}
                id="addTotalOpenAmount"
                onChange={(e) => setAddTotalOpenAmount(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Baseline Create Date"
                className={classes.TextField}
                InputLabelProps={{ shrink: true }}
                type="date"
                variant="outlined"
                // value={addBaselineCreateDate}
                id="addBaselineCreateDate"
                onChange={(e) => setAddBaselineCreateDate(e.target.value)}
              />
            </Grid>

            <Grid item xs={6} sm={3}>
              <TextField
                label="Customer Payment Terms"
                className={classes.TextField}
                type="text"
                variant="outlined"
                // value={addCustomerPaymentTerms}
                id="addCustomerPaymentTerms"
                onChange={(e) => setAddCustomerPaymentTerms(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Invoice Id"
                className={classes.TextField}
                type="text"
                variant="outlined"
                // value={addInvoiceId}
                id="addInvoiceId"
                onChange={(e) => setAddInvoiceId(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <div className="ButtonHeader">
            <div className="right">
              <Button
                variant="outlined"
                color="#2C404E"
                className={classes.colour}
                style={{
                  color: "#FFFFFF",
                  margin: "0 10px 0 0",
                  width: "47vw",
                  borderBlockColor: "#14AFF1",
                  borderColor: "#fff",
                }}
              >
                Add
              </Button>
              <Button
                variant="outlined"
                color="#2C404E"
                className={classes.colour}
                style={{
                  color: "#FFFFFF",
                  width: "47vw",
                  borderBlockColor: "#14AFF1",
                  borderColor: "#fff",
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
