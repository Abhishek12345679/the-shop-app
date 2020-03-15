import { PRODUCTS } from "../../data/dummy_data";
import { DELETE_USER_PRODUCT } from "../actions/product";

const initialState = {
  products: PRODUCTS,
  userProducts: PRODUCTS.filter(
    prod => prod.ownerId === "u1" || prod.ownerId === "u3"
  )
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_USER_PRODUCT:
      const selectedUserProduct = state.userProducts.find(
        userProduct => userProduct.id === action.ownerId
      );
      const updatedList = [...state.userProducts];
      updatedList.splice(selectedUserProduct, 1);

      const selectedProduct = state.products.find(
        product => product.id === action.id
      );
      const updatedUserProductList = [...state.userProducts];
      const updatedProductList = [...state.products];
      updatedUserProductList.splice(selectedUserProduct, 1);
      updatedProductList.splice(selectedProduct, 1);
      return {
        ...state,
        products: updatedProductList,
        userProducts: updatedList
      };
    default:
      return state;
  }
};

export default productsReducer;
