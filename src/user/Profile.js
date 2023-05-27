import { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { read, update, updateUser } from "./apiUser";
import { isAuthenticated } from "../auth";

const Profile = () => {

    const navigate=useNavigate();
    const[values,setValues]=useState({
        name:'',
        email:'',
        password:'',
        error:'',
        success:false

    });
    const{name,email,password,error,success}=values;
    const{userId}=useParams();
    const{token}=JSON.parse(isAuthenticated());
    

    const init=async()=>{
        try{
            const{data}=await read(token,userId);
            setValues({...values,name:data.name,email:data.email,success:false})
        }
        catch(err){
            setValues({...values,error:err.message})
        }

    };

    const redirect=(success)=>{
        if (success){
            navigate('/cart')
        }
    }
    const showError = (error) => {
        return (
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        );
      };
    const handleChange=(e,name)=>{
        setValues({...values,error:'',[name]:e.target.value})
    }

     const handleSubmit=async(e)=>{
       e.preventDefault();
       try{
const {data}=await update(token,userId,{name,email,password})
setValues({...values,error:'',success:true})
updateUser(data,()=>{
})
       }
       catch(err){
setValues({...values,error:err.message})
       }
    }

    const profileUpdate=(name,email,password)=>{
        return (
            <form className="mb-4">
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" value={name} onChange={(e)=>{handleChange(e,'name')}}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" className="form-control" value={email} onChange={(e)=>{handleChange(e,'email')}}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" className="form-control" value={password} onChange={(e)=>{handleChange(e,'password')}}/>
            </div>
            <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
        </form>
        )
      
    }
    useEffect(()=>{
        init();
    },[])
 return (
    <Layout
    title="Profile Update"
    description="Update your profile"
    className="container-fluid col-md-8 offset-md-2"
  >
    <h4>Profile</h4>
    {showError(error)}
    {profileUpdate(name,email,password)}
    {redirect(success)}
  </Layout>
 )
}
 
export default Profile;