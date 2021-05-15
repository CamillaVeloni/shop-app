export const NEW_ORDER = 'newOrder';

export const addOrder = (cartItems, totalAmount) => {
  return { type: NEW_ORDER, payload: { items: cartItems, amount: totalAmount } };
};
