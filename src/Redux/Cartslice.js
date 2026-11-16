import { createSlice } from '@reduxjs/toolkit'

const initialState = { items: JSON.parse(localStorage.getItem('cart')) || [] }

const isSameCartItem = (item, product) =>
  item.id === product.id && item.size === product.size

const cartslice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      const product = action.payload
      const existing = state.items.find((item) => isSameCartItem(item, product))

      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...product, quantity: 1 })
      }

      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => isSameCartItem(item, action.payload))

      if (item) item.quantity += 1
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => isSameCartItem(item, action.payload))

      if (item && item.quantity > 1) {
        item.quantity -= 1
      }

      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    removeFromcart: (state, action) => {
      state.items = state.items.filter((item) => !isSameCartItem(item, action.payload))
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    clearCart: (state) => {
      state.items = []
      localStorage.setItem('cart', JSON.stringify([]))
    }
  }
})

export const {
  addtoCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromcart,
  clearCart
} = cartslice.actions

export default cartslice.reducer
