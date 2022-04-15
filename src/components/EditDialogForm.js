import React, { useContext, useEffect, useState } from "react";
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { RowSelectContext } from "../contexts/RowSelectContext";
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
  edit_main_btn: {
    marginLeft: theme.spacing(1),
    border: "1px solid #222",
    width: "10vw",
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
    width: 250,
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
  editButtons: {
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
      maxWidth: "40vw",
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
  const [editInvoiceCurr, setEditInvoiceCurr] = useState("");
  const [editcustPaymentTerms, setEditcustPaymentTerms] = useState("");

  const { rowSelectArr } = useContext(RowSelectContext);

  const successNotify = () => {
    toast.success("Item Edited Successfully", {
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
    toast.error("Item Not Edited", {
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

  // useEffect(() => {
  // console.log(newSelected);
  // console.log(rowSelectArr[rowSelectArr.length - 1]);
  // });

  const editData = (e) => {
    var data = qs.stringify({
      sl_no: rowSelectArr[rowSelectArr.length - 1],
      invoice_currency: editInvoiceCurr,
      cust_payment_terms: editcustPaymentTerms,
    });
    var config = {
      method: "post",
      url: SERVER_URL + "hrc/api/update",
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
        // color="primary"
        size="small"
        className={classes.edit_main_btn}
        onClick={handleClickOpen}
        color={rowSelectArr.length > 0 ? "secondary" : "primary"}
        disabled={!rowSelectArr.length > 0}
        style={{
          backgroundColor: rowSelectArr.length > 0 ? "#2C414E" : "#39495E",
        }}
      >
        Edit
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
            Edit
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container item spacing={1} direction="row">
            <Grid item>
              <TextField
                label="Invoice Currency"
                className={classes.TextField}
                type="text"
                variant="outlined"
                id="editInvoiceCurr"
                onChange={(e) => setEditInvoiceCurr(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Customer Payment Terms"
                className={classes.TextField}
                type="text"
                variant="outlined"
                id="editcustPaymentTerms"
                onChange={(e) => setEditcustPaymentTerms(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            classes={{ containedPrimary: classes.primary }}
            variant="contained"
            size="small"
            // color="#273D49CC"
            className={classes.editButtons}
            onClick={(event) => {
              event.preventDefault();
              editData();
              handleClose();
            }}
            style={{
              color: "#FFFFFF",
              width: "47vw",
              borderBlockColor: "#14AFF1",
              borderColor: "#fff",
            }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            // color="#273D49CC"
            size="small"
            onClick={handleClose}
            className={classes.editButtons}
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
