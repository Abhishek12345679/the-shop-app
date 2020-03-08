import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import cartItem from "../../models/cart-item";

const initialState = {
  items: {},
  sum: 0
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // action.product finally has the value of itemData.item in the flatlist
      const addedProduct = action.product;
      const productTitle = addedProduct.title;
      const productPrice = addedProduct.price;
      const productImageUrl = addedProduct.imageUrl;

      let newOrUpdatedCartItem;

      /* addedproduct, since it gets itemData.item ,
            therefore addedProduct.id is nothing but itemData.item.id */
      if (state.items[addedProduct.id]) {
        //this is how you normally instantiate an object in oop
        newOrUpdatedCartItem = new cartItem(
          /* obj['property_name'] = 'some_value';
            This is how to dynamically add properties(like arrays,etc) to an object in 
            Vanilla JS*/
          state.items[addedProduct.id].quantity + 1,
          productTitle,
          productPrice,
          state.items[addedProduct.id].sum + productPrice,
          productImageUrl
        );
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: newOrUpdatedCartItem },
          sum: state.sum + productPrice
        };
      } else {
        newOrUpdatedCartItem = new cartItem(
          1,
          productTitle,
          productPrice,
          productPrice,
          productImageUrl
        );
        return {
          ...state,
          //here we are dynamically adding to the object
          items: { ...state.items, [addedProduct.id]: newOrUpdatedCartItem },
          sum: state.sum + productPrice
        };
      }

    case REMOVE_FROM_CART:

      const selectedCartItem = state.items[action.pid];
      let currentQuantity = selectedCartItem.quantity;
      let updatedCartItems;

      if (currentQuantity > 1) {
        // reduce not erase
        const updatedCartItem = new cartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productTitle,
          selectedCartItem.productPrice,
          selectedCartItem.sum - selectedCartItem.productPrice,
          selectedCartItem.imageUrl
        );

        updatedCartItems = {...state.items, [action.pid]:updatedCartItem}

      } else {
        //erase
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid];
      }

      return {
          ...state,
          items:updatedCartItems,
          sum: state.sum - selectedCartItem.productPrice 
      }

    default:
      return state;
  }
};

export default cartReducer;
