import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: JSON.parse(localStorage.getItem('wishlist')) || []
}

const wishlistSlice = createSlice({
  name: 'wishllist',
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload
      const exists = state.items.some((item) => item.id === product.id)

      if (exists) {
        state.items = state.items.filter((item) => item.id !== product.id)
      } else {
        state.items.push(product)
      }

      localStorage.setItem('wishlist', JSON.stringify(state.items))
    }
  }
})

export const { toggleWishlist } = wishlistSlice.actions

export default wishlistSlice.reducer
