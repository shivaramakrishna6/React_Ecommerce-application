import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseQuantity, increaseQuantity, removeFromcart } from '../Redux/Cartslice'
import { Link } from 'react-router-dom'
import { formatINR } from '../formatCurrency'

function Cart() {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.cart.items)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const count = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className='cart-page'>
      <h1>Shopping Cart</h1>
      <p>{count} items in your cart</p>
      {items.length === 0 ? (
        <div className='empty-cart'>
          <h2>Your cart is empty</h2>
          <Link to='/products'>Continue shopping</Link>
        </div>
      ) : (
        <div className='cart-layout'>
          <div className='cart-items'>
            {items.map((item) => (
              <div className='cart-item' key={`${item.id}-${item.size || 'one-size'}`}>
                <img src={item.image} alt={item.title} />
                <div className='cart-item-info'>
                  <h3>{item.title}</h3>
                  <p>{formatINR(item.price)}</p>
                  {item.size && <p>Size: {item.size}</p>}
                  <div className='quantity'>
                    <button onClick={() => dispatch(decreaseQuantity({ id: item.id, size: item.size }))}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(increaseQuantity({ id: item.id, size: item.size }))}>+</button>
                  </div>
                </div>
                <button
                  className='remove-btn'
                  onClick={() => dispatch(removeFromcart({ id: item.id, size: item.size }))}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className='cart-summary'>
            <h2>Order Summary</h2>
            <div>
              <span>Subtotal</span>
              <span>{formatINR(total)}</span>
            </div>
            <div>
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className='total'>
              <span>Total</span>
              <span>{formatINR(total)}</span>
            </div>
            <Link to='/check' className='checkout-btn'>Proceed to Order</Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
