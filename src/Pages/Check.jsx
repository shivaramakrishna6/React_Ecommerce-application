import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { clearCart } from '../Redux/Cartslice'
import { formatINR } from '../formatCurrency'

function Check() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const items = useSelector((state) => state.cart.items)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const [form, setform] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  })

  function handlechange(e) {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  function handlesubmit(e) {
    e.preventDefault()

    if (!items.length) {
      alert('Your cart is empty')
      return
    }

    const order = {
      id: Date.now(),
      customer: form,
      items,
      total,
      date: new Date().toLocaleDateString()
    }

    const orders = JSON.parse(localStorage.getItem('orders')) || []
    localStorage.setItem('orders', JSON.stringify([...orders, order]))

    dispatch(clearCart())
    navigate('/orders')
  }

  if (!items.length) {
    return (
      <div className='checkout-page'>
        <h2>Your cart is empty</h2>
        <Link to='/products'>Shop products</Link>
      </div>
    )
  }

  return (
    <div className='checkout-page'>
      <h1>Order Now</h1>
      <form className='checkout-form' onSubmit={handlesubmit}>
        <h2>Delivery information</h2>
        {Object.keys(form).map((key) => (
          <input
            type='text'
            key={key}
            name={key}
            value={form[key]}
            onChange={handlechange}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            required
          />
        ))}
        <h3>Order Total: {formatINR(total)}</h3>
        <button type='submit'>Place Order</button>
      </form>
    </div>
  )
}

export default Check

