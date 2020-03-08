import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Colors from "../constants/Colors";
import { useSelector } from "react-redux";
import CartItem from "../components/shop/CartItem";

import { useDispatch } from "react-redux";
import * as cartActions from "../store/actions/cart";

const CartScreen = props => {
  const dispatch = useDispatch();

  const cartTotalAmt = useSelector(state => state.cart.sum);
  const cartItem = useSelector(state => {
    const transformedCartItems = [];
    for (let key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        totalSum: state.cart.items[key].sum,
        productImageUrl: state.cart.items[key].imageUrl
      });
    }
    return transformedCartItems;
  });

  return (
    <View style={styles.screen}>
      <View style={styles.Row}>
        <View style={styles.titleTextContainer}>
          <Text style={styles.titleText}>Items</Text>
        </View>

        <View style={styles.productPriceContainer}>
          <Text style={{ color: "#fff" }}>{cartTotalAmt}</Text>
        </View>
      </View>
      <FlatList
        keyExtractor={item => item.productId}
        data={cartItem}
        renderItem={itemData => (
          <CartItem
            productTitle={itemData.item.productTitle}
            productPrice={itemData.item.productPrice}
            productSum={itemData.item.totalSum}
            quantity={itemData.item.quantity}
            productImage={itemData.item.productImageUrl}
            productId={itemData.item.productId}
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 20,
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
    height: 70
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
  }
});

CartScreen.navigationOptions = {
  headerTitle: "Your Cart"
};

export default CartScreen;
