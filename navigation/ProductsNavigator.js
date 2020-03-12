import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator, createBottomTabNavigator } from "react-navigation-tabs";

import ProductsOverviewScreen from "../screens/ProductOverviewScreen";
import ProductsDetailScreen from "../screens/ProductDetailScreen";
import CartScreen from "../screens/CartScreen";
import OrdersScreen from "../screens/OrdersScreen";

import Colors from "../constants/Colors";
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";

const defaultStackNavigationOptions = navData => {
    return {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === "android" ? Colors.primaryColor : ""
            },
            headerTitleStyle: {
                fontFamily: "russo",
                fontSize: 17
            },
            headerTintColor: Platform.OS === "ios" ? Colors.primaryColor : ""
        }
    };
};

const ProductsNavigator = createStackNavigator({
        products_overview: ProductsOverviewScreen,
        productsDetail: ProductsDetailScreen,
        cartScreen: CartScreen
    },
    defaultStackNavigationOptions
);

const OrdersNaviagtor = createStackNavigator({
    ordersScreen: {
        screen: OrdersScreen
    },
    defaultStackNavigationOptions
});

const BottomTabNavigator = createMaterialTopTabNavigator({
    products: {
        screen: ProductsNavigator,
        navigationOptions: {
            tabBarLabel: "Products"
        }
    },
    orders: {
        screen: OrdersNaviagtor,
        navigationOptions: {
            tabBarLabel: "Orders"
        }
    }
});

export default createAppContainer(BottomTabNavigator);