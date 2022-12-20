import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { LoggedView } from "../services/AuthenticationService";

export default function LoggedInView({component:Component}){
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(()=>{
    const getLoggedInView = async () => {
      try {
        const res = await LoggedView();
        setIsLoggedIn(res.data.LoggedIn);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    getLoggedInView();
  },[]);

  if(isLoggedIn === null) {
    return null;
  }
  return isLoggedIn ? <Component/>:<Navigate to="/login"/>
}