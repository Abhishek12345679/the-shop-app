import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

import Card from "../UI/Card";

const Product = props => {
  return (
    <TouchableOpacity
      {...props}
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
              ₹{props.price.toFixed(2)}
            </Text>
          </View>
          {props.children}
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productItem: {
    width: "100%",
    height: 200,
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
