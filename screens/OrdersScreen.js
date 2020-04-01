import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import { useSelector } from "react-redux";
import OrderItem from "../components/shop/OrderItem";

const OrdersScreen = props => {
  const orders = useSelector(state => state.orders.orders);

  if (orders.length === 0) {
    return (
      <View style={styles.screen}>
        <Text style={{ fontFamily: "standard-apple" }}>
          Unfold my bag here 🛍
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      contentContainerStyle={{ flexGrow: 1 }}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <OrderItem
          amount={itemData.item.orderAmount}
          date={itemData.item.readableDate}
          items={itemData.item.orderItems}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  orderItem: {},
  screen: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    flex: 1
  }
});

OrdersScreen.navigationOptions = {
  headerTitle: "Your Orders"
};

export default OrdersScreen;
