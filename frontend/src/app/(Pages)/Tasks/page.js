import CustomTable from '@/app/(Components)/(Shared)/CustomTable';
import DrawerSide from '@/app/(Components)/(Shared)/Drawer'
import { Box, Typography } from '@mui/material'
import React from 'react'
const drawerWidth = 240;


const page = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <DrawerSide />
        <Box
          component="main"
          sx={{ flexGrow: 1,p:3, marginTop:'4%', width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <CustomTable />
        </Box>
      </Box>
    </>
  )
}

export default page
