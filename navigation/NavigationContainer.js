import React from "react";

import { ShopNavigator } from "./ProductsNavigator";

import SplashScreen from "../screens/SplashScreen";
import { AuthNavigator } from "./ProductsNavigator";
import { NavigationContainer } from "@react-navigation/native";

import { useSelector } from "react-redux";

const AppContainer = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const didTryAutoLogin = useSelector((state) => !!state.auth.didTryAutoLogin);
  return (
    <NavigationContainer>
      {isAuth && <ShopNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <SplashScreen />}
    </NavigationContainer>
  );
};

export default AppContainer;
