import { combineReducers } from 'redux';

import ProductsReducer from './reducers/products';
import CartReducer from './reducers/cart';
import OrderReducer from './reducers/order';

const RootReducer = combineReducers({
    products: ProductsReducer,
    cart: CartReducer,
    order: OrderReducer,
})

export default RootReducer;
