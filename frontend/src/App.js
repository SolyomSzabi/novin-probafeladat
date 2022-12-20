import React from "react";
import { Route, Routes } from "react-router-dom";

import LoginPage from "./components/LoginPage";
import Customers from "./components/Customers";
import LoggedInView from "./components/LoggedInView";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoggedInView component={Customers}/>} />
      <Route path="/login" element={<LoginPage />}></Route>
    </Routes>
  );
}

export default App;
