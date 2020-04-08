import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createSwitchNavigator } from "react-navigation";

import ProductsOverviewScreen from "../screens/ProductOverviewScreen";
import ProductsDetailScreen from "../screens/ProductDetailScreen";
import CartScreen from "../screens/CartScreen";
import OrdersScreen from "../screens/OrdersScreen";
import UserProductsScreen from "../screens/UserProductsScreen";
import EditUserProductsScreen from "../screens/EditUserProductsScreen";
import AuthScreen from "../screens/AuthScreen";
import SplashScreen from "../screens/SplashScreen";
import SettingsScreen from "../screens/SettingsScreen";

import Colors from "../constants/Colors";
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { enableScreens } from "react-native-screens";

import { AntDesign } from "@expo/vector-icons";

enableScreens();

const defaultStackNavigationOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor:
        Platform.OS === "android" ? Colors.primaryColor : "white",
      shadowColor: "transparent",
      shadowOpacity: 0,
      shadowOffset: {
        height: 0,
        width: 0,
      },
      shadowRadius: 0,
    },
    headerTitleStyle: {
      fontFamily: "standard-apple-bold",
      fontSize: 20,
    },
    headerTintColor: Platform.OS === "ios" ? Colors.primaryColor : "white",
    headerBackTitle: "Back",
  },
};

const defaultBottomTabNavigationOptions = {
  defaultNavigationOptions: {
    tabBarOptions: {
      activeTintColor: Colors.primaryColor,
      style: { backgroundColor: "#ffffff", height: 57 },
      inactiveTintColor: "#000",
    },
  },
};

const ProductsNavigator = createStackNavigator(
  {
    products_overview: ProductsOverviewScreen,
    productsDetail: ProductsDetailScreen,
    cartScreen: CartScreen,
  },
  defaultStackNavigationOptions
);

const OrdersNavigator = createStackNavigator(
  {
    ordersScreen: OrdersScreen,
  },
  defaultStackNavigationOptions
);

const UserProductsNavigator = createStackNavigator(
  {
    UserProductsScreen: {
      screen: UserProductsScreen,
    },
  },
  defaultStackNavigationOptions
);

const SettingsNavigator = createStackNavigator(
  {
    SettingsScreen: {
      screen: SettingsScreen,
    },
  },
  defaultStackNavigationOptions
);

// partial modal
const UserProductsModalNavigator = createStackNavigator(
  {
    UserProductsScreen: {
      screen: UserProductsNavigator,
    },
    Modal: {
      screen: EditUserProductsScreen,
    },
  },
  {
    mode: "modal", // Remember to set the root navigator to display modally.
    headerMode: "none", // This ensures we don't get two top bars.,
    transparentCard: true,
    defaultNavigationOptions: {
      navigationOptions: {
        cardStyle: {
          backgroundColor: "transparent",
          opacity: 1,
        },
        transitionConfig: () => ({
          containerStyle: {
            backgroundColor: "transparent",
          },
        }),
      },
    },
  },
  defaultStackNavigationOptions
);

const BottomTabNavigator = createBottomTabNavigator(
  {
    products: {
      screen: ProductsNavigator,
      navigationOptions: {
        tabBarLabel: "Products",
        tabBarIcon: (
          <AntDesign name="home" size={25} color={Colors.primaryColor} />
        ),
      },
    },
    orders: {
      screen: OrdersNavigator,
      navigationOptions: {
        tabBarLabel: "Orders",
        tabBarIcon: (
          <AntDesign name="skin" size={25} color={Colors.primaryColor} />
        ),
      },
    },
    userProducts: {
      screen: UserProductsModalNavigator,
      navigationOptions: {
        tabBarLabel: "Your Listings",
        tabBarIcon: (
          <AntDesign name="database" size={25} color={Colors.primaryColor} />
        ),
      },
    },
    Settings: {
      screen: SettingsNavigator,
      navigationOptions: {
        tabBarLabel: "Settings",
        tabBarIcon: (
          <AntDesign name="setting" size={25} color={Colors.primaryColor} />
        ),
      },
    },
  },
  defaultBottomTabNavigationOptions
);

const AuthAdjustMainNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  Auth: AuthScreen,
  Shop: BottomTabNavigator,
});

export default createAppContainer(AuthAdjustMainNavigator);
