import React from "react";
import { Text, View, StyleSheet } from "react-native";

const DefaultText = (props) => {
  return (
    <Text {...props} style={{ ...props.style, ...styles.defaulttext }}>
      {props.children}
    </Text>
  );
};

const styles= StyleSheet.create({
    defaulttext:{
        fontFamily:'source-code',
        fontSize:23,
        color:'#000'
    }
})

export default DefaultText;
