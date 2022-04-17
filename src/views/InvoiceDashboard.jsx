import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";

import Header from "../components/Header";
import InvoicePanelTable from "../components/InvoicePanelTable";
import "../styles.css";
import Footer from "../components/Footer";

import { RowSelectContext } from "../contexts/RowSelectContext";

import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../utils/GlobalStyles";
import { lightTheme, darkTheme } from "../utils/stTheme";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import WbSunnyIcon from "@material-ui/icons/WbSunny";

const useStyles = makeStyles({
  mainDashboard: {
    top: "0px",
    left: "0px",
    width: "100vw",
    height: "100vh",
    // backgroundColor: "#29384c",
    opacity: "1",
  },
});

const InvoiceDashboard = () => {
  const [rowSelectArr, setRowSelectArr] = useState([]);
  const stored = localStorage.getItem("isDarkMode");
  const [isDarkMode, setIsDarkMode] = useState(
    stored === "true" ? false : true
  );

  const classes = useStyles();
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <div className={classes.mainDashboard}>
        <RowSelectContext.Provider value={{ rowSelectArr, setRowSelectArr }}>
          <Header />
          <div
            style={{ position: "absolute", top: "6vh", right: "5vw" }}
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode === true ? (
              <WbSunnyIcon
                style={{
                  color: "#ffc107",
                  fontSize: "30",
                }}
              />
            ) : (
              <Brightness3Icon
                style={{
                  color: "#273C49",
                  fontSize: "30",
                }}
              />
            )}
          </div>
          <InvoicePanelTable />
          <Footer />
        </RowSelectContext.Provider>
      </div>
    </ThemeProvider>
  );
};

export default InvoiceDashboard;
