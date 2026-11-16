import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleWishlist } from '../Redux/wishlistSlice'
import { Link } from 'react-router-dom'
import { addtoCart } from '../Redux/Cartslice'
import { formatINR } from '../formatCurrency'

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

function Card({ product }) {
  const dispatch = useDispatch()
  const wishlist = useSelector((state) => state.wishlist.items)
  const cartItems = useSelector((state) => state.cart.items)
  const [selectedSize, setSelectedSize] = useState('')
  const iswishlisted = wishlist.some((item) => item.id === product.id)
  const isClothing = product.category?.toLowerCase().includes('clothing')
  const isInCart = cartItems.some((item) =>
    item.id === product.id && item.size === (isClothing ? selectedSize : undefined)
  )

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
        {isClothing && (
          <div className='card-size-selector'>
            <label htmlFor={`product-size-${product.id}`}>Select size</label>
            <select
              id={`product-size-${product.id}`}
              value={selectedSize}
              onChange={(event) => setSelectedSize(event.target.value)}
            >
              <option value=''>Choose a size</option>
              {sizes.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
        )}
        <div className='product-bottom'>
          <h2>{formatINR(product.price)}</h2>
          <button
            className={`add-cart-btn ${isInCart ? 'added' : ''}`}
            onClick={() => dispatch(addtoCart(
              isClothing ? { ...product, size: selectedSize } : product
            ))}
            disabled={isClothing && !selectedSize}
          >
            {isInCart ? 'Added to cart' : 'Add to cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
