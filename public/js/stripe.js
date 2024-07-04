/* eslint-disable */
import axios from 'axios';

import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51PYUn4HCUVBuOPPk3r7CcT2SP2IrBbWYkhiPLb8W8rln72SbA2TcbMVbVKG5YREwYg4ycY7CBCXmCOJeCBQAijOk00KnHATCVM'
);

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from server

    const session = await axios({
      method: 'GET',
      url: `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`
    });

    // 2) create checkout from + chance credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    showAlert('error', err);
  }
};
