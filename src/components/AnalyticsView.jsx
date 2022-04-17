import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
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
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import axios from "axios";
import qs from "qs";
import { SERVER_URL } from "../utils/constants";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

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
    // maxWidth: 500,
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
    marginBottom: "0.7vh",
  },
  label: {
    color: "#97A1A9",
  },
  analyticsButtons: {
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
      width: "90vw",
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

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

export default function AnalyticsView({ displayData, setAdvSearchParams }) {
  const classes = useStyles();
  const [formOpen, setFormOpen] = useState(false);
  const [graphsOpen, setGraphsOpen] = useState(false);
  const [fromClearDate, setFromClearDate] = useState("");
  const [toClearDate, setToClearDate] = useState("");
  const [fromDueDate, setFromDueDate] = useState("");
  const [toDueDate, setToDueDate] = useState("");
  const [fromBSClearDate, setFromBSClearDate] = useState("");
  const [toBSClearDate, setToBSClearDate] = useState("");
  const [invoiceCurrencyStr, setInvoiceCurrencyStr] = useState("");
  const [analyticstData, setAnalyticsData] = useState({});
  const [pieChartData, setPieChartData] = useState({});

  const handleClickFormOpen = () => {
    setFormOpen(true);
  };
  const handleFormClose = () => {
    setFormOpen(false);
  };

  const handleSubmit = () => {
    setFormOpen(false);
    getAnalyticsData();
    getPieChartData();
    setTimeout(() => {
      handleClickGraphsOpen();
    }, 500);
  }

  const handleClickGraphsOpen = () => {
    setGraphsOpen(true);
  };
  const handleGraphsClose = () => {
    setGraphsOpen(false);
  };

  const getAnalyticsData = (e) => {
    var data = qs.stringify({
      from_cl: fromClearDate,
      to_cl: toClearDate,
      from_due: fromDueDate,
      to_due: toDueDate,
      from_base: fromBSClearDate,
      to_base: toBSClearDate,
    });
    var config = {
      method: "post",
      url: SERVER_URL + "hrc/Combined",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        // console.log(
        //   response.data.map((data) => {
        //     return data["business_code"];
        //   })
        // );

        setAnalyticsData({
          labels: response.data.map((data) => {
            return data["business_code"];
          }),
          datasets: [
            {
              label: "Total Open Amount (Scale = 1/70000)",
              data: response.data.map((data) => {
                return data["total_open_amount"] / 70000;
              }),
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              label: "No. Of Customers",
              data: response.data.map((data) => {
                return data["no_of_cust"];
              }),
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
          ],
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getPieChartData = (e) => {
    var data = qs.stringify({
      invoice_curr: invoiceCurrencyStr,
    });

    var config = {
      method: "post",
      url: SERVER_URL + "hrc/api/PieChart",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        // console.log(Object.keys(response.data));
        // console.log(Object.values(response.data));
        setPieChartData({
          labels: Object.keys(response.data),
          datasets: [
            {
              label: "Currency Pie Chart",
              data: Object.values(response.data),
              backgroundColor: [
                "rgba(255, 99, 132, 0.4)",
                "rgba(54, 162, 235, 0.4)",
                "rgba(75, 192, 192, 0.4)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(75, 192, 192, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickFormOpen}
        color="primary"
        size="small"
        style={{
          borderColor: "#15AEF2",
          borderWidth: "1px",
          borderRadius: "0",
          height: "5vh",
        }}
      >
        Analytics View
      </Button>

      <Dialog
        onClose={handleFormClose}
        aria-labelledby="customized-dialog-title"
        open={formOpen}
        classes={{
          paper: classes.paper,
          root: classes.root,
        }}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleFormClose}>
          <Typography variant="h6" style={{ color: "#FFFFFF" }}>
            Analytics View
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid style={{ display: "flex", flexDirection: "column" }}>
            <Grid style={{ display: "flex", flexDirection: "row" }}>
              <Grid
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0.5vh 0.5vw",
                }}
              >
                <Typography
                  variant="h6"
                  style={{ color: "#FFFFFF", fontSize: "1rem" }}
                >
                  Clear Date
                </Typography>
                <TextField
                  label="From Clear Date"
                  InputLabelProps={{ shrink: true }}
                  className={classes.TextField}
                  type="date"
                  variant="outlined"
                  id="fromClearDate"
                  onChange={(e) => setFromClearDate(e.target.value)}
                />
                <TextField
                  label="To Clear Date"
                  InputLabelProps={{ shrink: true }}
                  className={classes.TextField}
                  type="date"
                  variant="outlined"
                  id="toClearDate"
                  onChange={(e) => setToClearDate(e.target.value)}
                />
              </Grid>
              <Grid
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0.5vh 0.5vw",
                }}
              >
                <Typography
                  variant="h6"
                  style={{ color: "#FFFFFF", fontSize: "1rem" }}
                >
                  Due Date
                </Typography>
                <TextField
                  label="From Due Date"
                  InputLabelProps={{ shrink: true }}
                  className={classes.TextField}
                  type="date"
                  variant="outlined"
                  id="fromDueDate"
                  onChange={(e) => setFromDueDate(e.target.value)}
                />
                <TextField
                  label="To Due Date"
                  InputLabelProps={{ shrink: true }}
                  className={classes.TextField}
                  type="date"
                  variant="outlined"
                  id="toDueDate"
                  onChange={(e) => setToDueDate(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid style={{ display: "flex", flexDirection: "row" }}>
              <Grid
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0.5vh 0.5vw",
                }}
              >
                <Typography
                  variant="h6"
                  style={{ color: "#FFFFFF", fontSize: "1rem" }}
                >
                  Baseline Create Date
                </Typography>
                <TextField
                  label="From Baseline Create Date"
                  InputLabelProps={{ shrink: true }}
                  className={classes.TextField}
                  type="date"
                  variant="outlined"
                  id="fromBSClearDate"
                  onChange={(e) => setFromBSClearDate(e.target.value)}
                />
                <TextField
                  label="To Baseline Create Date"
                  InputLabelProps={{ shrink: true }}
                  className={classes.TextField}
                  type="date"
                  variant="outlined"
                  id="toBSClearDate"
                  onChange={(e) => setToBSClearDate(e.target.value)}
                />
              </Grid>
              <Grid
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0.5vh 0.5vw",
                }}
              >
                <Typography
                  variant="h6"
                  style={{ color: "#FFFFFF", fontSize: "1rem" }}
                >
                  Invoice Currency
                </Typography>
                <TextField
                  label="Invoice Currency"
                  className={classes.TextField}
                  type="text"
                  variant="outlined"
                  id="invoiceCurrencyArr"
                  onChange={(e) => setInvoiceCurrencyStr(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            classes={{ containedPrimary: classes.primary }}
            variant="contained"
            size="small"
            className={classes.analyticsButtons}
            onClick={(event) => {
              event.preventDefault();
              handleSubmit();
            }}
            style={{
              color: "#FFFFFF",
              width: "47vw",
              borderBlockColor: "#14AFF1",
              borderColor: "#fff",
            }}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={handleFormClose}
            className={classes.analyticsButtons}
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

      <Dialog
        // onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={graphsOpen}
        classes={{
          paper: classes.paper,
          root: classes.root,
        }}
        style={{}}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleGraphsClose}>
          <Typography variant="h6" style={{ color: "#FFFFFF" }}>
            Analytics View
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container style={{ display: "flex", justifyContent: "center" }}>
            <Grid item style={{ width: "40vw", paddingBottom: "7vh" }}>
              <Bar options={options} data={analyticstData} />
            </Grid>
            <Grid item>
              <Pie data={pieChartData} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="#273D49CC"
            size="small"
            onClick={handleGraphsClose}
            className={classes.analyticsButtons}
            style={{
              color: "#FFFFFF",
              width: "60vw",
              borderBlockColor: "#14AFF1",
              borderColor: "#fff",
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// {
//   "bar": {
//     "U001": {
//       "total_open_amount": 1000,
//       "number_of_customers": 338
//     },
//     "U002": {
//       "total_open_amount": 1560,
//       "number_of_customers": 446
//     }
//   },
//   "pie": {
//     "USD": 4587,
//     "CAD": 674,
//     "INR": 748
//   }
// }
