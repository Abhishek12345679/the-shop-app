import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Button,
  TouchableOpacity
} from "react-native";
import Colors from "../constants/Colors";
import { useSelector } from "react-redux";

const CartScreen = props => {
  const cartTotalAmt = useSelector(state => state.cart.sum);
  const cartItem = useSelector(state => state.cart.items);

  return (
    <View style={styles.screen}>
      <View style={styles.Row}>
        <View style={styles.titleTextContainer}>
          <Text style={styles.titleText}>Items</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            console.log(cartItem);
          }}
        >
          <View style={styles.productPriceContainer}>
            <Text style={{ color: "#fff" }}>{cartTotalAmt}</Text>
          </View>
        </TouchableOpacity>
      </View>
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
