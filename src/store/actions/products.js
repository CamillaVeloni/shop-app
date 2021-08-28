import Product from '../../models/Product';

export const DELETE_USER_PRODUCT = 'deleteUserProduct';
export const CREATE_USER_PRODUCT = 'createProduct';
export const UPDATE_USER_PRODUCT = 'updateProduct';
export const SET_PRODUCTS = 'setProducts';

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'https://shop-app-f3a35-default-rtdb.firebaseio.com/products.json'
      );

      if (!response.ok) {
        // Pegando erro
        // pode também ver o que deu errado no container do response (body)
        throw new Error('Algo deu errado!');
      }

      const data = await response.json();
      const loadedData = [];
      for (const key in data) {
        loadedData.push(
          new Product(
            key,
            'u1',
            data[key].title,
            data[key].imageUrl,
            data[key].description,
            data[key].price
          )
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        payload: loadedData,
      });
    } catch (error) {
      // passar para custom analytics server
      // throw error ~~ só repassa o erro para a tela que chama essa action (nesse caso: ProductsOverviewScreen)
      throw error;
    }
  };
};

export const deleteUserProduct = (productId) => {
  return async (dispatch) => {
    await fetch(
      `https://shop-app-f3a35-default-rtdb.firebaseio.com/products/${productId}.json`,
      {
        method: 'DELETE',
      }
    );

    dispatch({
      type: DELETE_USER_PRODUCT,
      payload: productId,
    });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    const response = await fetch(
      'https://shop-app-f3a35-default-rtdb.firebaseio.com/products.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
  // method: 'PUT' ~~ vai 'override' o resource com o novo data
  // method: 'PATCH' ~~ vai atualizar no local que você colocar (body)
  return async (dispatch) => {
    await fetch(
      `https://shop-app-f3a35-default-rtdb.firebaseio.com/products/${id}.json`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      }
    );

    dispatch({
      type: UPDATE_USER_PRODUCT,
      payload: {
        id,
        title,
        description,
        imageUrl,
      },
    });
  };
};
