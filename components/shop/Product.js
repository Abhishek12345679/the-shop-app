import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

import Card from "../UI/Card";

import { useDispatch } from "react-redux";
import * as cartActions from "../../store/actions/cart";

const Product = props => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={props.onSelectProduct}
      style={styles.listContainer}
      activeOpacity={0.7}
    >
      <Card style={styles.productItem}>
        <View style={styles.header}>
          <Image source={{ uri: props.image }} style={styles.image} />
        </View>
        <View style={styles.footer}>
          <View style={styles.titlePriceColumn}>
            <Text>{props.title}</Text>
            <Text style={{ color: "green", fontWeight: "bold" }}>
              ₹{props.price}
            </Text>
          </View>
          <View styles={styles.addToCartIcon}>
            <Icon
              raised
              name="ios-cart"
              type="ionicon"
              size={18}
              containerStyle={{ marginBottom: 5 }}
              color="green"
              onPress={() => {
                dispatch(cartActions.addToCart(props.item));
              }}
            />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productItem: {
    width: "100%",
    height: 250,
    flexDirection: "column",
    marginVertical: 10,
    borderRadius: 10
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden"
  },
  header: {
    height: "75%",
    marginBottom: 5
  },
  footer: {
    height: "25%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15
  },
  addToCartIcon: {},
  titlePriceColumn: {
    flexDirection: "column"
  }
});

export default Product;
