import { createStackNavigator } from "react-navigation-stack";

import ProductsOverviewScreen from "../screens/ProductOverviewScreen";
import ProductsDetailScreen from "../screens/ProductDetailScreen";
import CartScreen from '../screens/CartScreen'

import Colors from "../constants/Colors";
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";

const ProductsNavigator = createStackNavigator({
    products_overview: ProductsOverviewScreen,
    productsDetail: ProductsDetailScreen,
    cartScreen: CartScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.primaryColor : ""
        },
        headerTitleStyle: {
            fontFamily: 'russo',
            fontSize: 17
        },
        headerTintColor: Platform.OS === 'ios' ? Colors.primaryColor : ''
    }
});

export default createAppContainer(ProductsNavigator);