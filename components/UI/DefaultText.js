import React from "react";
import { Text, StyleSheet } from "react-native";

const DefaultText = props => {
  return (
    <Text style={{ ...props.style, ...styles.defaulttext }}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaulttext: {
    fontFamily: "standard-apple",
  }
});

export default DefaultText;
