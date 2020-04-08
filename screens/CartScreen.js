import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Snackbar } from "react-native-paper";
import Colors from "../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/shop/CartItem";

import * as cartActions from "../store/actions/cart";
import * as orderActions from "../store/actions/orders";

import DefaultText from "../components/UI/DefaultText";
import { useState } from "react";

const CartScreen = props => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const cartTotalAmt = useSelector(state => state.cart.sum);

  const cartItem = useSelector(state => {
    const transformedCartItems = [];

    // for in loop
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
        imageUrl: state.cart.items[key].imageUrl
      });
    }
    return transformedCartItems.sort((a, b) => {
      a.productId > b.productId ? 1 : -1;
    });
  });

  return (
    <View style={styles.screen}>
      <View style={styles.Row}>
        <View style={styles.titleTextContainer}>
          <Text style={styles.titleText}>Items</Text>
        </View>

        <View style={styles.productPriceContainer}>
          <Text style={{ color: "#fff" }}>{cartTotalAmt.toFixed(2)}</Text>
        </View>
      </View>
      <FlatList
        keyExtractor={item => item.productId}
        contentContainerStyle={{ flexGrow: 1 }}
        data={cartItem}
        renderItem={itemData => (
          <CartItem
            isDeleteable
            productTitle={itemData.item.productTitle}
            productPrice={itemData.item.productPrice}
            productSum={itemData.item.sum}
            quantity={itemData.item.quantity}
            productImage={itemData.item.imageUrl}
            productId={itemData.item.productId}
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
      <TouchableOpacity
        style={{ alignItems: "center" }}
        disabled={cartItem.length === 0}
        onPress={async () => {
          setIsLoading(true);
          await dispatch(orderActions.addOrder(cartItem, cartTotalAmt));
          setIsLoading(false);
          setIsVisible(true);
        }}
      >
        <View style={styles.submitOrderBtn}>
          {!isLoading && (
            <DefaultText style={styles.submitOrderText}>Submit</DefaultText>
          )}
          {isLoading && <ActivityIndicator size="small" color="#fff" />}
        </View>
      </TouchableOpacity>
      <Snackbar
        visible={isVisible}
        onDismiss={() => setIsVisible(false)}
        duration={2000}
        action={{
          label: "UNDO",
          onPress: () => {}
        }}
        style={{ backgroundColor: Colors.primaryColor, height: 50 }}
      >
        Items Ordered
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 0,
    backgroundColor:"#fff"
  },
  titleText: {
    fontFamily: "standard-apple-bold",
    fontSize: 40,
    marginStart: 10
  },
  Row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 70,
    paddingHorizontal: 20
  },
  productPriceContainer: {
    backgroundColor: Colors.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 40,
    padding: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 2
    },
    shadowOpacity: 0.6,
    elevation: 70,
  },
  submitOrderBtn: {
    width: '98%',
    height: 65,
    padding: 10,
    backgroundColor: Colors.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    marginBottom:10
  },
  submitOrderText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "standard-apple-bold"
  }
});

CartScreen.navigationOptions = {
  headerTitle: "Your Cart"
};

export default CartScreen;
