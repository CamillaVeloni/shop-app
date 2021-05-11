import Order from '../../models/order';
import { NEW_ORDER } from '../actions/order';

const INITIAL_STATE = {
  orders: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEW_ORDER:
      const newOrder = new Order(
        new Date().toString,
        action.payload.items,
        action.payload.amount,
        new Date()
      );
      return { ...state, orders: state.orders.concat(newOrder) }
    default:
      return state;
  }
};
