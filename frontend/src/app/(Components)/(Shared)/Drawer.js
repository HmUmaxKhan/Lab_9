"use client";
import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/Info";
import { ContactPage } from "@mui/icons-material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useRouter } from "next/navigation";
import { Button, Stack } from "@mui/material";
import AddDialog from "./AddDialog";

const drawerWidth = 240;

function DrawerSide(props) {
  const router = useRouter();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [id,setId] = React.useState();
  const [pop,setPop] = React.useState(false);
  const [add,setAdd] = React.useState(false);
  const [add1,setAdd1] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  React.useEffect(() => {
    let token = localStorage.getItem("UserTM");

    console.log(token);
    if (token === undefined) {
      alert("Please Login First!");
    }
    else{
    token = JSON.parse(token);
    console.log(token);
    setId(token)
    
    if (token === null) {
      setAdd1(false);
      setAdd(false);
    } else {
      setAdd1(true);
      if (token.admin) {
        setAdd(true);
      } else {
        setAdd(false);
      }
    }
  }
  }, [pop]);
  

  const active = {
    background: "#E7E9EB",
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const ListArr = [
    {
      text: "Add Task",
      icon: <AssignmentIcon />,
    },
    {
      text: "Tasks",
      icon: <AssignmentIcon />,
    },
    {
      text: "About",
      icon: <InfoIcon />,
    },
    {
      text: "Contact",
      icon: <ContactPage />,
    },
  ];


  const ListArr1 = [
    {
      text: "Tasks",
      icon: <AssignmentIcon />,
    },
    {
      text: "About",
      icon: <InfoIcon />,
    },
    {
      text: "Contact",
      icon: <ContactPage />,
    },
  ];

  const handlePopUp = ()=>{
    setPop(true);
 }

 const AgainDialog = ()=>{
  setPop(false);
}

 const handleLogOut = () =>{
  localStorage.removeItem("UserTM");
  localStorage.removeItem("UserAD");
  setAdd1(false);
  router.push("/");
 }


  const [activeClass, setActiveClass] = React.useState(null);

  const handleClick=(index,text)=>{
    if (text==='Add Task') {
      handlePopUp();
    }else{
    setActiveClass(index);
    router.push(`/${text}`)
    }
  }

  const drawer = (
    <div>
      <Toolbar />
      <Typography
        variant="h5"
        component="div"
        sx={{ textAlign: "center", marginBottom: "10px" }}
      >
        Operations
      </Typography>
      <Divider />
      <List>
        {add ? (ListArr1.map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => handleClick(index,text.text)}
              style={activeClass == index ? active : null}
            >
              <ListItemIcon>{text.icon}</ListItemIcon>
              <ListItemText primary={text.text} />
            </ListItemButton>
          </ListItem>)
        )):(ListArr.map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => handleClick(index,text.text)}
              style={activeClass == index ? active : null}
            >
              <ListItemIcon>{text.icon}</ListItemIcon>
              <ListItemText primary={text.text} />
            </ListItemButton>
          </ListItem>
        )))}
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{flexGrow:1}}>
            Task Management
          </Typography>
          <Stack  direction="row" spacing={5}>
          {add1 ? (
            <Button color="inherit" onClick={handleLogOut}>
              Logout
            </Button>
          ) : null}
          </Stack>
        </Toolbar>
      </AppBar>
      
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>


    {pop ? (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <AddDialog pop={pop} token={id} AddDialog={AddDialog}
         />
      </Box>
    ):null}

    </>

  );
}

export default DrawerSide;
