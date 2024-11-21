import DrawerSide from "./(Components)/(Shared)/Drawer";
import Login from "./(Components)/(Shared)/Login";
import { Box, Grid, Stack } from "@mui/material";
import Image from "next/image";
const drawerWidth = 240;

export default function Home() {
  return (
    <main>
    
    <Box sx={{ display: "flex" }}>
    <DrawerSide />
    <Box
      sx={{ flexGrow: 1,marginTop:'6.5%', width: { sm: `calc((100% - ${drawerWidth}px)/2)` } }}
    >
     <Box sx={{display:'flex',justifyContent:"space-evenly"}}>
      <Image src="/Task.jpg" width={500} height={300} style={{width:'50%',minHeight:'80vh'}} />
        <Login />
      </Box>
    </Box>
  </Box>
    </main>
  );
}
