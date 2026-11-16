import React from 'react'
import { useSelector } from 'react-redux'
import Card from '../Components/Card'

function Wishlist() {
    const items=useSelector((state)=>state.wishlist.items)

  return (
    <div className='products-page'>
      <h1>My wishlist</h1>
      {items.length===0?(
        <p className='empty'>No wishlist products yet.</p>
      ):(
        <div className="product-grid">
            {items.map((product)=>(
                <Card key={product.id} product={product}/>
            ))}
        </div>
      )}
    </div>
  )
}

export default Wishlist
