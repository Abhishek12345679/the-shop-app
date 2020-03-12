import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import CartItem from "./CartItem";

const OrderItem = props => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        setIsExpanded(prevState => !prevState);
      }}
    >
      <View style={styles.orderItem}>
        <View style={styles.summary}>
          <Text style={styles.amount}>₹ {props.amount.toFixed(2)}</Text>
          <Text style={styles.date}>{props.date}</Text>
        </View>
        {isExpanded && (
          <View>
            {props.items.map(cartItem => (
              <CartItem
                key={cartItem.productId}
                quantity={cartItem.quantity}
                productSum={cartItem.sum}
                productTitle={cartItem.productTitle}
                productImage={cartItem.imageUrl}
              />
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    backgroundColor: "white",
    height: 100,
    shadowOffset: {
      width: 2,
      height: 4
    },
    shadowOpacity: 0.35,
    elevation: 7,
    shadowRadius: 8,
    borderRadius: 10,
    shadowColor: "black",
    marginHorizontal: 15,
    marginVertical: 7
  },
  summary: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    marginTop: 5
  },
  amount: {
    color: "#000",
    fontFamily: "standard-apple-bold",
    fontSize: 20
  },
  date: {
    color: "#000",
    fontFamily: "standard-apple",
    fontSize: 13
  }
});

export default OrderItem;
