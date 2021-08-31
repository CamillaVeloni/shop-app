import { BASE_URL } from '../../config';

export const NEW_ORDER = 'newOrder';

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch) => {
    const date = new Date();

    const response = await fetch(`${BASE_URL}/orders/u1.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: cartItems,
        totalAmount,
        date: date.toISOString(),
      }),
    });

    if (!response.ok)
      throw new Error(
        'Algo deu errado na requisição! Tente outra vez mais tarde.'
      );

    const respData = await response.json();

    dispatch({
      type: NEW_ORDER,
      payload: {
        id: respData.name,
        items: cartItems,
        amount: totalAmount,
        date,
      },
    });
  };
};
