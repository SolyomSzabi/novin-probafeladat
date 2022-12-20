import React from "react";
import { Route, Routes } from "react-router-dom";

import LoginPage from "./components/LoginPage";
import Customers from "./components/Customers";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Customers />} />
      <Route path="/login" element={<LoginPage />}></Route>
    </Routes>
  );
}

export default App;
