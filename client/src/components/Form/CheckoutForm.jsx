import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import {ImSpinner9} from 'react-icons/im'
import PropTypes from "prop-types";
import "./CheckoutForm.css";
import toast from "react-hot-toast";



function CheckoutForm({ requestInfo, closeModal }) {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
    const [cardError, setCardError] = useState("");
   const [processing, setProcessing] = useState(false);
  

  useEffect(() => {
    // fetch client secret
    if (requestInfo.price > 1) {
      getClientSecret(requestInfo?.price);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestInfo.price, axiosSecure]);

  // get client secret
  const getClientSecret = async (price) => {
    try {
      const { data } = await axiosSecure.post(`/create-payment-intent`, 
       {price},
      );
      
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error("Error fetching client secret:", error);
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (cardElement == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card:cardElement,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
      setProcessing(false)
      return
    } else {
        console.log('[PaymentMethod]]',paymentMethod)
        setCardError('')
    }

    //confirm Payment
   const { error: confirmedError, paymentIntent } =
     await stripe.confirmCardPayment(clientSecret, {
       payment_method: {
         card: cardElement,
         billing_details: {
           email: user?.email,
           name: user?.displayName,
         },
       },
     });

    if(confirmedError) {
        console.log(confirmedError)
        setCardError(confirmedError.message)
        setProcessing(false)
        return
    }

    if (paymentIntent.status === "succeeded") {
      //create paymnet info object
      console.log(paymentIntent);

      const paymentInfo = {
        ...requestInfo,
        status: "Pending",
        phone: "Pending",
        email: "Pending",
        transactionId: paymentIntent.id,
        date: new Date(),
      };
      
      delete paymentInfo._id
      console.log(paymentInfo);

      //save payment info in booking collection
      //change biodata status to requested
      try {
        
       await axiosSecure.post("/contactRequest", paymentInfo);
        closeModal();
        toast.success('Request Sent Successfully');
        navigate(`/dashboard/my-contact-request/${user.email}`);
      } catch (err) {
        console.log(err.message);
        
        if (err.response && err.response.data && err.response.data.error) {
          toast.error(err.response.data.error);
        } else {
          toast.error("Failed to send request. Please try again.");
        }
        
      }
      }    
    setProcessing(false);
    //save payment info in booking collection
        //change biodata status to requested
    

  };
 
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="card-element">Credit or Debit Card</label>
        <CardElement id="card-element" />
      </div>
      <div className=" flex justify-center items-center">
        <button
          className=" w-20 py-2 px-4 text-white hover:bg-white hover:text-black bg-lightPink hover:border hover:border-lightPink rounded-lg"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
         { processing?<ImSpinner9 className="animate-spin m-auto" size={24} /> :"Pay"}
        </button>
        <button
          onClick={closeModal}
          className="ml-5 py-2 px-4 text-white hover:bg-white hover:text-red-600 bg-red-500 hover:border hover:border-red-500 rounded-lg"
          type="button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

CheckoutForm.propTypes = {
  requestInfo: PropTypes.object,
  closeModal: PropTypes.func,
};

export default CheckoutForm
