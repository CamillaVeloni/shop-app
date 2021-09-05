import { BASE_URL } from '../../config';
import Order from '../../models/order';

export const NEW_ORDER = 'newOrder';
export const SET_ORDERS = 'setOrders';

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    
    const response = await fetch(`${BASE_URL}/orders/${userId}.json`);

    try {
      if (!response.ok)
        throw new Error(
          'Algo deu errado na requisição! Tente outra vez mais tarde.'
        );

      const data = await response.json();
      let loadedOrders = [];
      for (const key in data) {
        loadedOrders.push(
          new Order(
            key,
            data[key].items,
            data[key].totalAmount,
            new Date(data[key].date)
          )
        );
      }

      dispatch({
        type: SET_ORDERS,
        payload: loadedOrders,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;

    const date = new Date();

    const response = await fetch(`${BASE_URL}/orders/${userId}.json?auth=${token}`, {
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
