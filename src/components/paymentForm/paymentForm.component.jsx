import './paymentForm.style.scss';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button from '../button/button.component';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTotalPrice } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';


const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        position: 'relative',
        fontSize: "20px",
        "::placeholder": {
          color: "#aab7c4"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

const PaymentForm = () => {

    const stripe = useStripe();
    const elements = useElements();

    

    const totalPrice = useSelector(selectTotalPrice);
    const user = useSelector(selectCurrentUser);

    const [isPyamentLoading, setIsPaymentLoading] = useState(false);


    const paymentHandler = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setIsPaymentLoading(true);

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: totalPrice * 100 })
        }).then(res => res.json());

        const clientSecret = response.paymentIntent.client_secret;
        console.log(response)
        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: user?.displayName,
                    email: user?.email
                }
            }
        })

        setIsPaymentLoading(false);

        if(paymentResult.error){
            alert(paymentResult.error);
        }else{
            if(paymentResult.paymentIntent.status === 'succeeded'){
                alert('payment successfull');
            }
        }
    }

    return (
        <form onSubmit={paymentHandler}>
            <div className='payment-form w-50'>
                <CardElement options={CARD_ELEMENT_OPTIONS} />
            </div>
            <Button isLoading={isPyamentLoading} buttonType='inverted' text='buy now' />
        </form>
    )
}

export default PaymentForm;
