import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';

const PaymentForm = ({paymentId}) => {
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

  const amount = paymentInfo.price;
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
    } else {
      setError('');
      setSuccess('Payment method created successfully!');
      console.log("💳 PaymentMethod:", paymentMethod);
    }

    const res = await axiosSecure.post("/create-payment-intent", {
      amount: amountInCents,
      
    });
    console.log('res from intent', res)
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
