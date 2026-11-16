import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleWishlist } from '../Redux/wishlistSlice'
import { Link } from 'react-router-dom'
import { addtoCart } from '../Redux/Cartslice'
import { formatINR } from '../formatCurrency'

function Card({ product }) {
  const dispatch = useDispatch()
  const wishlist = useSelector((state) => state.wishlist.items)
  const iswishlisted = wishlist.some((item) => item.id === product.id)

  return (
    <div className='product-card'>
      <button
        className={`wishlish-btn ${iswishlisted ? 'active' : ''}`}
        onClick={() => dispatch(toggleWishlist(product))}
        aria-label='Toggle wishlist'
      >
        ♥
      </button>
      <Link to={`/products/${product.id}`}>
        <div className='product-image'>
          <img src={product.image} alt={product.title} />
        </div>
      </Link>
      <div className='product-info'>
        <span className='category'>{product.category}</span>
        <Link to={`/products/${product.id}`}>
          <h3>{product.title}</h3>
        </Link>
        <div className='product-rating'>
          <b>★</b>
          {product.rating?.rate} ({product.rating?.count})
        </div>
        <div className='product-bottom'>
          <h2>{formatINR(product.price)}</h2>
          <button className='add-cart-btn' onClick={() => dispatch(addtoCart(product))}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
