import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import RemoveIcon from "@material-ui/icons/Remove";
import { SERVER_URL, ROLL_NUMBER } from "../utils/constants";

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
    width: '10vw',
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

export default function DeleteDialogForm(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(props.selected);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleRemove = () => {
    props.onChange(!props.remove);
  };

  const handleDelete = () => {
    const ids = props.selected;
    console.log(ids);

    const config = {
      method: "POST",

      body: JSON.stringify({
        ids,
      }),
    };

    fetch(`${SERVER_URL}/${ROLL_NUMBER}/DeleteData/`, config)
      .then((res) => res.json())
      .then(({ message }) => {
        if (message.length > 0) {
          handleRemove();
          handleClose();
        }
      });

    // try{
    //   const delData = async (ids)=>{
    //     const response = await axios.post(`http://localhost:8081/1805096/DeleteData`,{ids});
    //     console.log(response);
    //   }
    //   delData(ids);
    // }catch(error){
    //   console.log(error);
    // }

    //   async function makePostRequest() {

    //     let params = {
    //         DocId:props.selected
    //       }

    //     let res = await axios.post('http://localhost:8081/1805096/DeleteData/', params);

    //     console.log(res.data);
    // }

    // makePostRequest();
    handleRemove();
    handleClose();
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
            onClick={handleDelete}
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
