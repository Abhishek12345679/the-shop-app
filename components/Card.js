import React from "react";
import { View, StyleSheet } from "react-native";

const Card = props => {
  return (
    <View
      {...props}
      style={{ ...styles.card, ...styles.cardShadow, ...props.style }}
    >
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: "100%",
    height: 300,
    padding:10,
    borderRadius:20,
    backgroundColor:'#c2c2c2'
  },
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 5
    },
    shadowOpacity: 0.5,
    elevation: 7,
    shadowRadius:5
  }
});

export default Card;
