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
  const [step, setStep] = useState('registration')
  const [registration, setRegistration] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [delivery, setDelivery] = useState({
    phone: '',
    address: '',
    city: '',
    pincode: ''
  })

  function handleRegistrationChange(e) {
    setRegistration({ ...registration, [e.target.name]: e.target.value })
  }

  function handleDeliveryChange(e) {
    setDelivery({ ...delivery, [e.target.name]: e.target.value })
  }

  function handleRegistrationSubmit(e) {
    e.preventDefault()
    setStep('delivery')
  }

  function handleDeliverySubmit(e) {
    e.preventDefault()

    if (!items.length) {
      alert('Your cart is empty')
      return
    }

    const order = {
      id: Date.now(),
      customer: {
        name: registration.name,
        email: registration.email,
        ...delivery
      },
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
      {step === 'registration' ? (
        <form className='checkout-form' onSubmit={handleRegistrationSubmit}>
          <h2>Register to continue</h2>
          <input
            type='text'
            name='name'
            value={registration.name}
            onChange={handleRegistrationChange}
            placeholder='Full name'
            autoComplete='name'
            required
          />
          <input
            type='email'
            name='email'
            value={registration.email}
            onChange={handleRegistrationChange}
            placeholder='Email'
            autoComplete='email'
            required
          />
          <input
            type='password'
            name='password'
            value={registration.password}
            onChange={handleRegistrationChange}
            placeholder='Password'
            autoComplete='new-password'
            minLength={8}
            required
          />
          <button type='submit'>Register and continue</button>
        </form>
      ) : (
        <form className='checkout-form' onSubmit={handleDeliverySubmit}>
          <h2>Delivery information</h2>
          <input
            type='tel'
            name='phone'
            value={delivery.phone}
            onChange={handleDeliveryChange}
            placeholder='Phone'
            autoComplete='tel'
            required
          />
          <input
            type='text'
            name='address'
            value={delivery.address}
            onChange={handleDeliveryChange}
            placeholder='Address'
            autoComplete='street-address'
            required
          />
          <input
            type='text'
            name='city'
            value={delivery.city}
            onChange={handleDeliveryChange}
            placeholder='City'
            autoComplete='address-level2'
            required
          />
          <input
            type='text'
            name='pincode'
            value={delivery.pincode}
            onChange={handleDeliveryChange}
            placeholder='Pincode'
            autoComplete='postal-code'
            required
          />
          <h3>Order Total: {formatINR(total)}</h3>
          <button type='submit'>Place Order</button>
        </form>
      )}
    </div>
  )
}

export default Check

