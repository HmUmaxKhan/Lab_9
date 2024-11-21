import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Popover,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { postReq } from "./apicalls";
import { useRouter } from "next/navigation";

const Popup = (props) => {

  const [close, setclose] = useState(props.pop);
  const router = useRouter();

  const handleClose = ()=>{
    setclose(false);
    props.AgainDialog();
    router.push("/");
  }

  const handleAdmin = () => {
    const obj = {...props.cred,admin:true}
    console.log("Admin",obj);
    postReq("http://localhost:5000/api/signup",obj);
    handleClose();

  };

  const handleUser = () => {
    const obj = {...props.cred,admin:false}
    console.log("User",obj);
    postReq("http://localhost:5000/api/signup",obj);
    handleClose();
  };


  return (
    <>
        <Dialog open={close} onClose={handleClose} fullWidth >
          <DialogTitle>
            <Typography variant="h5" align="center">
              Who you are?
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1">Are you a user or admin</Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={handleAdmin}>
              Admin
            </Button>
            <Button variant="outlined" color="primary" onClick={handleUser}>
              User
            </Button>
          </DialogActions>
        </Dialog>
      </>
  );
};

export default Popup;
