import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, secondaryListItems} from './listItem';
import Tooltip from "@mui/material/Tooltip";
import Widget from '../../components/widget/Widget';
import NativeSelect from '@mui/material/NativeSelect';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Service from '../services/Service';
import BottomNav from '../../components/bottomNav/BottomNav';
import Footer from '../../components/footer/Footer';
import AppDrawer from '../../components/drawer';
import { DashboardAppbarContainer } from '../../components/styles/appbar';
import DashboardBanner from "../../components/dashboardbanner";
import { Colors } from '../../components/styles/theme';
import {useEffect} from "react";
import jwt from "jsonwebtoken";
import Stack from '@mui/material/Stack';
import { Button, ButtonGroup } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MobicashSolutions from '../../components/mobicashsolutions';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import {
  flexBetweenCenter,
  justifyCenter,
  fullWidthFlex,
} from '../../components/styles/theme';
import Headerbanner from "../../components/headerbanner";
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import LogoutIcon from '@mui/icons-material/Logout';
import { useHistory } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import ListItems from './ListItems';
import Slider from '../../components/slider/Slider';
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);
const mdTheme = createTheme();

function DashboardContent() {
  const { i18n,t } = useTranslation(["home","common","login"]);
 const history=useHistory();
  const [open, setOpen] = React.useState(true);
  const [agentName,setAgentName]=React.useState("");
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleLanguageChange = (e) => {
		i18n.changeLanguage(e.target.value);
	};
  const handleLogout=()=>{
    localStorage.removeItem('mobicashAuth');
    sessionStorage.removeItem('mobicash-auth')
   return history.push('/display',{push:true})
  }

  const decode= (token) => {
    const JWT_SECRET="tokensecret";
    const payload = jwt.verify(token, JWT_SECRET);
     return payload;
  }
  useEffect(() => {
    const token =localStorage.getItem('mobicashAuth');
    if (token) {
    const {name}=decode(token);
    setAgentName(name)
  }
 
  }, []);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' ,height:"auto"}}>
        {/* <CssBaseline /> */}
        <AppBar position="fixed" open={open} elevation={0} sx={{ backgroundColor: 'white', display: 'flex',borderRadius:2 }} >
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <IconButton
              edge="start"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              <Box
                component="img"
                sx={{
                  height: 80,
                  width: 250,
                  marginLeft: 0,
                  maxHeight: { xs: 60, md: 300 },
                  maxWidth: { xs: 150, md: 220 },
                  display: { xs: "none", sm: "block" }
                }}
                alt="mobicash logo"
                src="../../Assets/images/logo.png"
              />
            </Typography>
            <Box
              component="img"
              sx={{
                height: 100,
                width: 300,
                marginRight: 10,
                maxHeight: { xs: 60, md: 300},
                maxWidth: { xs: 150, md: 300},
                display: { xs: "none", sm: "none", md: "block" }
              }}
              alt="mobicash logo"
              src="../../Assets/images/mobibk.png"
            />
  <Box sx={{ display: { xs: 'flex', md: 'flex' },padding:2}}>
         <Tooltip title="Logout" sx={{ mt: 1 }}>
       <IconButton   onClick={handleLogout} size="large" aria-label="show 4 new mails"  sx={{color:"#F9842C"}} >
              <LogoutIcon  sx={{color:"#F9842C"}} />
            </IconButton>
         </Tooltip>
         <Tooltip title="Notifications" sx={{ mt: 1 }}>
         <IconButton
              size="large"
              aria-label="show 3 new notifications"
              sx={{color:"#F9842C"}} 
            >
              <Badge badgeContent={3} color="warning">
                <NotificationsIcon title="Notifications" />
              </Badge>
            </IconButton>
          </Tooltip>
            
         
          </Box>

            <Box sx={{ minWidth: 100, display: { xs: "none", sm: "block" } }}>
               <Box sx={{
        ...fullWidthFlex,
        borderTop: '1px solid #ddd',
      }}
    >
        <Stack>
            <Paper sx={justifyCenter}>
              <Button sx={{ minWidth: 100 }}>
                <Box sx={{ ...justifyCenter, mr: 1 }}>
                  <LanguageIcon size={20} sx={{color:"#F9842C"}} />
                </Box>
                <FormControl>
                <NativeSelect
                  defaultValue="ki"
                  value={localStorage.getItem("i18nextLng")}
                  onChange={handleLanguageChange}
                  >
              <option value="ki">Kinyarwanda</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
                  </NativeSelect>
                </FormControl>
              </Button>
            </Paper>
          </Stack>
      </Box>
            </Box >
            <Box
              sx={{ minWidth: 100, display: { xs: "block", sm: "none" } }}
            >
              <img src="../../Assets/images/img_144.png" alt="logo" height="40" width="40" margin="10px" />
            </Box>

          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} >
          <Toolbar
            sx={{
              backgroundColor: '#F9842C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height:{ xs: "50px", sm: "60px",md:"100px" },
              px: [1],
            }}
          >
            <Typography variant="h6" textAlign="center" noWrap component="div"  >
            {t("common:mobibankermenu")}
            </Typography>
            <IconButton onClick={toggleDrawer}>

              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav" >
            {/* {mainListItems} */}
            <ListItems open={open}/>
          
            {/* <Divider sx={{ my: 1 }} /> */}
            {/* {secondaryListItems} */}
          </List>
          <AppDrawer />
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: "white",
            flexGrow: 0,
            height: '100%',
            overflow: 'hidden'
          }}
        >
          <Toolbar />
          <Box>
          <Box sx={{ width: '100%', maxWidth: 560, bgcolor: 'transparent',alignItems:"center", marginTop:"35px", height: 'auto'}}>
            <Box sx={{ my: 1, mx: 2 }}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h6" color="gray" component="div">
                    
                  {t("common:welcometomobibanker")}
                  </Typography>
                  <Typography gutterBottom variant="body1" color="gray" component="div">
                  {agentName}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Divider variant="middle" />
          </Box>
        </Box>
        <Box>
        <Container maxWidth="fullWidth" sx={{ mt:1, mb: 2,display:"flex" ,backgroundColor: 'white' }}>
            <Grid container component="main" sx={{ height: 'auto', backgroundColor: 'transparent' }}>
              <Grid item xs={12} sm={6} md={5} component={Paper} elevation={0} square
                sx={{
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: 'white',
                }}
              >
                <Box
                  sx={{
                    my: 2,
                    mx: 0,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width:"auto"
                  }}
                
                >
                  <Service />
                </Box>
              </Grid>
             
              <Grid
                item
                // xs={false}
                xs={12}
                sm={4}
                md={7}
                sx={{
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: 'white',
                }}
              >
                <Widget/>
              </Grid>
            </Grid>
          </Container>
        </Box>
          </Box>
         
      </Box>
      {/* <BottomNav /> */}
      <Slider/>
      {/* <MobicashSolutions/> */}
      <Headerbanner/>
      <Footer />
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}