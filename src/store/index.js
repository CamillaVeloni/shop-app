import { combineReducers } from 'redux';

import ProductsReducer from './reducers/products';
import CartReducer from './reducers/cart';
import OrderReducer from './reducers/order';
import AuthReducer from './reducers/auth';

const RootReducer = combineReducers({
    products: ProductsReducer,
    cart: CartReducer,
    order: OrderReducer,
    auth: AuthReducer
})

export default RootReducer;
