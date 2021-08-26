import Product from "../../models/Product";

export const DELETE_USER_PRODUCT = 'deleteUserProduct';
export const CREATE_USER_PRODUCT = 'createProduct';
export const UPDATE_USER_PRODUCT = 'updateProduct';
export const SET_PRODUCTS = 'setProducts';

export const fetchProducts = () => {
  return async (dispatch) => {
    const response = await fetch(
      'https://shop-app-f3a35-default-rtdb.firebaseio.com/products.json'
    );
    
    const data = await response.json();
    const loadedData = [];
    for (const key in data) {
      loadedData.push(new Product(
        key,
        'u1',
        data[key].title,
        data[key].imageUrl,
        data[key].description,
        data[key].price
      ))
    }

    dispatch({
      type: SET_PRODUCTS,
      payload: loadedData,
    });
  };
};

export const deleteUserProduct = (productId) => {
  return { type: DELETE_USER_PRODUCT, payload: productId };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    const response = await fetch(
      'https://shop-app-f3a35-default-rtdb.firebaseio.com/products.json',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
        }),
      }
    );
    const respData = await response.json();

    dispatch({
      type: CREATE_USER_PRODUCT,
      payload: {
        id: respData.name,
        title,
        description,
        imageUrl,
        price,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_USER_PRODUCT,
    payload: {
      id,
      title,
      description,
      imageUrl,
    },
  };
};
