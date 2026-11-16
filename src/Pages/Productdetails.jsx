import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { addtoCart } from '../Redux/Cartslice'
import { formatINR } from '../formatCurrency'

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

function Productdetails() {
    const {id}=useParams()
    const dispatch=useDispatch()
    const[product,setproduct]=useState(null)
    const [sizeSelection, setSizeSelection] = useState({ productId: null, size: '' })
    const cartItems = useSelector((state) => state.cart.items)
    useEffect(()=>{
        fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res)=>res.json())
        .then((data)=>setproduct(data))
    },[id])
    if(!product || product.id !== Number(id)) return <h2 className='loading'>Loading.....</h2>
    const selectedSize = sizeSelection.productId === product.id ? sizeSelection.size : ''
    const isClothing = product.category?.toLowerCase().includes('clothing')
    const isInCart = cartItems.some((item) =>
        item.id === product.id && item.size === (isClothing ? selectedSize : undefined)
    )
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
                {isClothing && (
                    <div className='size-selector'>
                        <label htmlFor='product-size'>Select size</label>
                        <select
                            id='product-size'
                            value={selectedSize}
                            onChange={(event) => setSizeSelection({
                                productId: product.id,
                                size: event.target.value
                            })}
                        >
                            <option value=''>Choose a size</option>
                            {sizes.map((size) => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>
                )}
                <button
                    className={`primary-btn ${isInCart ? 'cart-added' : ''}`}
                    onClick={() => dispatch(addtoCart(
                        isClothing ? { ...product, size: selectedSize } : product
                    ))}
                    disabled={isClothing && !selectedSize}
                >
                    {isInCart ? 'Added to cart' : 'Add to cart'}
                </button>
            </div>
        </div>
    </main>
  )
}

export default Productdetails
