import React from "react";
import Paper from "@material-ui/core/Paper";
import theme, { pxToRem } from "../utils/theme";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";

const styles = (theme) => ({
  mainBackground: {
    background: theme.palette.primary.main,
    height: "100vh",
    width: "100vw",
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: "100%",
    background: "#252C48",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  titleName: { fontSize: pxToRem(30), color: "white" },
  subTitleName: {
    fontSize: pxToRem(20),
    color: "white",
  },
});
function Footer(props) {
  const { classes } = props;
  return (
    <Grid
      item
      xs={12}
      style={{
        position: "fixed",
        // left: '0',
        bottom: "0",
        display: "flex",
        marginRight: "5px",
        justifyContent: "center",
        alignItems: "center",
        height: "7vh",
        width: "100vw",
        backgroundColor: "#2C414E",
      }}
    >
      <Typography style={{ color: "white" }}>
        <a href={'https://www.google.com'}><span style={{color: '#15AEF2', textDecoration: 'underline'}}>Privacy Policy</span></a> | © 2022 HighRadius Corporation. All rights reserved.
      </Typography>
    </Grid>
  );
}

export default withStyles(styles, { withTheme: true })(Footer);
