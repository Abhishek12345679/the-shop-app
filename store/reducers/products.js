import { PRODUCTS } from "../../data/dummy_data";
import { DELETE_USER_PRODUCT, UPDATE_PRODUCT } from "../actions/product";
import Product from "../../models/product";

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

    case UPDATE_PRODUCT:
      const updatedProductsList = [...state.products];
      const productIndex = updatedProductsList.findIndex(
        prod => prod.id === action.id
      );
      const updatedProduct = Product(
        new Date().toString,
        state.products[productIndex].ownerId,
        action.imageUrl,
        action.title,
        action.description,
        action.price
      );

      updatedProductsList[productIndex] = updatedProduct;

      return {
        ...state,
        products: updatedProductList
      };
    default:
      return state;
  }
};

export default productsReducer;
