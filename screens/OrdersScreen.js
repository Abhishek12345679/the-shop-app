import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import { useDispatch } from "react-redux";
import * as ordersActions from "../store/actions/orders";

import { useSelector } from "react-redux";
import OrderItem from "../components/shop/OrderItem";

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ordersActions.getOrder());
  }, [dispatch]);

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
    <View style={styles.main}>
      <FlatList
        data={orders}
        contentContainerStyle={{ flexGrow: 1 }}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <OrderItem
            amount={itemData.item.orderAmount}
            date={itemData.item.readableDate}
            items={itemData.item.orderItems}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#fff",
    flex:1
  },
  screen: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    flex: 1,
    backgroundColor:'#fff'
  },
});

OrdersScreen.navigationOptions = {
  headerTitle: "Your Orders",
};

export default OrdersScreen;
