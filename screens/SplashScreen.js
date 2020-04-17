import React, { useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, AsyncStorage } from "react-native";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";

import * as authActions from "../store/actions/auth";

const SplashScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");

      if (!userData) {
        // props.navigation.navigate("Auth");
        dispatch(authActions.setDidTryAL());
        return;
      }

      const transformedData = JSON.parse(userData);
      console.log("userData from AsyncStorage", transformedData);
      const { token, userId, expiryDate } = transformedData;

      const expirationDate = new Date(expiryDate);
      console.log("getting expiration Date", expirationDate);
      if (expirationDate <= new Date() || !token || !userId) {
        // props.navigation.navigate("Auth");
        dispatch(authActions.setDidTryAL());
        return;
      }
      // props.navigation.navigate("Shop");

      const expirationTime = expirationDate.getTime() - new Date().getTime();
      console.log("authenticating", expirationTime);
      dispatch(authActions.authenticate(token, userId, expirationTime));
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
    alignItems: "center",
  },
  text: {
    fontFamily: "standard-apple-bold",
    fontSize: 20,
    color: Colors.primaryColor,
  },
});

export default SplashScreen;
