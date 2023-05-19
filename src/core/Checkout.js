import React from 'react';
import {isAuthenticated} from '../auth/index';
import { Link } from 'react-router-dom';
const Checkout = ({products}) => {
const getTotal=()=>{
return products.reduce((accumulator,current)=>{
    return accumulator+(current.count*current.price) 
},0)
};

const showCheckoutButton=()=>{
return(
isAuthenticated() ? (<button className='btn btn-outline-success'>Checkout</button>) : (<button className='btn btn-outline-primary'><Link to='/signin'>Signin to Checkout</Link></button>)
)
}
    return ( <>
    <h3>Your Cart Summary</h3>
    <hr/>
    <h3>Total Price ${getTotal()}</h3>
    {showCheckoutButton()}
   
    </> );
}
 
export default Checkout;