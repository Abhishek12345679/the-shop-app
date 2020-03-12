import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

import { useSelector } from "react-redux";
import OrderItem from "../components/shop/OrderItem";

const OrdersScreen = props => {
  const orders = useSelector(state => state.orders.orders);

  return (
    <FlatList
      data={orders}
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
  orderItem: {}
});

OrdersScreen.navigationOptions = {
  headerTitle: "Your Orders"
};

export default OrdersScreen;
