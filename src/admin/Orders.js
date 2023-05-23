import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { listOrders, listStatusValues, updateStatus } from "./apiAdmin";
import Layout from "../core/Layout";
import moment from "moment";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const[statusValues,setStatusValues]=useState([]);
  const token = JSON.parse(isAuthenticated()).token;
  const loadOrders = async () => {
    try {
      const { data } = await listOrders(token);
      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadStatusValues = async () => {
    try {
      const { data } = await listStatusValues(token);
      setStatusValues(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatusChange=async(e,orderId)=>{
    let status=e.target.value;
    try{
        const {data}=await updateStatus(orderId,status,token);
        console.log(data)
        loadOrders(); 
    }
    catch(err){
        console.log(err)
    }
  }

  const showOrdersLength = (orders) => {
    return orders.length < 0 ? (
      <h4>No orders</h4>
    ) : (
      <h2>Total Number of Orders are {orders.length}</h2>
    );
  };
  const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
        <div className="input-group-prepend">
            <div className="input-group-text">{key}</div>
        </div>
        <input
            type="text"
            value={value}
            className="form-control"
            readOnly
        />
    </div>
);

const showStatus = o => (
    <div className="form-group">
        <h3 className="mark mb-4">Status: {o.status}</h3>
        <select
            className="form-control"
            onChange={e => handleStatusChange(e, o._id)}
        >
            <option>Update Status</option>
            {statusValues.map((status, index) => (
                <option key={index} value={status}>
                    {status}
                </option>
            ))}
        </select>
    </div>
);

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);
  return (
    <Layout
      title="Orders"
      description="Manage All the Orders Here!"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showOrdersLength(orders)}
          {orders.map((o, i) => {
            return (
              <div
                className="mt-5 mb-3"
                key={i}
                style={{ borderBottom: "5px solid indigo",
                    padding: "20px",
                    border: "1px solid indigo" }}
              >
                <h2 className="mb-5">
                  <span className="bg-primary">Order ID: {o._id}</span>
                </h2>
                <ul className="list-group mb-2">
                  <li className="list-group-item">{showStatus(o)}</li>
                  <li className="list-group-item">
                    Transaction ID:{o.transaction_id}
                  </li>
                  <li className="list-group-item">Amount :${o.amount}</li>
                  <li className="list-group-item">Ordered by {o.user.name}</li>
                  <li className="list-group-item">
                    Ordered on {moment(o.createdAt).fromNow()}
                  </li>
                  <li className="list-group-item">
                    Delivery Address : {o.address}
                  </li> </ul>
                  <h3 className="mt-3 mb-3 font-italic">
                    Total Products in the order : {o.products.length}
                  </h3>
                  {o.products.map((p, pIndex) => (
                                    <div
                                        className="mb-4"
                                        key={pIndex}
                                        style={{
                                            padding: "20px",
                                            border: "3px solid pink"
                                        }}
                                    >
                                        {showInput("Product name", p.name)}
                                        {showInput("Product price", p.price)}
                                        {showInput("Product total", p.count)}
                                        {showInput("Product Id", p._id)}
                                    </div>
                                ))}
               
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
