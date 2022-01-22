import React from 'react';
import TransferCard from './TransferCard';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import "../../styling/Card.css"

const stripePromise = loadStripe("pk_test_51KCTtTEVTmWxmcOSvFjvN1OClUAJCSDeO3wQt5REvTGN6EHc2hVJdXCxbYblIt3d8pq1pVnj6ZAIrC8ZxdRXW0U0006RI67t5Z")

function WrapTransferCard() {
  return (
    <Elements stripe={stripePromise}>
      <TransferCard />
    </Elements>
  );
}

export default WrapTransferCard;