import React from 'react'
import {Link} from "react-router-dom";
import { useSelector } from "react-redux"
function Navbar() {
    const cartitems=useSelector((state)=>state.cart.items)
    const wishlistitems=useSelector((state)=>state.wishlist.items)
    const cartcount=cartitems.reduce((total,item)=>total+item.quantity,0)
  return (
    <nav className='navbar'>
        <Link to="/" className='brand'>
        {/* <store size={28}/> */}
        Shopsy's
        </Link>
        <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/orders">Orders</Link>
        </div>
        <div className="nav-icons">
            <Link
                to="/wishlist"
                className='nav-icon'
                aria-label={`Wishlist, ${wishlistitems.length} items`}
                title="Wishlist"
            >
                <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
                    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
                </svg>
                <span aria-hidden="true">{wishlistitems.length}</span>
            </Link>

            <Link
                to="/cart"
                className='nav-icon'
                aria-label={`Shopping cart, ${cartcount} items`}
                title="Shopping cart"
            >
                <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
                    <path d="M3 3h2l2.2 11.1a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 1.9-1.4L22 8H6" />
                    <circle cx="10" cy="20" r="1.5" />
                    <circle cx="18" cy="20" r="1.5" />
                </svg>
                <span aria-hidden="true">{cartcount}</span>
            </Link>
        </div>
    </nav>
  )
}

export default Navbar
