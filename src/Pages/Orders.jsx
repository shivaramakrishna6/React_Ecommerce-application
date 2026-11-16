import React from 'react'
import { Link } from 'react-router-dom'
import { formatINR } from '../formatCurrency'
function Orders() {
    const orders=JSON.parse(localStorage.getItem("orders")) || []

  return (
    <div className='products-page'>
      <h1>My Orders</h1>
      {orders.length===0 ?(
        <p>No orders placed yet</p>
      ):(
        orders.map((order)=>(
            <div className="orders-card" key={order.id}>
                <h3>Order #{order.id}</h3>
                <p>Date: {order.date}</p>
                <p>Total: {formatINR(order.total)}</p>
                {order.items.map((item)=>(
                    <p key={item.id}>{item.title} x {item.quantity}</p>
                ))}
            </div>
        ))
      )}
      <Link to="/products">Continue shopping</Link>
    </div>
  )
}

export default Orders
