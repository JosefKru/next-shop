import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload]
    },

    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (item) => item._id === action.payload.id
      )

      const newBasket = [...state.items]

      if (index >= 0) {
        newBasket.splice(index, 1)
      } else {
        console.log(
          `product with id: '${action.payload.id}' is not in a basket`
        )
      }

      state.items = newBasket
    },
  },

  removeAllFromBasket: (state, action) => {},
})

// Action creators
export const { addToBasket, removeFromBasket, removeAllFromBasket } =
  basketSlice.actions

// Selectors
export const selectBasketItems = (state) => state.basket.items
export const selectBasketItemsWithId = (state, id) =>
  state.basket.items.filter((item) => item._id === id)
export const selectBasketTotal = (state) =>
  state.basket.items.reduce((total, item) => (total += item.price), 0)

export default basketSlice.reducer
