import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
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
    width: '10vw',
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
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      paddingTop: '10px'
    },
  },
}));
export default function AddFormDialog() {
  const [open, setOpen] = React.useState(false);
  const [selectedDate, handleDateChange] = useState(new Date());

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

        <DialogContent>
          <form>
            <Grid container spacing={1}>
              <Grid item xs={6} sm={3}>
                <TextField
                  label="Business Code"
                  className={classes.TextField}
                  type="String"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  label="Customer Number"
                  className={classes.TextField}
                  type="number"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={6} sm={3}>
                <TextField
                  label="Clear Date"
                  InputLabelProps={{ shrink: true }}
                  className={classes.TextField}
                  type="date"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={6} sm={3}>
                <TextField
                  label="Business Year"
                  className={classes.TextField}
                  type="number"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  label="Document Id"
                  className={classes.TextField}
                  type="number"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  label="Posting Date"
                  className={classes.TextField}
                  InputLabelProps={{ shrink: true }}
                  type="date"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  label="Document Create Date"
                  className={classes.TextField}
                  InputLabelProps={{ shrink: true }}
                  type="date"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  label="Due Date"
                  className={classes.TextField}
                  InputLabelProps={{ shrink: true }}
                  type="date"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  label="Invoice Currency"
                  className={classes.TextField}
                  type="number"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  label="Document Type"
                  className={classes.TextField}
                  type="number"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  label="Posting Id"
                  className={classes.TextField}
                  type="number"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  label="Total Open Amount"
                  className={classes.TextField}
                  type="number"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  label="Baseline Create Date"
                  className={classes.TextField}
                  InputLabelProps={{ shrink: true }}
                  type="date"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={6} sm={3}>
                <TextField
                  label="Customer Payment Terms"
                  className={classes.TextField}
                  type="number"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  label="Invoice Id"
                  className={classes.TextField}
                  type="number"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </form>
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
