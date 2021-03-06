// import { PRODUCTS } from "../../data/dummy_data";
import {
  DELETE_USER_PRODUCT,
  UPDATE_PRODUCT,
  CREATE_PRODUCT,
  SET_PRODUCTS
} from "../actions/product";
import Product from "../../models/product";

const initialState = {
  products: [],
  userProducts: []
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_USER_PRODUCT:
      const selectedUserProduct = state.userProducts.findIndex(
        userProduct => userProduct.id === action.ownerId
      );
      const updatedList = [...state.userProducts];
      updatedList.splice(selectedUserProduct, 1);

      const selectedProduct = state.products.findIndex(
        product => product.id === action.ownerId
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
      const productIndex = state.userProducts.findIndex(
        prod => prod.id === action.pid
      );
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;
      const availableProductIndex = state.products.findIndex(
        prod => prod.id === action.pid
      );
      const updatedAvailableProducts = [...state.products];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;
      return {
        ...state,
        products: updatedAvailableProducts,
        userProducts: updatedUserProducts
      };
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        action.productData.ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );

      return {
        ...state,
        products: state.products.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct)
      };
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.products,
        userProducts: action.userProducts
      };
    default:
      return state;
  }
};

export default productsReducer;
