import Order from '../../models/order';
import { NEW_ORDER } from '../actions/order';

const INITIAL_STATE = {
  orders: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Novo pedido: puxar do actionOrder o payload com items e totalAmount. Criar um novo pedido com modelo (ver: src/models/order.js). 
    //Retornar novo array com novo pedido
    case NEW_ORDER: 
      const { items, amount } = action.payload;
      const newOrder = new Order(
        new Date().toString(),
        items,
        amount,
        new Date()
      );
      return { ...state, orders: state.orders.concat(newOrder)}
    default:
      return state;
  }
};
