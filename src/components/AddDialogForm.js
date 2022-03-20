import React from "react";
import { makeStyles, styled } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  Button,
  Dialog,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions,
  IconButton,
  Typography,
  Snackbar,
} from "@material-ui/core";
// import MuiAlert from "@material-ui/lab/Alert";
import { Close as CloseIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
}));

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

const DialogTitle = (props) => {
  const classes = useStyles();
  const { children, onClose, ...other } = props;
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
};

const DialogContent = styled(MuiDialogContent)(({ theme }) => ({
  root: {
    padding: theme.spacing(2),
    width: "50vh",
  },
}));

const DialogActions = styled(MuiDialogActions)(({ theme }) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}));

const initialState = {
  order_id: "",
  customer_name: "",
  customer_id: "",
  order_amt: "",
  approval_status: "",
  approved_by: "",
  notes: "",
};

export default function AddDialogForm({ username, onChange, add }) {
  const [info, setInfo] = React.useState(initialState);
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState("");
  const [error, setError] = React.useState(null);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleAdd = () => {
    onChange(!add);
  };

  const handleAddNew = () => {
    let name = username;
    name = username.split("_");
    name = name[0] + " " + name[1];
    let status;

    if (info.order_amt <= 10000) {
      setInfo({ ...info, approval_status: "Approved", approved_by: name });
      status = "Approved";
    } else {
      setInfo({
        ...info,
        approval_status: "Awaiting Approval",
        approved_by: "",
      });
      name = "";
      status = "Awaiting Approval";
    }

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer_id: info.customer_id,
        customer_name: info.customer_name,
        order_id: info.order_id,
        order_amt: info.order_amt,
        status: status,
        approved_by: name,
        notes: info.notes,
        date:
          selectedDate +
          ` ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      }),
    };

    setError(null);

    fetch("http://localhost:8080/1705588/add", config)
      .then((res) => res.json())
      .then(({ message }) => {
        if (message === "Success") {
          handleClick();
          handleAdd();
        } else {
          setError(message);
          handleClick();
          handleAdd();
        }
        setInfo(initialState);
      });
  };

  return (
    <div>
      <Dialog
        onClose={handleAdd}
        aria-labelledby="customized-dialog-title"
        open={add}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleAdd}
          style={{ color: "grey" }}
        >
          Add New Order
        </DialogTitle>
        <DialogContent dividers>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={4}>
              <Typography>Order ID</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                type="number"
                value={info.order_id}
                error={
                  info.order_id.length !== 6 && isNaN(parseInt(info.order_id))
                }
                helperText={
                  info.order_id.length === 0 || info.order_id.length === 6
                    ? ""
                    : "Order ID should be of 6 digits"
                }
                onChange={(e) => setInfo({ ...info, order_id: e.target.value })}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography>Customer Name</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                value={info.customer_name}
                error={info.customer_name.length < 3}
                helperText={
                  info.customer_name.length === 0 ||
                  info.customer_name.length >= 3
                    ? ""
                    : "Customer Name should be of minimum 3 characters"
                }
                onChange={(e) =>
                  setInfo({ ...info, customer_name: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={4}>
              <Typography>Customer ID</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                type="number"
                value={info.customer_id}
                error={
                  info.customer_id.length !== 3 &&
                  isNaN(parseInt(info.customer_id))
                }
                helperText={
                  info.customer_id.length === 0 || info.customer_id.length === 3
                    ? ""
                    : "Customer ID should be of 3 digits"
                }
                onChange={(e) =>
                  setInfo({ ...info, customer_id: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={4}>
              <Typography>Order Date</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="date-picker-dialog"
                type="date"
                style={{ width: "12.5rem" }}
                value={selectedDate}
                inputProps={{
                  min: "2012-01-01",
                  max:
                    new Date().getFullYear() +
                    "-" +
                    (new Date().getMonth() + 1) +
                    "-" +
                    new Date().getDate(),
                }}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography>Order Amount</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                value={info.order_amt}
                type="number"
                error={info.order_amt <= 100 || isNaN(parseInt(info.order_amt))}
                helperText={
                  info.order_amt >= 100 || info.order_amt === ""
                    ? ""
                    : "Order amount should be greater than 100"
                }
                onChange={(e) =>
                  setInfo({ ...info, order_amt: e.target.value })
                }
              />{" "}
            </Grid>
            <Grid item xs={4}>
              <Typography>Notes</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                value={info.notes}
                onChange={(e) => setInfo({ ...info, notes: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            disabled={
              info.order_id.length !== 6 ||
              info.customer_name.length < 3 ||
              info.customer_id.length !== 3 ||
              info.order_amt <= 100
            }
            onClick={handleAddNew}
            variant="contained"
            color="primary"
            style={{ color: "white" }}
          >
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>  
        {/* {!!error ? (
          <Alert onClose={handleClose} severity="error">
            {error}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="success">
            Order Added
          </Alert>
        )} */}
      </Snackbar>
    </div>
  );
}
