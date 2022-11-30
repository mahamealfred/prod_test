import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, CardHeader, Divider } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

//modal
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import { useTranslation } from "react-i18next";

import { useHistory } from 'react-router-dom';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function MediaCard() {
  
  const { t } = useTranslation(["home","common","login"]);
    const history=useHistory();
    const [openRSSB, setOpenRSSB] = React.useState(false);
    const [openRRA, setOpenRRA] = React.useState(false);
    const [openLTSS, setOpenLTSS] = React.useState(false);
    const [openRNIT, setOpenRNIT] = React.useState(false);
    const [openMTN, setOpenMTN] = React.useState(false);
    const [openAIRTEL, setOpenAIRTEL] = React.useState(false);
    const [openLOGS, setOpenLOGS] = React.useState(false);
    const [openTopUp, setOpenTopUp] = React.useState(false);
    const [openELECTRICITY,setOpenELECTRICITY]=React.useState(false);

    const handleOpenMTN = () => setOpenMTN(true);
    const handleCloseMTN = () => setOpenMTN(false);
    const handleOpenAIRTEL = () => setOpenAIRTEL(true);
    const handleCloseAIRTEL = () => setOpenAIRTEL(false);
  
    
    const handleOpenLTSS= () => setOpenLTSS(true);
    
    const handleClickOpenElecticity = () => {
      history.push("/dashboard/electricity-service",{push:true})
      // setOpenELECTRICITY(true);
    };
    const handleClickOpenRRA = () => {
      history.push("/dashboard/rra-service",{push:true})
      // setOpenRRA(true);
    };
    const handleClickOpenCBHI=()=>{
       //setOpenRSSB(true)
       history.push('/dashboard/cbhi-service',{push:true})
    }
    const handleClickOpenLTSS = () => {
      //setOpenLTSS(true);
      history.push('/dashboard/ltss-service',{push:true})
    };
    const handleClickOpenRNIT = () => {
      //setOpenRNIT(true);
      history.push('/dashboard/rnit-service',{push:true})
    };
    const handleClickOpenLOGS=()=>{
      setOpenLOGS(true)
    }
  
    const handleClose = () => {
      setOpenRSSB(false);
      setOpenRRA(false);
      setOpenLTSS(false);
      setOpenRNIT(false);
      setOpenLOGS(false)
      setOpenELECTRICITY(false)
      setOpenTopUp(false)
    };
    const openGtClient=()=>{
      history.push("/dashboard/gt-bank-service",{push:true})
    }
   
  
    return (
        <React.Fragment>
      <Grid 
        >
            <Typography component="h6" variant="body1"
         fontWeight={800}
         color="gray"
         textAlign="center"
         padding="0 0px 10px 0px"
         sx={{ fontSize: { xs: 20 } }}
         >
        GT Client Service
        </Typography>
          <CardMedia
                    component="img"
                    height="60"
                    image="../../images/gtbank.png"
                    alt="alt"
                    title="i"
                    sx={{ padding: "0em 10em 2em 0em", objectFit: "contain",
                    height:{xs:40,sm:40,md:60,lg:60}}}
                />
            <Grid >
            <Typography 
            component="h1" variant="body1"
         fontWeight={800}
         color="gray"
         textAlign="center"
         sx={{ fontSize: { xs: 16 } }}
         >
      {/* {t("common:governmentservices")} */}
        </Typography>
        <Grid
  container
  spacing={0}
  alignItems="center"
  justifyContent="center"
 
>
<Button
            // onClick={handleClickOpenRRA}
           // onClick={()=> setOpenRRA(true)}
            >
            <Card
                raised
                sx={{
                    // maxWidth: 100,
                    width:{xs:60,sm:70,md:60,lg:60},
                    height:{xs:60,sm:60,md:60,lg:60},
                    borderRadius:5,
                    margin: "0 auto 5px",
                    padding: "0.9em",
                }}
            >
                {/* <CardMedia
                    component="img"
                    height="60"
                    image="../../images/rra.png"
                    alt="alt"
                    title="i"
                    sx={{ 
                      padding: "0em 2em 0 0em", 
                      objectFit: "contain",
                     height:{xs:40,sm:40,md:40,lg:40}}}
                /> */}
           <Typography  gutterBottom
                sx={{ padding: "1em 0em 0 0em",color:"black",
                fontSize:10

             }}
           >
      Customer enrollment
          </Typography>
            </Card>  
            </Button>
            <Button
            // onClick={handleClickOpenCBHI}
            >
            <Card
                raised
                sx={{
                   // maxWidth: 100,
                   width:{xs:60,sm:70,md:60,lg:60},
                    height:{xs:60,sm:60,md:60,lg:60},
                    borderRadius:5,
                    margin: "0 auto 5px",
                    padding: "0.9em",
                }}
            >
                {/* <CardMedia
                    component="img"
                    height="60"
                    image="../../images/mutuelli.png"
                    alt="alt"
                    title="i"
                    sx={{ padding: "0em 2em 0 0em", objectFit: "contain",
                    height:{xs:40,sm:40,md:40,lg:40}}}
                /> */}
           <Typography variant="h6" gutterBottom
                sx={{ padding: "1em 0em 0 0em",color:"gray",
                fontSize:10
             }}
           >
            Deposit
          </Typography>
            </Card>  
            </Button>
            <Button
            // onClick={handleClickOpenRNIT}
            >
            <Card
                raised
                sx={{
                   // maxWidth: 100,
                   width:{xs:60,sm:70,md:60,lg:60},
                    height:{xs:60,sm:60,md:60,lg:60},
                    borderRadius:5,
                    margin: "0 auto 5px",
                    padding: "0.9em",
                }}
            >
                {/* <CardMedia
                    component="img"
                    height="60"
                    image="../../images/rnit.png"
                    alt="alt"
                    title="i"
                    sx={{ padding: "0em 2em 0 0em", objectFit: "contain",
                    height:{xs:40,sm:40,md:40,lg:40}}}
                /> */}
           <Typography variant="h6" gutterBottom
                sx={{ padding: "1em 0em 0 0em",color:"gray",
                fontSize:10
             }}
           >
          Transfer
          </Typography>
            </Card>  
            </Button>
            <Button
            // onClick={handleClickOpenLTSS}
            >
            <Card
                raised
                sx={{
                   // maxWidth: 100,
                   width:{xs:60,sm:70,md:60,lg:60},
                   height:{xs:60,sm:60,md:60,lg:60},
                   borderRadius:5,
                    margin: "0 auto 5px",
                    padding: "0.9em",
                }}
            >
               {/* <CardMedia
                    component="img"
                    height="60"
                    image="../../images/ejoheza.png"
                    alt="alt"
                    title="i"
                    sx={{ padding: "0em 2em 0 0em", objectFit: "contain",
                    height:{xs:40,sm:40,md:40,lg:40}}}
                /> */}
           <Typography variant="h6" gutterBottom
                sx={{ padding: "1em 0em 0 0em",color:"gray",
                fontSize:10
             }}
           >
            RSSB
          </Typography>
            </Card>  
            </Button>
</Grid>
           
          
 
               
        
      </Grid>

      </Grid>
        </React.Fragment>
    );
}