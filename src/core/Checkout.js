import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";
import { getClientToken, processPayment } from "./apiCore";
import DropIn from "braintree-web-drop-in-react";
import { emptyCart } from "./cartHelpers";
const Checkout = ({ products,run,setRun }) => {
  const [data, setData] = useState({
    clientToken: null,
    instance: {},
    success: false,
    error: "",
    address: "",
  });
  const token = JSON.parse(isAuthenticated()).token;
  const getTotal = () => {
    return products.reduce((accumulator, current) => {
      return accumulator + current.count * current.price;
    }, 0);
  };

  const getToken = async () => {
    try {
      const { data:result } = await getClientToken(token);
      setData({ ...data, clientToken: result.clientToken });
    } catch (err) {
      setData({ ...data, error: err.message });
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  const showCheckoutButton = () => {
    return isAuthenticated() ? (
      <div>{showDropin()}</div>
    ) : (
      <button className="btn btn-outline-primary mt-4">
        <Link to="/signin">Signin to Checkout</Link>
      </button>
    );
  };

  const buy = async () => {
    try {
      const { nonce } = await data.instance.requestPaymentMethod();
      let total = getTotal(products);
      let paymentData={paymentMethodNonce:nonce,amount:total}
     try{
const {data:result}=await processPayment(token,paymentData);
setData({...data,success:result.success});
emptyCart(()=>console.log('Payment done cart empty'));
setRun(!run)
     }catch(err){
setData({...data,error:err.message})
     }
    } catch (err) {
      setData({ ...data, error: err.message });
    }
  };

  const showError = (error) => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >{error}</div>
    );
  };
  const showSuccess = (success) => {
    return (
      <div
        className="alert alert-info"
        style={{ display: success ? "" : "none" }}
      >Your Payment was Succesful!</div>
    );
  };
  const showDropin = () => {
    return (
      <div onBlur={()=>setData({...data,error:''})}>
        {data.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{
                authorization: data.clientToken,
              }}
              onInstance={(instance) => (data.instance = instance)}
            />
            <button onClick={buy} className="btn btn-success btn-block">
              Pay now
            </button>
          </div>
        ) : null}
      </div>
    );
  };
  return (
    <>
      <h3>Your Cart Summary</h3>
      <hr />
      <h3>Total Price ${getTotal()}</h3>
      {showError(data.error)}
      {showSuccess(data.success)}
      {showCheckoutButton()}
    </>
  );
};

export default Checkout;
