import { Grid, makeStyles, Typography } from "@material-ui/core";
import CompanyLogo from "../assets/companyLogo.svg";
import Logo from "../assets/logo.svg";
import React from "react";
// import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  main: {
    padding: "5vh 0",
    paddingLeft: "30px",
    // paddingBottom: '10px',
    display: "flex",
    justifyContent: "center",
  },
  company: {
    alignItems: "left",
  },
  companyName: {
    textAlign: "left",
    // fontFamily: ' Futura,Trebuchet MS,Arial,sans-serif',
    font: "normal normal bold Futura PT",
    letterSpacing: "0px",
    color: "#FFFFFF",
    opacity: 1,
    marginLeft: "5px",
    fontSize: "1.5rem",
    widht: "25vw",
    height: "5vh",
  },
  hrcLogo: {
    textAlign: "center",
    width: "25vw",
    height: "5vh",
    border: "0px solid white",
  },
  comLogo: {
    float: "left",
    widht: "5vw",
    height: "5vh",
  },
  invoiceHeader: {
    color: "#fff",
    fontSize: "1rem",
    paddingBottom: "30px",
    paddingTop: "15px",
  },
});

const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <Grid container>
        <Grid container item xs={12}>
          <Grid item xs={4}>
            <img
              src={CompanyLogo}
              alt="companylogo"
              className={classes.comLogo}
            />
            <Typography className={classes.companyName}>
              ABC Products
            </Typography>
          </Grid>
          <Grid item xs={4} style={{ textAlign: "center" }}>
            <img src={Logo} alt="highradius-logo" className={classes.hrcLogo} />
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
