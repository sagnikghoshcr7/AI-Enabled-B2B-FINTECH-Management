import { Grid, makeStyles } from "@material-ui/core";
import CompanyLogo from "../assets/companyLogo.svg";
import Logo from "../assets/logo.svg";
import React from "react";

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
    fontFamily: "serif",
    fontWeight: "600",
    letterSpacing: "0px",
    opacity: 1,
    marginLeft: "2.5vw",
    marginTop: "0.5vh",
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
            <h4 className={classes.companyName}>ABC Products</h4>
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
