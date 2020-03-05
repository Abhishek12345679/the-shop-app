import React from "react";
import ProductsNavigator from "./navigation/ProductsNavigator";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import productsReducer from "./store/reducers/products";

export default function App() {
  const rootReducer = combineReducers({
    products: productsReducer
  });

  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <ProductsNavigator />
    </Provider>
  );
}
