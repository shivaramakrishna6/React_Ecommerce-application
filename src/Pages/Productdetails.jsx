import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { addtoCart } from '../Redux/Cartslice'
import { formatINR } from '../formatCurrency'

function Productdetails() {
    const {id}=useParams()
    const dispatch=useDispatch()
    const[product,setproduct]=useState(null)
    useEffect(()=>{
        fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res)=>res.json())
        .then((data)=>setproduct(data))
    },[id])
    if(!product) return <h2 className='loading'>Loading.....</h2>
  return (
    <main className='details-page'>
        <Link to="/products">back to products</Link>
        <div className="details-container">
            <img src={product.image} alt="" />
            <div>
                <span className='category'>{product.category}</span>
                <h1>{product.title}</h1>
                <p className='details-rating'>*{product.rating.rate}/5</p>
                <h2>{formatINR(product.price)}</h2>
                <p>{product.description}</p>
                <button className='primary-btn' onClick={()=>dispatch(addtoCart(product))}>Add to cart</button>
            </div>
        </div>
    </main>
  )
}

export default Productdetails
