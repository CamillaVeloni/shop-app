import Product from '../../models/Product';
import {
  CREATE_USER_PRODUCT,
  UPDATE_USER_PRODUCT,
  DELETE_USER_PRODUCT,
  SET_PRODUCTS,
} from '../actions/products';

const INITIAL_STATE = {
  availableProducts: [],
  userProducts: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        availableProducts: action.products,
        userProducts: action.userProducts,
      }
    case CREATE_USER_PRODUCT:
      const { prodId, ownerId, title, imageUrl, description, price } = action.payload;
      const newProduct = new Product(
        prodId,
        ownerId,
        title,
        imageUrl,
        description,
        price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case UPDATE_USER_PRODUCT:
      const { id } = action.payload; // Id do produto enviado pelo actions/products
      const productIndex = state.userProducts.findIndex(
        (prod) => prod.id === id
      ); // Pegando index do produto dentro dos produtos do usuário
      const availableProductIndex = state.availableProducts.findIndex(
        (prod) => prod.id === id
      ); // Pegando index do produto dentro dos produtos de todos usuários
      const updatedProduct = new Product(
        id,
        state.userProducts[productIndex].ownerId,
        action.payload.title,
        action.payload.imageUrl,
        action.payload.description,
        state.userProducts[productIndex].price
      );
      const updatedUserProducts = [...state.userProducts]; // Copiando array existente dos produtos do USUÁRIO
      updatedUserProducts[productIndex] = updatedProduct; // Substituindo produto pelo editado do USUÁRIO
      const updatedAvailableProducts = [...state.availableProducts]; // Copiando array dos produtos GERAIS
      updatedAvailableProducts[availableProductIndex] = updatedProduct; // Substituindo dos produtos GERAIS
      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      };
    case DELETE_USER_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (prod) => prod.id !== action.payload
        ),
        availableProducts: state.availableProducts.filter(
          (prod) => prod.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
