"use client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
  Delete,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import EditDialog from "./EditDialog";
import { getReqNote } from "./apicalls";
import { useRouter } from "next/navigation";
const CustomTable = () => {
  const [open, setOpen] = useState([]);
  const [info, setInfo] = useState({});
  const [pop,setPop] = useState(false);
  const [user,setUser] = useState({});
  const [users,setUsers] = useState({});
  const [add,setAdd] = useState(false);
  const [name,setUsername] = useState([]);
  const router = useRouter();


  const handleClick = (index) => {
    if (open.includes(index)) {
      const arr = open.filter((op) => op !== index);
      setOpen(arr);
    } else {
      setOpen([...open, index]);
    }
  };

  const [tableDatas,settableData] = useState([]);

  useEffect(()=>{
    let res = localStorage.getItem("UserTM");
    res = JSON.parse(res);

    if (res ===null ) {
      router.push("/");
    }

    setAdd(res.admin)
     console.log(res.admin);
     console.log(res.token);
    if (res.admin) {
      const getAllNote =async ()  =>{
        let response = await getReqNote("http://localhost:5000/api/getallusers",res.token);
        settableData(response.notes)
           setUsers(response.users)

          let user = response.users.filter((user)=>user._id===response.notes.user);
          let user1 = response.users.filter(user =>
            response.notes.some(noteUser => noteUser.user === user._id)
          );
          console.log(user1);
          setUsername(user1);
          console.log("response.users:", response.users);
        }
        getAllNote();      
    }
    
    else{
    const getNote =async ()  =>{
    let response = await getReqNote("http://localhost:5000/api/getSinglenote",res.token);
      console.log("response.", response.note);
      settableData(response.note)
      setUser(response.user)
    }

    getNote();
  }

  },[pop])


  console.log(tableDatas);
  console.log(user);
 
  const handlePopUp = (obj)=>{
     setInfo(obj)
     setPop(true);
  }
  const AgainDialog = ()=>{
    setPop(false);
  }



  return (
    
    <TableContainer  sx={{ height: "80vh",width:'100%'}}>
    <TableContainer sx={{ height: "80vh", width: '100%' }}>
    <Table stickyHeader>
      <TableHead sx={{ backgroundColor: 'black', color: 'white' }}>
        <TableRow>
          <TableCell align="center">Detail</TableCell>
          <TableCell align="center">Sr.No</TableCell>
          <TableCell align="center">Name</TableCell>
          <TableCell align="center">Date</TableCell>
          <TableCell align="center">Topic</TableCell>
          <TableCell align="center">Edit</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tableDatas.map((tab, index) => (
          [
            <TableRow key={tab._id}>
            <TableCell align="center">
              <IconButton onClick={() => handleClick(tab._id)}>
                {open.includes(tab._id) ? (
                  <KeyboardArrowUp />
                ) : (
                  <KeyboardArrowDown />
                )}
              </IconButton>
            </TableCell>
            <TableCell align="center">{index+1}</TableCell>
            {add ?
            <TableCell align="center">{(name.find(e=> e._id === tab.user)).name}</TableCell>
            :<TableCell align="center">{user.name}</TableCell>
            }
            <TableCell align="center">{(tab.date).slice(0,10)}</TableCell>
            <TableCell align="center">{tab.title}</TableCell>
            <TableCell align="center">
             <IconButton onClick={()=>handlePopUp({id:tab._id,title:tab.title,description:tab.description})}>
               <EditIcon />
              </IconButton>
            </TableCell>
          </TableRow>,
            <TableRow key={`${tab._id}-collapse`}>
              <TableCell colSpan={6}>
                <Collapse in={open.includes(tab._id)}>
                  <Box sx={{ fontSize: 18, marginTop: 'auto', textAlign: 'center', width: '100%', minHeight: 36, background: 'rgba(50,50,50,.4)', alignItems: 'center' }}>
                    {tab.description}
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          ]
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  
      

      {pop ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <EditDialog pop={pop} obj={info}
          AgainDialog={AgainDialog} />
        </Box>
      ):null}
    </TableContainer>
  );
};

export default CustomTable;
