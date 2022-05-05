import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import qs from "qs";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SERVER_URL } from "../utils/constants";

toast.configure();

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) => ({
  add_main_btn: {
    // marginLeft: theme.spacing(1),
    width: "10vw",
    border: `1px solid ${theme.palette.secondary.main}`,
    color: "#fff",
    background: "#273D49CC",
  },
  paper: {
    backgroundColor: theme.palette.primary.dark,
  },
  colorTextPrimary: {
    color: "white",
  },
  reset_btn: {
    marginLeft: theme.spacing(1),
    border: `1px solid ${theme.palette.secondary.main}`,
    color: "white",
    background: "#273D49CC",
  },
  save_btn: {
    marginRight: theme.spacing(1),
    color: "white",
  },
  cancel_btn: {
    color: theme.palette.secondary.light,
    marginRight: "12vw",
  },
  root: {
    maxWidth: 500,
    height: 500,
    margin: "auto",
  },
  TextField: {
    width: "19.8vw",
    height: 50,
    color: "white",
    padding: "0px 0px",
    fontSize: "1rem",
    // border: "1px solid #356680",
    borderRadius: "10px",
    opacity: "1",
    backgroundColor: "#fff",
    borderColor: "#356680",
  },
  label: {
    color: "#97A1A9",
  },
  addButtons: {
    marginLeft: theme.spacing(1),
    border: `1px solid ${theme.palette.secondary.main}`,
    color: "white",
    background: "#273D49CC",
  },
  root: {
    "& .MuiOutlinedInput-input": {
      padding: "16px 0px",
    },
    "& .MuiInputBase-input": {
      // color: "white",
      paddingLeft: "5px",
    },
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "85vw",
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      paddingTop: "10px",
    },
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function EditDialogForm({ displayData }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [addBusinessCode, setAddBusinessCode] = useState("");
  const [addCustomerNo, setAddCustomerNo] = useState("");
  const [addClearDate, setAddClearDate] = useState("");
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

  const successNotify = () => {
    toast.success("Item Added Successfully", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      progress: undefined,
    });
  };

  const errorNotify = () => {
    toast.error("Item Not Added", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      progress: undefined,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const addData = (e) => {
    var data = qs.stringify({
      business_code: addBusinessCode,
      cust_number: addCustomerNo,
      clear_date: addClearDate,
      business_year: addBusinessYear,
      doc_id: addDocumentId,
      posting_date: addPostingDate,
      document_create_date: addDocumentCreateDate,
      document_create_date1: addDocumentCreateDate,
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
      url: SERVER_URL + "hrc/api/add",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        displayData();
        successNotify();
      })
      .catch(function (error) {
        console.log(error);
        errorNotify();
      });
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        className={classes.add_main_btn}
        onClick={handleClickOpen}
      >
        Add
      </Button>

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        classes={{
          paper: classes.paper,
          root: classes.root,
        }}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Typography variant="h6" style={{ color: "#FFFFFF" }}>
            Add
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container item spacing={2} direction="row">
            <Grid item>
              <TextField
                label="Business Code"
                className={classes.TextField}
                type="text"
                variant="outlined"
                id="addBusinessCode"
                onChange={(e) => setAddBusinessCode(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Customer Number"
                className={classes.TextField}
                type="text"
                variant="outlined"
                id="addCustomerNo"
                key="random12"
                onChange={(e) => setAddCustomerNo(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Clear Date"
                InputLabelProps={{ shrink: true }}
                className={classes.TextField}
                type="date"
                variant="outlined"
                id="addClearDate"
                onChange={(e) => setAddClearDate(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Business Year"
                className={classes.TextField}
                type="text"
                variant="outlined"
                id="addBusinessYear"
                onChange={(e) => setAddBusinessYear(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Document Id"
                className={classes.TextField}
                type="text"
                variant="outlined"
                id="addDocumentId"
                onChange={(e) => setAddDocumentId(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Posting Date"
                className={classes.TextField}
                InputLabelProps={{ shrink: true }}
                type="date"
                variant="outlined"
                id="addPostingDate"
                onChange={(e) => setAddPostingDate(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Document Create Date"
                className={classes.TextField}
                InputLabelProps={{ shrink: true }}
                type="date"
                variant="outlined"
                id="addDocumentCreateDate"
                onChange={(e) => setAddDocumentCreateDate(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Due Date"
                className={classes.TextField}
                InputLabelProps={{ shrink: true }}
                type="date"
                variant="outlined"
                id="addDueDate"
                onChange={(e) => setAddDueDate(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Invoice Currency"
                className={classes.TextField}
                type="text"
                variant="outlined"
                id="addInvoiceCurrency"
                onChange={(e) => setAddInvoiceCurrency(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Document Type"
                className={classes.TextField}
                type="text"
                variant="outlined"
                id="addDocumentType"
                onChange={(e) => setAddDocumentType(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Posting Id"
                className={classes.TextField}
                type="text"
                variant="outlined"
                id="addPostingId"
                onChange={(e) => setAddPostingId(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Total Open Amount"
                className={classes.TextField}
                type="text"
                variant="outlined"
                id="addTotalOpenAmount"
                onChange={(e) => setAddTotalOpenAmount(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Baseline Create Date"
                className={classes.TextField}
                InputLabelProps={{ shrink: true }}
                type="date"
                variant="outlined"
                id="addBaselineCreateDate"
                onChange={(e) => setAddBaselineCreateDate(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Customer Payment Terms"
                className={classes.TextField}
                type="text"
                variant="outlined"
                id="addCustomerPaymentTerms"
                onChange={(e) => setAddCustomerPaymentTerms(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Invoice Id"
                className={classes.TextField}
                type="text"
                variant="outlined"
                id="addInvoiceId"
                onChange={(e) => setAddInvoiceId(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            classes={{ containedPrimary: classes.primary }}
            variant="contained"
            size="small"
            color="#273D49CC"
            className={classes.addButtons}
            onClick={(event) => {
              event.preventDefault();
              addData();
              handleClose();
            }}
            style={{
              color: "#FFFFFF",
              width: "47vw",
              borderBlockColor: "#14AFF1",
              borderColor: "#fff",
            }}
          >
            Add
          </Button>
          <Button
            variant="contained"
            color="#273D49CC"
            size="small"
            onClick={handleClose}
            className={classes.addButtons}
            style={{
              color: "#FFFFFF",
              width: "47vw",
              borderBlockColor: "#14AFF1",
              borderColor: "#fff",
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
