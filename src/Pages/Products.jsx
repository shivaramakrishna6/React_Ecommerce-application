import React, { useEffect, useState } from 'react'
import Card from '../Components/Card'

const api = 'https://fakestoreapi.com/products'

function Products() {
  const [products, setproducts] = useState([])
  const [search, setsearch] = useState('')
  const [category, setcategory] = useState('all')
  const [sort, setsort] = useState('default')
  const [categories, setcategories] = useState([])

  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => setproducts(data))

    fetch(`${api}/categories`)
      .then((res) => res.json())
      .then((data) => setcategories(data))
  }, [])

  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'all' || product.category === category
    return matchCategory && matchesSearch
  })

  if (sort === 'low') filteredProducts.sort((a, b) => a.price - b.price)
  if (sort === 'high') filteredProducts.sort((a, b) => b.price - a.price)
  if (sort === 'rating') filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate)

  return (
    <main className='product-page'>
      <h1>All products</h1>
      <p>Discover our complete collection</p>
      <div className='filters'>
        <input
          type='text'
          placeholder='Search products'
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setcategory(e.target.value)}>
          <option value='all'>All Categories</option>
          {categories.map((cat) => (
            <option value={cat} key={cat}>{cat}</option>
          ))}
        </select>
        <select value={sort} onChange={(e) => setsort(e.target.value)}>
          <option value='default'>Sort By</option>
          <option value='low'>Price: Low to High</option>
          <option value='high'>Price: High to Low</option>
          <option value='rating'>Top Rating</option>
        </select>
      </div>
      <div className='product-grid'>
        {filteredProducts.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
      {filteredProducts.length === 0 && <p className='empty'>No products found</p>}
    </main>
      )
}

export default Products

