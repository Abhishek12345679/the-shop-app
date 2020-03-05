import { createStackNavigator } from "react-navigation-stack";
import ProductsOverviewScreen from "../screens/ProductOverviewScreen";
import ProductsDetailScreen from "../screens/ProductDetailScreen";
import Colors from "../constants/Colors";
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";

const ProductsNavigator = createStackNavigator({
    products_overview: ProductsOverviewScreen,
    productsDetail: ProductsDetailScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.primaryColor : ""
        }
    }
});

export default createAppContainer(ProductsNavigator);