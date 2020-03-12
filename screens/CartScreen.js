import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";
import Colors from "../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/shop/CartItem";

import * as cartActions from "../store/actions/cart";
import * as orderActions from "../store/actions/orders";

import DefaultText from "../components/UI/DefaultText";

const CartScreen = props => {
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
        onPress={() => {
          dispatch(orderActions.addOrder(cartItem, cartTotalAmt));
        }}
      >
        <View style={styles.submitOrderBtn}>
          <DefaultText style={styles.submitOrderText}>Submit</DefaultText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 0
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
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowOpacity: 0.6,
    elevation: 70,
    shadowRadius: 0
  },
  submitOrderBtn: {
    width: 125,
    height: 50,
    padding: 10,
    backgroundColor: Colors.primaryColor,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
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
