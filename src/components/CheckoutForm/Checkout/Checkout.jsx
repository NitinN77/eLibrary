import React, { useState, useEffect } from "react";
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@material-ui/core";
import useStyles from "./styles";
import { commerce } from '../../../lib/commerce';
import { useStateValue } from "../../../StateProvider";
 
const steps = ["Shipping Address", "Payment Details"];

function Checkout({ order, onCaptureCheckout, error }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [{ cart, checkoutToken }, dispatch] = useStateValue();

  const [shippingData, setShippingData] = useState({});

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, { type: 'cart'});
        dispatch({type: 'SET_TOKEN', data: token});
      } catch (error) {
        console.log(error.message);
      }
    }
    if(cart){
      generateToken();
    }
  }, [cart]); // eslint-disable-line react-hooks/exhaustive-deps

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  }

  const Form = () => activeStep === 0 ?
  <AddressForm next={next}/>
  :
  <PaymentForm shippingData={shippingData} backStep={backStep} onCaptureCheckout={onCaptureCheckout}
  nextStep={nextStep}/>

  const Confirmation = () => (
      <div>
          Confirmation
      </div>
  )

  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
        </Paper>
      </main>
    </>
  );
}

export default Checkout;
