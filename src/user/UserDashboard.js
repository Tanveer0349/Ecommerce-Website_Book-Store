import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./apiUser";
import moment from "moment/moment";
const Dashboard = () => {
  const[history,setHistory]=useState();
  const { _id,name, email, role,token } = JSON.parse(isAuthenticated());

  const init=async()=>{
    try{
const {data}=await getPurchaseHistory(token,_id);
setHistory(data)
    }
    catch(err){
      console.log(err)
    }
  }

useEffect(()=>{
  init();
},[])
  const userLinks = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">User Links</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/cart"> My Cart </Link>
          </li>
          <li className="list-group-item">
            <Link to={`/profile/${_id}`}> Profile Update </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userHistory = history => {
    return (
        <div className="card mb-5">
            <h3 className="card-header">Purchase history</h3>
            <ul className="list-group">
                <li className="list-group-item">
                    {history&&history.map((h, i) => {
                        return (
                            <div>
                                <hr/>
                                {h.products.map((p, i) => {
                                    return (
                                        <div key={i}>
                                            <h6>Product name: {p.name}</h6>
                                            <h6>Product price: ${p.price}</h6>
                                            <h6>
                                                Purchased date:{" "}
                                                {moment(p.createdAt).fromNow()}
                                            </h6>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </li>
            </ul>
        </div>
    );
};
  const userInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>

          <li className="list-group-item">
            {role === 1 ? "Admin" : "Registered User"}
          </li>
        </ul>
      </div>
    );
  };


  return (
    <Layout
      title="Dashboard"
      description="User Dashboard"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-md-3">{userLinks()}</div>
        <div className="col-md-9">
          {userInfo()}
          {userHistory(history)}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
