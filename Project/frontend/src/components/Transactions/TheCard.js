import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import CardInput from './CardInput';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';


const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: '35vh auto',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-start',
  },
  div: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    justifyContent: 'space-between',
  },
  button: {
    margin: '2em auto 1em',
  },
});

function TheCard() {
  let navigate = useNavigate()
  const classes = useStyles();
  // State
  const [mail, setMail] = useState('');

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmitVerify = async (event) => {
    if (sessionStorage.getItem('mail') === mail && sessionStorage.getItem('verification') === 'false'){
        if (!stripe || !elements) {
          // Stripe.js has not yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          return;
        }

        const res = await axios.post('http://localhost:5002/bank/verify', {mail: mail});

        const clientSecret = res.data['client_secret'];

        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              email: mail,
            },
          },
        });

        if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
          console.log(result.error.message);
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            // Show a success message to your customer
            // There's a risk of the customer closing the window before callback
            // execution. Set up a webhook or plugin to listen for the
            // payment_intent.succeeded event that handles any business critical
            // post-payment actions.
            sessionStorage.setItem('verification','true')
          }
        }
    }
    else if (sessionStorage.getItem('verification') === 'true'){
        navigate('/profile')
        alert('You are already verified')
    }
    else{
        alert('Email doesnt match your profile email!')
    }
  };


  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <TextField
          label='Email'
          id='outlined-email-input'
          helperText={`Email you'll recive updates and receipts on`}
          margin='normal'
          variant='outlined'
          type='email'
          required
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          fullWidth
        />
        <CardInput />
        <div className={classes.div}>
          <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmitVerify}>
            Verify
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default TheCard;