import Navbar from './Components/Navbar'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Products from './Pages/Products'
import Productdetails from './Pages/Productdetails'
import Cart from './Pages/Cart'
import Wishlist from './Pages/Wishlist'
import Check from './Pages/Check'
import Orders from './Pages/Orders'
import Footer from './Components/Footer'

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Productdetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/check" element={<Check />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
