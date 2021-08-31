import Order from '../../models/order';
import { NEW_ORDER, SET_ORDERS } from '../actions/order';

const INITIAL_STATE = {
  orders: [],
};

// Novo pedido: puxar do actionOrder o payload com items e totalAmount. Criar um novo pedido com modelo (ver: src/models/order.js).
//Retornar novo array com novo pedido

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ORDERS: 
      return {
        ...state,
        orders: action.payload,
      };
    case NEW_ORDER:
      const { id, items, amount, date } = action.payload;
      const newOrder = new Order(id, items, amount, date);
      return { ...state, orders: state.orders.concat(newOrder) };
    default:
      return state;
  }
};
