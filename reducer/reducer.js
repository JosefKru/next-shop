const reducer = (state, action) => {
  switch (action.type) {
    case 'addToBasket':
      return [
        ...state,
        action.payload
      ]
    default:
      return state
  }
}

export default reducer
