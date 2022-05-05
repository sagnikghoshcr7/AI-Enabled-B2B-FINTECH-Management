import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import InvoiceDashboard from "./views/InvoiceDashboard";
import ErrorBoundary from "./utils/Errorboundry";

const App = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<InvoiceDashboard />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
