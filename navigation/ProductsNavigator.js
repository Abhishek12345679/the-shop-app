import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

import ProductsOverviewScreen from "../screens/ProductOverviewScreen";
import ProductsDetailScreen from "../screens/ProductDetailScreen";
import CartScreen from "../screens/CartScreen";
import OrdersScreen from "../screens/OrdersScreen";
import UserProductsScreen from "../screens/UserProductsScreen";

import Colors from "../constants/Colors";
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";

const defaultStackNavigationOptions = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "white"
        },
        headerTitleStyle: {
            fontFamily: "standard-apple-bold",
            fontSize: 20
        },
        headerTintColor: Platform.OS === "ios" ? Colors.primaryColor : "white",
        headerBackTitle: 'Back'
    }
};

const ProductsNavigator = createStackNavigator({
        products_overview: ProductsOverviewScreen,
        productsDetail: ProductsDetailScreen,
        cartScreen: CartScreen
    },
    defaultStackNavigationOptions
);

const OrdersNavigator = createStackNavigator({
        ordersScreen: OrdersScreen
    },
    defaultStackNavigationOptions
);

const UserProductsNavigator = createStackNavigator({
        UserProductsScreen: {
            screen: UserProductsScreen
        },
        ProductDetailsScreen: {
            screen: ProductsDetailScreen
        }
    },
    defaultStackNavigationOptions
);

const TopTabNavigator = createMaterialTopTabNavigator({
    products: {
        screen: ProductsNavigator,
        navigationOptions: {
            tabBarLabel: "Products"
        }
    },
    orders: {
        screen: OrdersNavigator,
        navigationOptions: {
            tabBarLabel: "Orders"
        }
    },
    userProducts: {
        screen: UserProductsNavigator,
        navigationOptions: {
            tabBarLabel: " Your Listings"
        }
    }
});

export default createAppContainer(TopTabNavigator);