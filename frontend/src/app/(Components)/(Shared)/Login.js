"use client"
import {
  Box,
  Button,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { postReq } from "./apicalls";
const drawerWidth = 240;

const Login = () => {

  const router = useRouter();
  const [cred, setCred] = useState({
    username: "",
    password: "",
  });

  const handleCreate = () => {
    router.push("/SignUp")
  };

  const handleLogin =async () => {
    if (cred.username !=='' && cred.password !=='') {
      const res =await postReq("http://localhost:5000/api/signin",cred);
      console.log(res);
      localStorage.setItem("UserTM",JSON.stringify({token:res.token,admin:res.admin}));
      router.push("/Tasks")
    }
  };

  const handleChange = (event) => {
    setCred({ ...cred, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Paper
        square={false}
        elevation={0}
        sx={{width:'35%' }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            margin:'5% 0 0 2%',
          }}
        >
          <Typography variant="h4" align="center" mt={3}>
            Login
          </Typography>
          <TextField
            variant="outlined"
            label="Username"
            name="username"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            name="password"
            onChange={handleChange}
          />
          <Button
            variant="contained"
            onClick={handleLogin}
            color="primary"
            width="50px"
            height="40px"
          >
            Login
          </Button>
        </Box>

        <Box sx={{margin:'0 0 0px 10px'}}>
        <Button
          variant="text"
          onClick={handleCreate}
        >
          Create Account
        </Button>
        </Box>
      </Paper>
    </>
  );
};

export default Login;
