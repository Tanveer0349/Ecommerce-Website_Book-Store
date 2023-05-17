import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';
const Home = () => {

const[productsBySell,setProductsBySell]=useState([]);
const[productsByArrival,setProductsByArrival]=useState([]);
const[error,setError]=useState('')
const loadProductsBySell =async()=>{
try{
    const {data}=await getProducts('sold');
    setProductsBySell(data);
}
catch(err){
setError(err.response.data);
}

}
const loadProductsByArrival =async()=>{
    try{
        const {data}=await getProducts('createdAt');
        setProductsByArrival(data);
    }
    catch(err){
    setError(err.response.data.error);
    }
    
    }

useEffect(()=>{
loadProductsBySell();
loadProductsByArrival();
},[])

    return ( 
    
    <Layout title="Home Page" description='Node Ecommerce App' className='container-fluid'>
<h3>Search Bar</h3>
<Search/>
<h3 className='mb-4'>New Arrival</h3>
<div className='row'>{productsByArrival.map((p,i)=>(<Card product={p}/>))}</div>
<h3 className='mb-4'>Best Sellers</h3>
<div className='row'>{productsBySell.map((p,i)=>(<Card product={p}/>))}</div>
    </Layout> );
}
 
export default Home;