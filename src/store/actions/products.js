import { BASE_URL } from '../../config';
import Product from '../../models/Product';

export const DELETE_USER_PRODUCT = 'deleteUserProduct';
export const CREATE_USER_PRODUCT = 'createProduct';
export const UPDATE_USER_PRODUCT = 'updateProduct';
export const SET_PRODUCTS = 'setProducts';

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      // fetching data da API, verificando resposta e transformando de JSON para objeto javascript
      const response = await fetch(`${BASE_URL}/products.json`);
      if (!response.ok) {
        // Pegando erro
        // pode também ver o que deu errado no container do response (body)
        throw new Error(
          'Algo deu errado na requisição! Tente outra vez mais tarde.'
        );
      }
      const data = await response.json();
      //console.log(data);

      // transformando data recebido (objeto) em array
      let arrayData = [];
      for (const key in data) {
        arrayData.push(
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

      // dispachando para redux
      dispatch({
        type: SET_PRODUCTS,
        payload: arrayData,
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
    const response = await fetch(`${BASE_URL}/products/${productId}.json`, {
      method: 'DELETE',
    });

    if (!response.ok)
      throw new Error(
        'Algo deu errado na requisição! Tente outra vez mais tarde.'
      );

    dispatch({
      type: DELETE_USER_PRODUCT,
      payload: productId,
    });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    // Usando fetch para conectar com API
    const response = await fetch(`${BASE_URL}/products.json`, {
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
    });

    if (!response.ok)
      throw new Error(
        'Algo deu errado na requisição! Tente outra vez mais tarde.'
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
    const response = await fetch(`${BASE_URL}/products/${id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
      }),
    });

    if (!response.ok)
      throw new Error(
        'Algo deu errado na requisição! Tente outra vez mais tarde.'
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
