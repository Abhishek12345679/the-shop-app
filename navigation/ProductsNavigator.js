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
        },
        headerTitleStyle: {
            fontFamily: 'russo',
            fontSize: 20
        }
    }
});

export default createAppContainer(ProductsNavigator);