import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { cartItems } from "./cartHelpers";
import Card from "./Card";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";
const Cart = () => {
    const[items,setItems]=useState([]);
    const[run,setRun]=useState(false);

    const showCart=(items)=>{
return (
    <>
    <h3>Showing {items.length} items in the Shopping Cart </h3>
    <hr/>
    {items.map((p,i)=> <Card product={p} showUpdateOpts={true} removeButton={true} showCartButton={false} run={run} setRun={setRun}/>)}
    </>
)
    };
    const noItemsmsg=()=>( <p>There are no items in the Cart <Link to='/shop'>Continue Shopping</Link></p>)
            

    useEffect(()=>{
        setItems(cartItems())
    },[run])
  return (
    <Layout
      title="Cart Page"
      description="Manage your Cart Items"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
            {items.length>0 ? showCart(items):noItemsmsg()}
        </div>
        <div className="col-6"><Checkout run={run} setRun={setRun} products={items}/></div>
      </div>
    </Layout>
  );
};

export default Cart;
