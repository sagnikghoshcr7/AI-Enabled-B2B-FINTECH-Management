import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

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
    // marginLeft: theme.spacing(1),
    // border: "1px solid #222",
    // width: "10vw",
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

export default function AdvanceSearch({ displayData, setAdvSearchParams }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  // const [id, setId] = React.useState(props.selected);
  const [srchDocumentId, setSrchDocumentId] = useState("");
  const [srchInvoiceId, setSrchInvoiceId] = useState("");
  const [srchCustomerNo, setSrchCustomerNo] = useState("");
  const [srchBusinessYear, setSrchBusinessYear] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // const handleRemove = () => {
  //   props.onChange(!props.remove);
  // };

  // useEffect(() => {
  //   setAdvSearchParams([1, 4, 7])
  // },[])

  const handleEdit = () => {
    var advTempData = [];
    advTempData.push(srchDocumentId);
    advTempData.push(srchInvoiceId);
    advTempData.push(srchCustomerNo);
    advTempData.push(srchBusinessYear);
    setAdvSearchParams(advTempData);
    // setTimeout(function () {
    //   displayData();
    // }, 500)
    displayData();
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        color="primary"
        size="small"
        style={{
          borderColor: "#15AEF2",
          borderWidth: "1px",
          borderRadius: "0 4px 4px 0",
          height: "5vh",
        }}
      >
        Advance Search
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
            Advance Search
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container item spacing={4} direction="row">
            <Grid item>
              <TextField
                label="Document Id"
                className={classes.TextField}
                type="number"
                variant="outlined"
                id="srchDocumentId"
                onChange={(e) => setSrchDocumentId(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Invoice Id"
                className={classes.TextField}
                type="number"
                variant="outlined"
                id="srchInvoiceId"
                onChange={(e) => setSrchInvoiceId(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Customer Number"
                className={classes.TextField}
                type="number"
                variant="outlined"
                id="srchCustomerNo"
                onChange={(e) => setSrchCustomerNo(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Business Year"
                className={classes.TextField}
                type="number"
                variant="outlined"
                id="srchBusinessYear"
                onChange={(e) => setSrchBusinessYear(e.target.value)}
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
              handleEdit();
              // displayData();
              handleClose();
            }}
            style={{
              color: "#FFFFFF",
              width: "47vw",
              borderBlockColor: "#14AFF1",
              borderColor: "#fff",
            }}
          >
            Search
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
