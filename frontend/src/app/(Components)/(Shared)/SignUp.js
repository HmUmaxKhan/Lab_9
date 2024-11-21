"use client";
import {
  Box,
  Button,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Popup from "./Popup";
import { useRouter } from "next/navigation";
const drawerWidth = 240;

const SignUp = () => {

  const router = useRouter(); 
  const [cred, setCred] = useState({
    username: "",
    password: "",
    name: "",
  });

  const [pop, setPopUp] = useState(null);

  const handleCreate = () => {
    router.push("/");
  };

  const AgainDialog = ()=>{
    setPopUp(null);
  }

  const handleSignUp = () => {
    if (cred.username!==''&&cred.name!==''&&cred.password!=='') {
      setPopUp(cred);
    }
  };

  const handleChange = (event) => {
    setCred({ ...cred, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{
         width:'33%'
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            margin: "5% 0 0 2%",
          }}
        >
          <Typography variant="h4" align="center">
            SignUp
          </Typography>
          <TextField
            variant="outlined"
            label="Name"
            name="name"
            onChange={handleChange}
            required
          />
          <TextField
            variant="outlined"
            label="Username"
            name="username"
            onChange={handleChange}
            required
          />
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
          <Button
            variant="contained"
            onClick={handleSignUp}
            color="primary"
            width="50px"
            height="40px"
          >
            SignUp
          </Button>
        </Box>

        <Box sx={{ margin: "0 0 0px 10px" }}>
          <Button variant="text" onClick={handleCreate}>
            Sign In
          </Button>
        </Box>
      </Paper>
      {pop !==null  ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Popup pop={pop} cred={cred}
          AgainDialog={AgainDialog} />
        </Box>
      ):null}
    </>
  );
};

export default SignUp;
