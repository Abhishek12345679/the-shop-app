import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  StatusBar,
} from "react-native";
import { Snackbar } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "react-native-elements";

import Product from "../components/shop/Product";
import * as cartActions from "../store/actions/cart";
import * as productActions from "../store/actions/product";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import Colors from "../constants/Colors";

const ProductOverviewScreen = (props) => {
  const availableProducts = useSelector((state) => state.products.products);
  const auth = useSelector((state) => state.auth.email);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [loginSnackIsVisible, setLoginSnackIsVisible] = useState(false);

  const loadProducts = useCallback(async () => {
    console.log("LOAD");
    setError(null);
    setIsRefreshing(true);

    try {
      await dispatch(productActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [setError, dispatch]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadProducts
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => setIsLoading(false));
  }, [dispatch, loadProducts, setIsLoading]);

  useEffect(() => {
    setLoginSnackIsVisible(true);
  }, []);

  const renderProductItem = (itemData) => {
    const selectProductHandler = () => {
      props.navigation.navigate({
        routeName: "productsDetail",
        params: {
          productId: itemData.item.id,
          productTitle: itemData.item.title,
        },
      });
    };

    return (
      <View style={{ marginHorizontal: 15 }}>
        <Product
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelectProduct={selectProductHandler}
          productId={itemData.item.id}
          item={itemData.item}
        >
          <View>
            <TouchableOpacity
              onPress={() => {
                dispatch(cartActions.addToCart(itemData.item));
                setIsVisible(true);
              }}
            >
              <Icon
                reverse
                name="ios-cart"
                type="ionicon"
                size={18}
                containerStyle={{ marginBottom: 5 }}
                color={Colors.primaryColor}
              />
            </TouchableOpacity>
          </View>
        </Product>
      </View>
    );
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <View style={styles.errText}>
          <Text>{error}</Text>
        </View>
        <Button title="reload" onPress={loadProducts} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  if (!isLoading && availableProducts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>The Bag is Empty 🎒</Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        onRefresh={loadProducts}
        refreshing={isRefreshing}
        key={availableProducts.id}
        data={availableProducts}
        renderItem={renderProductItem}
        contentContainerStyle={{ flexGrow: 1 }}
      />
      <Snackbar
        visible={isVisible}
        onDismiss={() => setIsVisible(false)}
        duration={2000}
        action={{
          label: "UNDO",
          onPress: () => {},
        }}
        style={{ backgroundColor: Colors.primaryColor, height: 50 }}
      >
        Added to cart 🎒
      </Snackbar>
      <Snackbar
        visible={loginSnackIsVisible}
        onDismiss={() => setLoginSnackIsVisible(false)}
        duration={1000}
        action={{
          label: "UNDO",
          onPress: () => {},
        }}
        style={{ backgroundColor: Colors.primaryColor, height: 50 }}
      >
        Logged in as
        <Text> </Text>
        {auth}
      </Snackbar>
    </View>
  );
};

ProductOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Products",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="cart"
          iconName={"shoppingcart"}
          onPress={() => {
            navData.navigation.navigate("cartScreen");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
  },
  errText: {
    color: Colors.primaryColor,
    fontWeight: "bold",
  },
});

export default ProductOverviewScreen;
