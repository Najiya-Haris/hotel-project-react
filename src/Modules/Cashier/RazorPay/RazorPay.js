import React, { useEffect } from 'react';
import axios from "axios";
import config from '../../../config/Config';
import {useSelector} from "react-redux"
import {useNavigate} from 'react-router-dom'

function RazorPay() {
  const userDetails = useSelector((state) => state.user.loginUserDetails);
  const token = userDetails.tokens[userDetails.tokens.length - 1];
  const navigate=useNavigate()
  useEffect(() => {
    const loadRazorpay = () => {
      const options = {
        key: "rzp_test_169B3oRa1aOdmp", // Enter the Key ID generated from the Dashboard
        amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Acme Corp", //your business name
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: function (response) {
          if(response.razorpay_payment_id){
            const payment=async()=>{
              const response=await axios.post(`${config.apiUrl}/calculateBill`,{},{
                headers: {
                  Authorization: token,
                  "Content-Type": "application/json",
                },
              });
              if(response.data.isSuccess){
                navigate('/paymentSuccess',{replace:true})
              }
            }
            payment()
            
          }
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature);
        },
        prefill: { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          name: "Gaurav Kumar", //your customer's name
          email: "gaurav.kumar@example.com",
          contact: "9000090000"  //Provide the customer's phone number for better conversion rates 
        },
        notes: {
          address: "Razorpay Corporate Office"
        },
        theme: {
          color: "#3399cc"
        }
      };
      const rzp1 = new window.Razorpay(options); 
      console.log("rzp1", rzp1);
      rzp1.on('payment.failed', function (response) {
        console.log("error : ", response.error)
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      document.getElementById('rzp-button1').onclick = function (e) {
        rzp1.open();
        e.preventDefault();
      }
    };

    const script = document.createElement('script');
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => loadRazorpay();
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <button id="rzp-button1">Pay</button>
  );
}

export default RazorPay;
