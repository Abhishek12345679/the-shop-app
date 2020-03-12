import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DefaultText from "../UI/DefaultText";

const CartItem = props => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.imageDetailContainer}>
        <Image source={{ uri: props.productImage }} style={styles.image} />
        <View style={styles.prodDetail}>
          <View style={styles.rowOne}>
            <DefaultText style={styles.text}>{props.productTitle}</DefaultText>
          </View>
          <View style={styles.rowTwo}>
            <View style={styles.column}>
              <DefaultText style={styles.text}>
                ₹{props.productSum.toFixed(2)}
              </DefaultText>
              <DefaultText style={styles.text}>{props.quantity}</DefaultText>
            </View>

            {props.isDeleteable && (
              <View
                style={{
                  marginStart: 120,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <TouchableOpacity>
                  <Ionicons
                    name="md-trash"
                    size={30}
                    color="red"
                    onPress={props.onRemove}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  prodDetail: {
    flexDirection: "column",
    marginStart: 50
  },
  cartItem: {
    height: 75,
    backgroundColor: "#fff",
    marginVertical: 8,
    flexDirection: "row",

    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 10
    },
    shadowOpacity: 0.6,
    elevation: 70,
    shadowRadius: 10,
    marginHorizontal: 20
  },
  rowOne: {
    flexDirection: "column"
  },
  rowTwo: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    marginEnd: 0
  },
  column: {
    flexDirection: "column"
  },
  image: {
    width: 50,
    height: 50,
    marginLeft: 10
  },
  imageDetailContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  text: {
    fontSize: 15
  }
});

export default CartItem;
