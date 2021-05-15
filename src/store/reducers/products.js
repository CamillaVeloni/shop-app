import PRODUCTS from '../../data/dummy-data';

const INITIAL_STATE = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
}

export default(state = INITIAL_STATE, action) => {
    switch(action.type) {
        default: 
            return state;
    }
}
