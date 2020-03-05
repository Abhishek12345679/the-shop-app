import { createStackNavigator } from "react-navigation-stack";
import ProductsOverviewScreen from "../screens/ProductOverviewScreen";
import Colors from "../constants/Colors";
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";

const ProductsNavigator = createStackNavigator({
    products_overview: ProductsOverviewScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.primaryColor : ""
        }
    }
});

export default createAppContainer(ProductsNavigator);