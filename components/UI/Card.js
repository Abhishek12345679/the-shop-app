import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

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
    width: Dimensions.get('window').width,
    height: 300,
    padding:0,
    backgroundColor:'#fff'
  },
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 0.7,
    elevation: 7,
    shadowRadius:7
  }
});

export default Card;
