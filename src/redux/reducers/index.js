import { combineReducers } from "redux";
   import getYearReducer from "./getYearReducer";
   import loginReducer from "./loginReducer";
   import forgotPasswordReducer from "./forgotPasswordReducer";
   import resetPasswordReducer from "./resetPasswordReducer";
   import authorizeCommissionRducer from "./authorizeCommissionReducer";
   //GT BANK
   import validateNidReducer from "./validateNidReducer";
   import depositReducer from "./depositReducer";
   import accountValidationReducer from "./accountValidationReducer";
   import openAccountReducer from "./openAccountReducer";
   import authorizeTransactionReducer from "./authorizeTransactionReducer";
   import getBranchesReducer from "./getBranchesReducer";
   //CBHI
import getCbhiNidDetailsReducer from "./getCbhiNidDetailsReducer";
import cbhiPayamentReducer from "./cbhiPaymentReducer";
import changePasswordReducer from "./changePasswordReducer";


             //ELECTRICITY
import electricityReducer from "./electricityReducer";
import electricityPaymentReducer from "./electricityPaymentReducer";

import transactionsReducer from "./transactionsReducer";
import balanceReducer from "./getBalanceReducer";
             //rra
 import getDocDetailsReducer from "./getDocDetailsReducer";
 import rraPaymentReducer from "./rraPaymentReducer";
    //LTSS
     import getLtssIdentificationDetailsReducer from "./getLtssIdentificationReducer";
     import ltssPaymentReducer from "./ltssPaymentReducer";
     
// import getClientDetailsReducer from "./getClientDetailsReducer";
              //rnit
import getRnitDetailsReducer from "./getRnitIdentificationDetailsReducer";
 import rnitPaymentReducer from "./rnitPaymentReducer";

 import topUpMobileMoneyReducer from "./topUpMobileMoneyReducer";
 import getPreviousdepositTransactionsReducer from "./getPreviousdepositTransactionsReducer";

 //Ria
 import authorizeRiaTransactionReducer from "./authorizeRiaTransactionReducer";
 import getRiaOrderDetailsReducer from "./getRiaOrderDetailsReducer";
 import clientValidationReducer from "./clientValidationReducer";
 import registerClientReducer from "./registerClientReducer";
 import riaDepositReducer from "./riaDepositReducer";
// import chashinReducer from "./cashInReducer";
// import getClientNidDetailsReducer from "./getClientNidDetailsReducer";
//import clientEnrollmentReducer from "./clientEnrollmentReducer";
const allReducers = combineReducers({
     login:loginReducer,
     changePassword: changePasswordReducer,
     forgotPassword:forgotPasswordReducer,
     resetPassword:resetPasswordReducer,


    //all 
     balance:balanceReducer,
     transactions:transactionsReducer,
     getYear:getYearReducer,
     authorizeCommission:authorizeCommissionRducer,
     //electricity
     getElectricityDetails:electricityReducer,
     electricityPayment:electricityPaymentReducer,

     //cbhi
     getCbhiNidDetails:getCbhiNidDetailsReducer ,
     cbhiPayment:cbhiPayamentReducer,

     //rra
     getDocDetails: getDocDetailsReducer,
     rraPayment: rraPaymentReducer,

    //rnit
    getRnitDetails: getRnitDetailsReducer,
    rnitPayment:rnitPaymentReducer,

    //ltss
     getLtssIndDetails: getLtssIdentificationDetailsReducer,
     ltssPayment:ltssPaymentReducer,
     //gt bank 
     validateNid:validateNidReducer,
     deposit:depositReducer,
     accountValidation:accountValidationReducer,
     openAccount:openAccountReducer,
     authorizeTransaction:authorizeTransactionReducer,
     getBranches:getBranchesReducer,
     getPreviousdepositTransactions:getPreviousdepositTransactionsReducer,

     topUpMobileMoney:topUpMobileMoneyReducer,
     //RIA
     authorizeRiaTransaction:authorizeRiaTransactionReducer,
     getRiaOrderDetails:getRiaOrderDetailsReducer,
     clientValidation:clientValidationReducer,
     registerClient:registerClientReducer,
     riaDeposit:riaDepositReducer,
    
    //client
    // getClientDetails:getClientDetailsReducer,
    // cashIn:chashinReducer,
    // getClientNidDetails:getClientNidDetailsReducer,
    // clientEnrollment: clientEnrollmentReducer,
});

export default allReducers;