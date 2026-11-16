import React, { useEffect, useState } from 'react'
import Card from "../Components/Card"
import { Link } from 'react-router-dom'
import Products from './Products'


const api="https://fakestoreapi.com/products"
function Home() {
    const[product,setproduct]=useState([])
    useEffect(()=>{
        fetch(api)
        .then((res)=>res.json())
        .then((data)=>setproduct(data))
        .catch((err)=>console.log(err))
    },[])

  return (
    <div>
      <section className='hero'>
        <div className="hero-content">
            <span>New Collection</span>
            <h1>Discover your style</h1>
            <p>find the product for your life style. shop quality products at amazing prices</p>
            <Link to="/products" className="hero-btn">Shop now</Link>
        </div>
      </section>
      <section className='featured-section'>
        <div className="section-heading">
            <div>
                <span className='section-label'>Our Collection</span>
                <h2>Featured products</h2>
            </div>
            <Link to="/products">View All</Link>
        </div>
        <div className="product-grid">
            {product.slice(0,8).map((product)=>(
                <Card key={product.id} product={product}/> 
            ))}
        </div>
      </section>

      <section className='promo-bamner'>
        <h2>Upgrade your every day</h2>
        <p>Discover something you will love.</p>
        <Link to="/products">Explore Collections</Link>
      </section>
    </div>
  )
}

export default Home
