import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { addReq } from "./apicalls";
import { useRouter } from "next/navigation";



const AddDialog = (props) => {

  const [close, setclose] = useState(props.pop);
  const router = useRouter();

  useEffect(()=>{
    let res = localStorage.getItem("UserTM");
    res = JSON.parse(res)
    if (res ===null ) {
      router.push("/");
      setclose(false)
    }
  },[]);

  const [editData, setEdit] = useState({
    title:"",
    description:"", 
  });


  const handleClose = () => {
    setclose(false);
    props.AddDialog();
  };

  const handleAdd = async() =>{
    console.log("token",props.token);
    let res = await addReq("http://localhost:5000/api//addnote",props.token.token,editData)
    console.log(res);
    window.location.reload(true);
  }


  

  const handleChange = (e) =>{
    setEdit({...editData,[e.target.name]:e.target.value})
  }

  return (
    <>
      <Dialog
        open={close}
        onClose={handleClose}
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5" align="center">
            Edit the Details
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
          <Grid item xs={12}>
          <TextField
          variant="outlined"
                label="Title"
                name="title"
                value={editData.title}
                onChange={handleChange}
                required
                />
                </Grid>
                <Grid item xs={12} >
                <TextField
                  variant="outlined"
                  label="Description"
                  name="description"
                  value={editData.description}
                  onChange={handleChange}
                  required
                />
                </Grid>
                </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleAdd}>
            Add Note
          </Button>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddDialog;
