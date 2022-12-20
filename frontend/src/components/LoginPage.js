import { useState } from "react";
// import { useNavigate } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import {Login} from "../services/AuthenticationService";

export default function LoginPage(){
  // const navigate = useNavigate();
  const [loginFailPopup, setLoginFailPopup] = useState(false);
  const [userName, setUserName] = useState({value:"",hasError:false,touched:false});
  const [password, setPassword] = useState({value:"",hasError:false,touched:false});

  const userNameChangeHandler = e => {
    const inputValue = e.target.value.trim();
    let hasError = false;
    if (inputValue==="") {
      hasError = true;
    }
    setUserName(currentValue => ({
      ...currentValue,
      value: e.target.value,
      hasError,
      touched: true
    }));
  };

  const passwordChangeHandler = e => {
    const inputValue = e.target.value;
    let hasError = false;
    if (inputValue==="") {
      hasError = true;
    }
    setPassword(currentValue => ({
      ...currentValue,
      value: e.target.value,
      hasError,
      touched: true
    }));
  };

  const SubmitLogin = async () => {
    const response = await Login({userName:userName.value,password:password.value});
    if(response.data.auth_token === undefined){
      setLoginFailPopup(true);
      localStorage.removeItem("auth_token");
    } else {
      localStorage.setItem("auth_token", response.data.auth_token);
    };
  };

  const handleLoginFailClose = () => {
    setLoginFailPopup(false);
  };

  return (
    <div>
    <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
    <Typography component="h1" variant="h5">
      Sign in
    </Typography>
    <Box component="form" noValidate sx={{ mt: 1 }}>
      <Box>
        <TextField
          margin="normal"
          required
          fullWidth
          onChange={userNameChangeHandler}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={passwordChangeHandler}
        />
        {userName.hasError && userName.touched && (
          <Typography component="h4" style={{ color: "red" }}>
            Please enter a your userName!
          </Typography>
        )}
        {password.hasError && password.touched && (
          <Typography component="h4" style={{ color: "red" }}>
            Please enter your password!
          </Typography>
        )}
      </Box>
      <Button
        disabled={
          !(
            (password.touched) &&
            (userName.touched) &&
            !password.hasError &&
            !userName.hasError
          )
        }
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={SubmitLogin}>
        Sign In
      </Button>
    </Box>
  </Box>
  <Dialog open={loginFailPopup}>
  <DialogContent>
    <Box>
      <Typography component="h1" variant="h5">
        Unsuccessful login
      </Typography>
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleLoginFailClose}>
        Close
      </Button>
    </Box>
  </DialogContent>
</Dialog>
</div>
  )
};