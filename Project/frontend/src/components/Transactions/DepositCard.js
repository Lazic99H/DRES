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
import {NumberField} from '@adobe/react-spectrum'

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

function DepositCard() {
  let navigate = useNavigate()
  const classes = useStyles();
  // State
  const [mail, setMail] = useState('');
  const [amount, setAmount] = useState(100);
  const [currency, setCurrency] = useState('')

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmitDeposit = async (event) => {
    if (sessionStorage.getItem('mail') === mail && sessionStorage.getItem('verification') === 'true'){
        if (!stripe || !elements) {
          // Stripe.js has not yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          return;
        }

        setCurrency(sessionStorage.getItem("currency"))

        const res = await axios.post('http://localhost:5002/bank/verify', {mail: mail, amount: amount});

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
    else if (sessionStorage.getItem('verification') === 'false'){
        navigate('/profile')
        alert('You are not verified!')
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
        <NumberField
          label="Transaction amount"
          defaultValue={45}
          formatOptions={{
            style: 'currency',
            currency: 'EUR',
            currencyDisplay: 'code',
            currencySign: 'accounting'
          }} />
        <CardInput />
        <div className={classes.div}>
          <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmitDeposit}>
            Verify
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default DepositCard;