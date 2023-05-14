import './App.css';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { CameraAlt, Person, Settings, Videocam } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import Template from './Template';
import PostsEdit from './routes/PostsEdit';
import { Routes, Route, Link, useLocation } from "react-router-dom"
import CampaignPosts from './routes/CampaignPosts.tsx';
import Grid from '@mui/material/Grid';



const drawerWidth = 240;




function App(props) {
  
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const {pathname} = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
      <Link to="/">
        <ListItem selected={"/" === pathname} key="hg" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <CameraAlt />
            </ListItemIcon>
            <ListItemText activeStyle={{ backgroundColor: "#349eff" }} style={{color: "black"}} primary="One Post" />
          </ListItemButton>
        </ListItem>
      </Link>
      <Link to="campaign">
        <ListItem selected={"/campaign" === pathname} key="hg" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Videocam />
            </ListItemIcon>
            <ListItemText activeStyle={{ backgroundColor: "#349eff" }} style={{color: "black"}} primary="Campaign" />
          </ListItemButton>
        </ListItem>
      </Link>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    
    <div className="App">
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `100%` },
            ml: { sm: `${drawerWidth}px`,  },
            zIndex: (theme) => theme.zIndex.drawer + 1
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'block', md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography sx={{fontWeight: "700"}} variant="h5" noWrap component="div">
              InstaPost AI
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton size="large" color="inherit">
                  <Person />
              </IconButton>
              <IconButton size="large" color="inherit">
                  <Settings />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, display: {sm: "none", md: "block"}}}
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'block' , md: "none"},
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'none', md: "block" },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1 ,width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar />
          <Grid container spacing={2}>
            <Grid item xs={12} xl={3} md={3}>
              <Template />
            </Grid>
            <Grid item xs={12} xl={9} md={9}>
              <Box 
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="90vh"
                style={{width: "-webkit-fill-available"}}
              >
                <Routes>
                  <Route path="/" element={ <PostsEdit /> } />
                  <Route path="/campaign" element={ <CampaignPosts /> } />
                </Routes>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default App;
