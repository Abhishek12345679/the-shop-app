import React from "react";

import ProductsOverviewScreen, {
  screenOptions as ProductsOverviewScreenOptions,
} from "../screens/ProductOverviewScreen";
import ProductsDetailScreen, {
  screenOptions as ProductsDetailScreenOptions,
} from "../screens/ProductDetailScreen";
import CartScreen, {
  screenOptions as CartScreenOptions,
} from "../screens/CartScreen";
import OrdersScreen from "../screens/OrdersScreen";
import UserProductsScreen, {
  screenOptions as UserProductsScreenOptions,
} from "../screens/UserProductsScreen";
import EditUserProductsScreen from "../screens/EditUserProductsScreen";
import SettingsScreen, {
  screenOptions as SettingsScreenOptions,
} from "../screens/SettingsScreen";
import AuthScreen from "../screens/AuthScreen";

import Colors from "../constants/Colors";
import { Platform } from "react-native";

import { enableScreens } from "react-native-screens";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";

enableScreens();

const modalNavOptions = {
  mode: "none",
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
};

// default stack options
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

// default bottomtab options
const defaultBottomTabNavigationOptions = {
  defaultNavigationOptions: {
    tabBarOptions: {
      activeTintColor: Colors.primaryColor,
      style: { backgroundColor: "#ffffff", height: 57 },
      inactiveTintColor: "#000",
    },
  },
};

// products stack

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator
      screenOptions={defaultStackNavigationOptions}
    >
      <ProductsStackNavigator.Screen
        name="products_overview"
        component={ProductsOverviewScreen}
        options={ProductsOverviewScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="productsDetail"
        component={ProductsDetailScreen}
        options={ProductsDetailScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="cartScreen"
        component={CartScreen}
        options={CartScreenOptions}
      />
    </ProductsStackNavigator.Navigator>
  );
};

const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator
      screenOptions={defaultStackNavigationOptions}
    >
      <OrdersStackNavigator.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={{ headerTitle: "Orders" }}
      />
    </OrdersStackNavigator.Navigator>
  );
};

const SettingsStackNavigator = createStackNavigator();

export const SettingsNavigator = () => {
  return (
    <SettingsStackNavigator.Navigator
      screenOptions={defaultStackNavigationOptions}
    >
      <SettingsStackNavigator.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={SettingsScreenOptions}
      />
    </SettingsStackNavigator.Navigator>
  );
};
const AuthStackNavigator = createStackNavigator();
export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultStackNavigationOptions}>
      <AuthStackNavigator.Screen name="AuthScreen" component={AuthScreen} 
      />
    </AuthStackNavigator.Navigator>
  );
};
const AdminScreenStackNavigator = createStackNavigator();

export const AdminScreenNavigator = () => {
  return (
    <AdminScreenStackNavigator.Navigator
      screenOptions={{
        ...defaultStackNavigationOptions,
        modalNavOptions,
      }}
    >
      <AdminScreenStackNavigator.Screen
        name="UserProductsScreen"
        component={UserProductsScreen}
        options={UserProductsScreenOptions}
      />
      <AdminScreenStackNavigator.Screen
        name="EditUserProductsScreen"
        component={EditUserProductsScreen}
      />
    </AdminScreenStackNavigator.Navigator>
  );
};

const BottomTabNavigator = createBottomTabNavigator();

export const ShopNavigator = () => {
  return (
    <BottomTabNavigator.Navigator
      screenOptions={defaultBottomTabNavigationOptions}
    >
      <BottomTabNavigator.Screen
        name="products"
        component={ProductsNavigator}
        options={{
          tabBarLabel: "Products",
          tabBarIcon: () => (
            <AntDesign name="home" size={25} color={Colors.primaryColor} />
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="orders"
        component={OrdersNavigator}
        options={{
          tabBarLabel: "Orders",
          tabBarIcon: () => (
            <AntDesign name="skin" size={25} color={Colors.primaryColor} />
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="userProducts"
        component={AdminScreenNavigator}
        options={{
          tabBarLabel: "Products",
          tabBarIcon: () => (
            <AntDesign name="database" size={25} color={Colors.primaryColor} />
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          tabBarLabel: "Products",
          tabBarIcon: () => (
            <AntDesign name="setting" size={25} color={Colors.primaryColor} />
          ),
        }}
      />
    </BottomTabNavigator.Navigator>
  );
};
