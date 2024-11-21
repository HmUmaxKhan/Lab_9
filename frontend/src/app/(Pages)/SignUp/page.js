import DrawerSide from "@/app/(Components)/(Shared)/Drawer";
import SignUp from "@/app/(Components)/(Shared)/SignUp";
import { Box, Typography, Drawer } from "@mui/material";
import Image from "next/image";
import React from "react";

const drawerWidth = 240;

const page = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <DrawerSide />
        <Box
      sx={{ flexGrow: 1,marginTop:'6.5%', width: { sm: `calc((100% - ${drawerWidth}px))` } }}
    >
     <Box sx={{display:'flex',justifyContent:"space-evenly"}}>
      <Image src="/Task.jpg" width={500} height={300} style={{width:'50%',minHeight:'80vh'}} />
        <SignUp />
      </Box>
    </Box>
      </Box>
    </>
  );
};

export default page;
