import React,{lazy} from "react";
import CssBaseline from "@mui/material/CssBaseline";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Document from "../../../components/services/ltss/Document";
import Payment from "../../../components/services/ltss/Payment";
import Review from "../../../components/services/ltss/Review";
import { getLtssIdDetailsAction } from "../../../redux/actions/getLtssIdentificationAction";
import { ltssPaymentAction } from "../../../redux/actions/ltssPaymentAction";
import { useState,useEffect} from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import jwt from "jsonwebtoken"
import ReactToPrint from "react-to-print";
// import { ComponentToPrint } from "./ComponentToPrint";
import { useRef } from 'react';
import { useTranslation } from "react-i18next";
import AuthContext from "../../../context";
import logo from "../../../assets/images/mobilogo.png"
const  ComponentToPrint=React.lazy(()=>import("./ComponentToPrint").then(module=>{
  return {default: module.ComponentToPrint}
}))
const theme = createTheme();

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.4rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.6rem',
  },
};



const LtssForm = (props) => {
  const { t } = useTranslation(["home","common","login","ltss"]);
  const componentRef = useRef();
  const steps = [`${t("common:nid")}`,  `${t("common:makepayment")}`, `${t("common:viewdetails")}`];
  const [activeStep, setActiveStep] = React.useState(0);
  const dispatch = useDispatch();
  const getLtssIndDetails = useSelector((state) => state.getLtssIndDetails);
  const ltssPayment = useSelector((state) => state.ltssPayment);
  
  const [formData, setFormData] = useState({
    nId: "",
    phoneNumber: "",
    amountPaid:"",
    password: "",
  });
const [open, setOpen] = React.useState(true);
const [nIdErrorMessage,setNIdErrorMessage]=useState("");
const [errorMessage,setErrorMessage]=useState("")
const [identification,setIdentification]=useState("")
const [payerName,setPayerName]=useState("")
const { auth }=React.useContext(AuthContext)
const [agentCategory,setAgentCategory]=useState("")

const [paymenterrorMessage, setPaymenterrorMessage] = useState("");
 const [phoneNumberError, setPhoneNumberError] = useState("");
 const [amountPaidError,setAmountPaidError]=useState('');
 const [passwordError, setPasswordError] = useState("");
 const [username, setUsername] = useState("");
 const [password,setPassword]=useState("")

 const [transactionId,setTransactionId]=useState("");
 const [transactionStatus,setTransactionStatus]=useState("");
 const [dateTime,setDateTime]=useState("")
 const [agentName,setAgentName]=useState("")
 const [agentPhoneNumber,setAgentPhoneNumber]=useState("")
 const [brokering,setBrokering]=useState("")
 const [amount,setAmount]=useState("");
 const [openDialog,setOpenDialog]=useState(false)
 const [executing, setExecuting] = useState(false);
 const {
   disabled,
   onClick,
   ...otherProps
} = props;
 const history = useHistory();
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Document
            formData={formData}
            setFormData={setFormData}
            nIdErrorMessage={nIdErrorMessage}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            open={open}
            setOpen={setOpen}
          />
        );
      case 1:
        return (
          <Payment
            formData={formData}
            setFormData={setFormData}
            payerName={payerName}
            identification={identification}
            amountPaidError={amountPaidError}
            phoneNumberError={phoneNumberError}
            passwordError={passwordError}
            open={open}
            setOpen={setOpen}
            paymenterrorMessage={paymenterrorMessage}
            setPaymenterrorMessage={setPaymenterrorMessage}
          />
        );
      case 2:
        return <Review 
        dateTime={dateTime}
         transactionId={transactionId}
         transactionStatus={transactionStatus}
         payerName={payerName}
         formData={formData}
         agentName={agentName}
        />;
      default:
        throw new Error("Unknown step");
    }
  };


  useEffect(() => {
    async function fetchData() {
      if (!getLtssIndDetails.loading) {
        if (getLtssIndDetails.details.length !== 0) {
          if (getLtssIndDetails.details.responseCode === 100) {
           setIdentification(getLtssIndDetails.details.data.identification)
           setPayerName(getLtssIndDetails.details.data.names)
           setUsername(auth.username);
           setBrokering(auth.brokering);
           setAgentCategory(auth.usergroup)
           setAgentName(auth.names)
           setAgentPhoneNumber(auth.phonenumber)
            handleNext();
          } else {
            return null;
          }
          
        }
        if (getLtssIndDetails.error) {
          setErrorMessage(getLtssIndDetails.error);
        }
      }
    }
    fetchData();
   
  }, [getLtssIndDetails.details,getLtssIndDetails.error]);
 
  useEffect(()=>{
    async function fetchData(){
     if (!ltssPayment.loading) {
       if (ltssPayment.details.length !== 0) {
         if (ltssPayment.details.responseCode === 100) {
          setTransactionId(ltssPayment.details.data.mobicashTransctionNo)
          setDateTime(ltssPayment.details.responseDate)
          setTransactionStatus(ltssPayment.details.communicationStatus)
          setAmount(ltssPayment.details.data.amountPaid)
           handleNext();
         } else {
           return null;
         }
       }
       if (ltssPayment.error) {
         setPaymenterrorMessage(ltssPayment.error);
       }
     }
    
    }
    fetchData();
     },[ltssPayment.details,ltssPayment.error])
  //get ltss details
  const handleGetLtssNidDetails=async()=>{
   if(formData.nId==""){
    setNIdErrorMessage(`${t("common:nidisrequired")}`)
   }
  else if(!Number(formData.nId)){
    setNIdErrorMessage(`${t("common:nidmustbenumeric")}`)
  }
  // else if(formData.nId.length!==16){
  //   setNIdErrorMessage(`${t("common:nidmust16digit")}`)
  // }
   else{
    setNIdErrorMessage("")
 
    const identificationId=formData.nId
   await dispatch(getLtssIdDetailsAction({identificationId}))
   }
  }
  //ltss payment
  //handle cbhi payment
  const handleLtssPayment=async()=>{
    if(formData.amountPaid=="" && formData.phoneNumber==""&& formData.password=="" ){
      setAmountPaidError(`${t("common:amounttopayisrequired")}`)
      setPhoneNumberError(`${t("common:phoneisrequired")}`)
      setPasswordError(`${t("common:agenytpinisrequired")}`)
    }
    else if(formData.amountPaid==""){
      setAmountPaidError(`${t("common:amounttopayisrequired")}`)
    }
    else if(!Number(formData.amountPaid)){
      setAmountPaidError(`${t("common:amounttopaymustbeanumber")}`)
    }
    else if(formData.amountPaid > 2000000){
      setAmountPaidError(`${t("common:amounttopaycannotexcide2,000,000Rwf")}`)
    }
    else if(formData.phoneNumber==""){
      setPhoneNumberError(`${t("common:phoneisrequired")}`)
    }
    else if(!Number(formData.phoneNumber)){
      setPhoneNumberError(`${t("common:phonemustbeanumeric")}`)
    }
    else if(formData.phoneNumber.length!==10){
      setPhoneNumberError(`${t("common:phonenumbermustbe10digit")}`)
    }
    else if(formData.password=="" ){
      setPasswordError(`${t("common:agenytpinisrequire")}`)
    }
    // else if (formData.password !== password ) {
    //   setPasswordError(`${t("common:invalidpin")}`);
    // } 
    else{
      setAmountPaidError("")
      setPhoneNumberError("")
      setPasswordError("")
      setOpenDialog(true)
    
    }
  } 
   //handle cbhi payment
   const handlePayment =async()=>{
    setExecuting(true)
    setOpenDialog(false)
    const amountPaid=formData.amountPaid
    const password=formData.password
    const payerPhoneNumber=formData.phoneNumber
    try{
      await dispatch(ltssPaymentAction({
        identification,
        amountPaid,
        payerPhoneNumber,
        payerName,
        agentCategory,
        brokering
      },username,password))
    }finally{
      setExecuting(false)
    }
   }
   //handle close
   const handleClose=()=>{
    setOpenDialog(false)
   }
  //handle on button submit for each step
  const handelSubmit = () => {
    if (activeStep === 0) {
      handleGetLtssNidDetails();
    } else if (activeStep === 1) {
      handleLtssPayment()
    } else if (activeStep === 2) {
      handleNext();
    } else {
      return null;
    }
    if (getLtssIndDetails.error) {
      setOpen(true);
    }
    if (ltssPayment.error) {
      setOpen(true);
    }
  };
  const handleNewpayment = () => {
    formData.nId=""
    getLtssIndDetails.details=['']
    ltssPayment.details=['']
    ltssPayment.error=['']
   setActiveStep(0)
   
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    formData.password = "";
    formData.nId=""
    setNIdErrorMessage("");
    setPasswordError("");
    setPhoneNumberError("");
    setErrorMessage("");
    setPaymenterrorMessage("");
   getLtssIndDetails.details=['']
   ltssPayment.details=['']
   getLtssIndDetails.error=['']
   getLtssIndDetails.loading=false
   ltssPayment.loading=false
    setActiveStep(0);
    history.push("/dashboard",{push:true})
   // setOpenLTSS(false)
  };
  return (
    <div>
      <ThemeProvider theme={theme}>
        {/* <CssBaseline /> */}
        <Dialog
        //fullScreen={fullScreen}
        open={openDialog}
       // onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Grid container direction="row" alignItems="center">
        <DialogTitle id="responsive-dialog-title" sx={{color:"orange"}}>
        {t("common:warning")}
        </DialogTitle>
         </Grid>
         <Divider color="warning"/>
       
        <DialogContent>
          <DialogContentText textAlign="center" >
          {t("common:doyoureallywanttomakeapaymentof")}  {Number(formData.amountPaid).toLocaleString()} Rwf ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
          {t("common:disagree")} 
          </Button>
          <Button
            disabled={executing || disabled}
            {...otherProps}
          onClick={handlePayment} autoFocus>
          {t("common:agree")} 
          </Button>
        </DialogActions>
      </Dialog>
        <Box m="10px">
    </Box>
        <Container component="main" maxWidth="sm" sx={{display:{xs:"block",sm:"block",md:"block",lg:"block"}, mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 4 } }}
          >
             <ThemeProvider theme={theme}>
           <Grid
           container
           direction="column"
           alignItems="center"
           justifyContent="center"
           
           >
           
           <Typography id="transition-modal-title" textAlign="center" variant="h6" component="h2">
            {t("ltss:ltsspaymentservice")}
          </Typography>
           <img
                  src="../../../images/ejoheza.png"
                  alt="logo"
                  height={70}
                  width={85}
                />
           </Grid>
           </ThemeProvider>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5,display:{xs:"inline",sm:"flex"}  }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" textAlign="center" gutterBottom>
                  {t("common:thankyouforusingmobicash")}
                  </Typography>
                  <Typography textAlign="center" variant="subtitle1">
                  {t("common:youhavesuccessfullypaid")} LTSS
                  </Typography>
                
                  <Button onClick={handleNewpayment} sx={{ mt: 3, ml: 1 }}>
                  {t("common:newpayment")}
                  </Button>
                  
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    {activeStep == 0 || activeStep !==2? (
                      <Button onClick={handleBack} 
                     //sx={{ mt: 3, ml: 1 }}
                      sx={{ my: 1, mx: 1.5 }}
                      >
                {t("common:cancel")}
                      </Button>
                    ):null}

                    <Button
               
                      onClick={handelSubmit}
                      // sx={{ mt: 3, ml: 1 }}
                      sx={{ my: 1, mx: 1.5 }}
                    >
                      
                      {/* {activeStep === steps.length - 1 ? 'Mke payment' : 'Next'} */}
                      {activeStep === steps.length - 1
                        ?<>
                        <ReactToPrint
             trigger={() => <Button>{t("common:receipt")}</Button>}
            content={() => componentRef.current}
               />
               <Box sx={{display:'none'}}>
               <ComponentToPrint 
               ref={componentRef} 
               formData={formData}
               dateTime={dateTime}
               transactionId={transactionId}
               transactionStatus={transactionStatus}
               payerName={payerName}
               agentName={agentName}
               agentPhoneNumber={agentPhoneNumber}
               amount={amount}
               logo={logo}
               />
               </Box>
                </>
                        : activeStep === 0
                        ? getLtssIndDetails.loading?
                        <Box sx={{ display: 'flex',justifyContent:"center" }}>
                        <CircularProgress  sx={{ color: 'orange'}} />
                         </Box>:`${t("common:submit")}`
                        : ltssPayment.loading?
                        <Box sx={{ display: 'flex',justifyContent:"center" }}>
                        <CircularProgress  sx={{ color: 'orange'}} />
                         </Box>:`${t("common:makepayment")}`}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default LtssForm;
