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
import { SERVER_URL, ROLL_NUMBER } from "../utils/constants";
import { RowSelectContext } from "../contexts/RowSelectContext";

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
  root: {
    width: 540,
    height: 500,
    margin: "auto",
  },
  deletemain: {
    marginLeft: theme.spacing(1),
    border: `1px solid ${theme.palette.secondary.main}`,
    width: "10vw",
  },
  paper: {
    backgroundColor: theme.palette.primary.dark,
  },
  colorTextPrimary: {
    color: "white",
  },
  deleteButtons: {
    marginLeft: theme.spacing(1),
    border: `1px solid ${theme.palette.secondary.main}`,
    color: "white",
    background: "#273D49CC",
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

export default function DeleteDialogForm({ displayData }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const { rowSelectArr } = useContext(RowSelectContext);

  // useEffect(() => {
  //   console.log(rowSelectArr);
  // });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const editData = (rowNo, e) => {
    console.log(rowNo);
    var data = qs.stringify({
      sl_no: rowNo,
    });
    var config = {
      method: "post",
      url: "http://localhost:8080/hrc/api/delete",
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

  function helperDelete(rowNo) {
    editData(rowNo);
  }

  const handleDelete = (e) => {
    rowSelectArr.map((rowNo) => helperDelete(rowNo));
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        className={classes.deletemain}
        onClick={handleClickOpen}
      >
        Delete
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
            Delete record[s] ?
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom variant="body2" style={{ color: "#C0C6CA" }}>
            Are you sure you want to delete these records ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="#273D49CC"
            size="small"
            onClick={handleClose}
            className={classes.deleteButtons}
            style={{
              color: "#FFFFFF",
              margin: "0 10px 0 0",
              width: "47vw",
              borderBlockColor: "#14AFF1",
              borderColor: "#fff",
            }}
          >
            Cancel
          </Button>
          <Button
            classes={{ containedPrimary: classes.primary }}
            variant="contained"
            size="small"
            color="#273D49CC"
            className={classes.deleteButtons}
            onClick={(event) => {
              event.preventDefault();
              handleDelete();
              handleClose();
            }}
            style={{
              color: "#FFFFFF",
              width: "47vw",
              borderBlockColor: "#14AFF1",
              borderColor: "#fff",
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
