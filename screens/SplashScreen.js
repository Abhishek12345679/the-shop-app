import React, { useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, AsyncStorage } from "react-native";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";

import * as authActions from "../store/actions/auth";

const SplashScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");

      if (!userData) {
        props.navigation.navigate("Auth");
        return;
      }

      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;

      const expirationDate = new Date(expiryDate);
      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate("Auth");
        return;
      }
      props.navigation.navigate("Shop");
      dispatch(authActions.authenticate(token, userId));
    };
    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.text}>Shoooop!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontFamily: "standard-apple-bold",
    fontSize: 20,
    color: Colors.primaryColor
  }
});

export default SplashScreen;
