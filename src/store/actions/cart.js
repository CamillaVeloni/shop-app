export const ADD_TO_CART = 'addItem';
export const REMOVE_ITEM = 'removeItem';
export const CLEAR_CART = 'clearCart';

export const addToCart = product => {
  return { type: ADD_TO_CART, payload: product };
};
export const removeFromCart = productId => {
  return { type: REMOVE_ITEM, payload: productId };
}

export const clearCart = () => {
  return { type: CLEAR_CART }
}
