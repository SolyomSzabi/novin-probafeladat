import React from "react";
import { Route, Router, Routes } from "react-router-dom";

import LoginPage from "./components/LoginPage";
import Customers from "./components/Customers";
function App() {
  return (
    <>
      <Customers />
    </>
  );
}

export default App;
