import CartItem from '../../models/cart-item';
import { ADD_TO_CART, REMOVE_ITEM } from '../actions/cart';
import { NEW_ORDER } from '../actions/order';

const INITIAL_STATE = {
  items: {},
  totalAmount: 0,
};

// Adicionar no carrinho:
// 1. Puxando valores do payload (price, title, id)
// 2. Verificando se o item já está no carrinho pelo id. items[tempProduct.id] === items.idGerada || items.p1 .. p2 ..
// 3. Primeira condição (if): SE existe o item no carrinho, é preciso então aumentar a quantidade
// 4. Segunda condição (else): SE não existe o item no carrinho, é preciso criar um novo CartItem
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, price, title } = action.payload;

      const itemExisted = !!state.items[id];
      // definindo quantidade: primeiro caso se o item existe (itemExisted) no objeto, segundo caso se não existir
      const quantity = itemExisted ? state.items[id].quantity + 1 : 1;
      // definindo preço total do item: primeiro caso se o item já existe lá irá ser somado, segundo caso irá colocar o preço de 1
      const sum = itemExisted ? state.items[id].sum + price : price;
      // Criando item de acordo com as condições
      const item = new CartItem(quantity, price, title, sum);
      return {
        ...state,
        items: { ...state.items, [id]: item },
        totalAmount: state.totalAmount + price,
      };
    case REMOVE_ITEM:
      // Pegando quantidade, id do item no carrinho. Pegando item do carrinho
      const selectedItem = state.items[action.payload];
      const currentQuantity = selectedItem.quantity;
      let updatedCart;

      if (currentQuantity > 1) {
        // Precisa diminuir quantidade, não deletar do carrinho
        const updatedCartItem = new CartItem(
          currentQuantity - 1,
          selectedItem.productPrice,
          selectedItem.productTitle,
          selectedItem.sum - selectedItem.productPrice
        );
        updatedCart = { ...state.items, [action.payload]: updatedCartItem };
      } else {
        // Precisa deletar do carrinho pelo productId
        updatedCart = { ...state.items };
        delete updatedCart[action.payload];
      }
      return {
        ...state,
        items: updatedCart,
        totalAmount: Math.abs(state.totalAmount - selectedItem.productPrice),
      };
    case NEW_ORDER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
