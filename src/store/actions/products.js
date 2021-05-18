export const DELETE_USER_PRODUCT = 'deleteUserProduct';
export const CREATE_USER_PRODUCT = 'createProduct';
export const UPDATE_USER_PRODUCT = 'updateProduct';

export const deleteUserProduct = (productId) => {
  return { type: DELETE_USER_PRODUCT, payload: productId };
};

export const createProduct = (title, description, imageUrl, price) => {
  return {
    type: CREATE_USER_PRODUCT,
    payload: {
      title,
      description,
      imageUrl,
      price,
    },
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
        }
    }
}