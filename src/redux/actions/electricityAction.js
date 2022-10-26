import axios from "axios";

import {
    GET_ELECTRICITYDETAILS_REQUEST,
    GET_ELECTRICITYDETAILS_SUCCESS,
    GET_ELECTRICITYDETAILS_FAILURE,
  } from "../types/electricityType";
  

export const getElectricityDetailsAction = (details) => async (dispatch) => {
  try {
    dispatch(getElectricityDetailsRequest());
    const meter=details.meterNumber
   console.log("request",meter)
   // const Url ='https://agentweb.mobicash.rw/api/agent/goverment-services/rra/rest/v.4.14.01/doc-id-validation'
    const Url='https://agentapi.mobicash.rw/api/agent/vas/electricity/rest/v.4.14.01/meter-number-validation';
// const res = await axios.post(Url,{
// details
// });
   const res = await axios.post(Url,{
    meterNumber:meter,
   }, {
    withCredentials: true,
    headers:{
      "Accept":"application/json",
    "Content-Type": "application/json",
  },
   });
    const {data} = await res;
    if(data.responseCode===200){
     await dispatch(getElectricityDetailsSuccess(data));
      
    }
  
  } catch (err) {
    if (err.response) {
      const errorMessage = "Invalid Meter number, Please provide a valid Meter number";
      dispatch(getElectricityDetailsFailure(errorMessage));
    } else {
      dispatch(getElectricityDetailsFailure("Network  Error"));
    }
  }
};

export const getElectricityDetailsRequest = () => {
  return {
    type:  GET_ELECTRICITYDETAILS_REQUEST,
  };
};

export const getElectricityDetailsSuccess = (details) => {
  return {
    type:  GET_ELECTRICITYDETAILS_SUCCESS,
    payload: details,
  };
};
export const getElectricityDetailsFailure = (error) => {
  return {
    type:  GET_ELECTRICITYDETAILS_FAILURE,
    payload: error,
  };
};