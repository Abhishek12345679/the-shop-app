import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

import ProductsOverviewScreen from "../screens/ProductOverviewScreen";
import ProductsDetailScreen from "../screens/ProductDetailScreen";
import CartScreen from "../screens/CartScreen";
import OrdersScreen from "../screens/OrdersScreen";
import UserProductsScreen from "../screens/UserProductsScreen";
import EditUserProductsScreen from "../screens/EditUserProductsScreen";

import Colors from "../constants/Colors";
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";

const defaultStackNavigationOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor:
        Platform.OS === "android" ? Colors.primaryColor : "white",
      shadowColor: "transparent",
      shadowOpacity: 0,
      shadowOffset: {
        height: 0,
        width: 0
      },
      shadowRadius: 0
    },
    headerTitleStyle: {
      fontFamily: "standard-apple-bold",
      fontSize: 20
    },
    headerTintColor: Platform.OS === "ios" ? Colors.primaryColor : "white",
    headerBackTitle: "Back"
  }
};

const defaultBottomTabNavigationOptions = {
  defaultNavigationOptions: {
    tabBarOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: { fontSize: 12 },
      style: { backgroundColor: "#044F67" },
      inactiveTintColor: "#fff"
    }
  }
};

const ProductsNavigator = createStackNavigator(
  {
    products_overview: ProductsOverviewScreen,
    productsDetail: ProductsDetailScreen,
    cartScreen: CartScreen
  },
  // {
  //   headerMode: "none"
  // },
  defaultStackNavigationOptions
);

const OrdersNavigator = createStackNavigator(
  {
    ordersScreen: OrdersScreen
  },
  // {
  //   headerMode: "none"
  // },
  defaultStackNavigationOptions
);

const UserProductsNavigator = createStackNavigator(
  {
    UserProductsScreen: {
      screen: UserProductsScreen
    }
  },
  // {
  //   headerMode: "none"
  // },
  defaultStackNavigationOptions
);

const UserProductsModalNavigator = createStackNavigator(
  {
    UserProductsScreen: {
      screen: UserProductsNavigator
    },
    Modal: {
      screen: EditUserProductsScreen
    }
  },
  {
    mode: "modal", // Remember to set the root navigator to display modally.
    headerMode: "none", // This ensures we don't get two top bars.,
    transparentCard: true,
    defaultNavigationOptions: {
      navigationOptions: {
        cardStyle: {
          backgroundColor: "transparent"
        }
      }
    }
  },
  defaultStackNavigationOptions
);

const TopTabNavigator = createMaterialTopTabNavigator(
  {
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
      screen: UserProductsModalNavigator,
      navigationOptions: {
        tabBarLabel: " Your Listings"
      }
    }
  },
  defaultBottomTabNavigationOptions
);

const MainNavigator = createStackNavigator({
  Main: {
    screen: TopTabNavigator,
    navigationOptions: {
      headerTitle: "ShopShopInc",
      headerStyle: {
        backgroundColor: "#044F67"
      },
      headerTintColor: "#fff"
    }
  }
});

export default createAppContainer(MainNavigator);
