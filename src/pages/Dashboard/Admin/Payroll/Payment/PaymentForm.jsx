import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';

const PaymentForm = ({ paymentId, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { isPending, data: paymentInfo = {} } = useQuery({
    queryKey: ['payments', paymentId],
    queryFn: async() => {
      const res = await axiosSecure.get(`/payments/${paymentId}`);
      return res.data;
    }
  })

  if(isPending){
    return '...loading';
  }

  const amount = paymentInfo.amount;
  const amountInCents = amount*100;

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!stripe || !elements) return;

  const card = elements.getElement(CardElement);
  if (!card) return;

  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: 'card',
    card,
  });

  if (error) {
    setError(error.message);
    setSuccess('');
    return;
  } else {
    setError('');
    setSuccess('');
  }

  // Create Payment Intent
  const intentRes = await axiosSecure.post("/create-payment-intent", {
    amount: amountInCents,
  });

  const clientSecret = intentRes.data.clientSecret;

  // Confirm Card Payment
  const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: paymentMethod.id
  });

  if (confirmError) {
    setError(confirmError.message);
    return;
  }

  // Update backend with payment info (PATCH)
  const patchRes = await axiosSecure.patch(`/payments/${paymentId}`, {
    transactionId: paymentIntent.id,
    paymentDate: new Date(),
    status: 'paid',
    approvedBy: 'Stripe Gateway'
  });

  if (patchRes.data?.success) {
    setSuccess(' Payment successful and saved!');
    onSuccess();   
  } else {
    setError(' Payment succeeded, but failed to save in database');
  }
};


  return (
    <div>
      <form onSubmit={handleSubmit} className='space-y-4 p-6 bg-white rounded-xl shadow-md w-full max-w-md mx-auto'>
        <CardElement className='p-2 border rounded' />
        
        <button 
          type='submit' 
          className='btn btn-primary w-full text-black'
          disabled={!stripe}
        >
          Pay ${amount}
        </button>

        {error && <p className='text-red-500'>{error}</p>}
        {success && <p className='text-green-500'>{success}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
