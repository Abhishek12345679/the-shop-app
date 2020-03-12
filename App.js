import React, { useState } from "react";
import * as Font from "expo-font";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

import productsReducer from "./store/reducers/products";
import ProductsNavigator from "./navigation/ProductsNavigator";
import cartReducer from "./store/reducers/cart";
import ordersReducer from './store/reducers/orders'

import { AppLoading } from "expo";

export default function App() {
  const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer
  });

  const store = createStore(rootReducer);

  const [dataLoaded, setDataLoaded] = useState(false);

  const fetchFonts = () => {
    Font.loadAsync({
      russo: require("./assets/fonts/RussoOne-Regular.ttf"),
      "source-code": require("./assets/fonts/SourceCodePro-Regular.ttf"),
      "source-code-bold": require("./assets/fonts/SourceCodePro-Bold.ttf"),
      "standard-apple": require("./assets/fonts/SF-Pro-Text-Regular.ttf"),
      "standard-apple-bold": require("./assets/fonts/SF-Pro-Display-Bold.ttf")
    });
  };

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={err => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <ProductsNavigator />
    </Provider>
  );
}
