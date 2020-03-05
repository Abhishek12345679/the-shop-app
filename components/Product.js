import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

import Card from "../components/Card";
import { TouchableOpacity } from "react-native";

const Product = props => {
  return (
    <TouchableOpacity onPress={props.onSelectProduct}>
      <Card style={styles.productItem}>
        <View style={styles.header}>
          <Image source={{ uri: props.image }} style={styles.image} />
        </View>
        <View style={styles.footer}>
          <Text>{props.title}</Text>
          <Text>₹{props.price}</Text>
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
    marginVertical: 10
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    overflow: "hidden"
  },
  header: {
    height: "85%",
    marginBottom: 5
  },
  footer: {
    height: "15%",
    flexDirection: "column",
    paddingHorizontal: 5
  }
});

export default Product;
