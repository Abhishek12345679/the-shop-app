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
          <View style={styles.detailItems}>
            {props.items.map(cartItem => (
              <CartItem
                style={styles.expanded}
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
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
    padding: 10,
    alignItems: "center"
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15
  },
  totalAmount: {
    fontFamily: "standard-apple-bold",
    fontSize: 16
  },
  date: {
    fontSize: 16,
    fontFamily: "standard-apple",
    color: "#888"
  },
  detailItems: {
    width: "100%"
  },
  expanded: {
    backgroundColor: "#fff",
    marginVertical: 8,
    borderRadius: 0,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0,
    elevation: 0,
    shadowRadius: 0,
    marginHorizontal: 20,
    justifyContent:'flex-start',
    alignItems:'flex-end'
  }
});

export default OrderItem;
