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
import { delReq, updateReq } from "./apicalls";

const EditDialog = (props) => {

  const [close, setclose] = useState(props.pop);

  const [editData, setEdit] = useState({
    title:props.obj.title,
    description:props.obj.description,
    noteId:props.obj.id
  });

  console.log(editData);

  const handleClose = () => {
    setclose(false);
    props.AgainDialog();
  };

  const handleEdit = async() =>{
    let res = await updateReq("http://localhost:5000/api/updatenote",editData);
    handleClose();
  }

  const handleDelete = async() =>{
    await delReq("http://localhost:5000/api/deletenote",{noteId:props.obj.id})
    handleClose();
  }

  console.log(props.id);
  console.log(editData);

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
          <Button variant="contained" color="primary" onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditDialog;
