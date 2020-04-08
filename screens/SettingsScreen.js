import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";

import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

const SettingsScreen = (props) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.screen}>
      <TouchableOpacity
        style={styles.bigasslogoutbtn}
        onPress={() => {
          dispatch(authActions.logout());
          props.navigation.navigate("Auth");
        }}
      >
        <Text style={styles.text}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

SettingsScreen.navigationOptions = {
  headerTitle: "Settings",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 5,
  },
  text: {
    fontFamily: "standard-apple-bold",
    fontSize: 20,
    color: Colors.primaryColor,

  },
  bigasslogoutbtn: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowOffset:{
      width:3,
      height:1
    },
    shadowColor:'#000',
    shadowOpacity:0.54,
    marginTop:10
  },
});

export default SettingsScreen;
