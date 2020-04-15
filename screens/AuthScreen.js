import React, { useReducer, useCallback, useState, useEffect } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { Button } from "react-native-paper";
import Input from "../components/UI/Input";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";
import { Alert } from "react-native";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formInputReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedInputState = {
      ...state.inputState,
      [action.inputId]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.inputId]: action.isValid,
    };
    let fromIsValid = true;

    for (const key in updatedValidities) {
      fromIsValid = fromIsValid && updatedValidities[key];
    }

    return {
      inputState: updatedInputState,
      inputValidities: updatedValidities,
      formValidity: fromIsValid,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error, [{ text: "okay" }]);
    }
  }, [error]);

  const [inputFormState, dispatchInputFormState] = useReducer(
    formInputReducer,
    {
      inputState: {
        email: "",
        password: "",
      },
      inputValidities: {
        email: false,
        password: false,
      },
      formValidity: false,
    }
  );

  const signUpHandler = async () => {
    setError(null);
    setIsLoading(true);

    try {
      await dispatch(
        authActions.signup(
          inputFormState.inputState.email,
          inputFormState.inputState.password
        )
      );
      // setIsSignUp(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const signInHandler = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(
        authActions.signin(
          inputFormState.inputState.email,
          inputFormState.inputState.password
        )
      );
      // props.navigation.navigate("Shop");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputValueChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchInputFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        inputId: inputIdentifier,
      });
    },
    [dispatchInputFormState]
  );
  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={{
          uri:
            "https://images.pexels.com/photos/1829191/pexels-photo-1829191.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        }}
        style={{ flex: 1, width: "100%", height: "100%" }}
        resizeMode="cover"
      >
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={0}
          style={styles.form}
        >
          <View>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Welcome</Text>
              <Text style={styles.headerText}>Back</Text>
            </View>
            <View style={styles.inputContainer}>
              <Input
                style={styles.input}
                id="email"
                inputLabel="Email"
                keyboardType="email-address"
                required
                email
                autoCapitalize="none"
                onInputChange={inputValueChangeHandler}
                initialValue=""
                errorText="Invalid Email address"
                initiallyValid={false}
              />
              <Input
                style={styles.input}
                id="password"
                inputLabel="Password"
                keyboardType="default"
                secureTextEntry
                required
                autoCapitalize="none"
                onInputChange={inputValueChangeHandler}
                initialValue=""
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            {!isSignUp && (
              <TouchableOpacity
                onPress={signInHandler}
                activeOpacity={0.82}
                disabled={!inputFormState.formValidity}
              >
                {!isLoading && (
                  <Button style={styles.button} mode="contained" color="#fff">
                    Sign In
                  </Button>
                )}
                {isLoading && <ActivityIndicator size="small" color="white" />}
              </TouchableOpacity>
            )}
            {isSignUp && (
              <TouchableOpacity
                onPress={signUpHandler}
                activeOpacity={0.82}
                disabled={!inputFormState.formValidity}
              >
                {!isLoading && (
                  <Button style={styles.button} mode="contained" color="#fff">
                    Sign Up
                  </Button>
                )}
                {isLoading && (
                  <Button
                    icon="loading"
                    style={styles.button}
                    mode="contained"
                    color="#fff"
                  >
                    Loading
                  </Button>
                )}
              </TouchableOpacity>
            )}
          </View>
          {isSignUp && (
            <TouchableOpacity
              style={styles.authSwitchTextContainer}
              onPress={() => setIsSignUp(false)}
            >
              <Text style={styles.authSwitchText}>Already a member? Login</Text>
            </TouchableOpacity>
          )}

          {!isSignUp && (
            <TouchableOpacity
              style={styles.authSwitchTextContainer}
              onPress={() => setIsSignUp(true)}
            >
              <Text style={styles.authSwitchText}>
                Not a member ? Sign Up Now
              </Text>
            </TouchableOpacity>
          )}
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 40,
    fontFamily: "standard-apple-bold",
    color: "white",
  },
  inputContainer: {
    marginVertical: 60,
    paddingHorizontal: 20,
  },
  headerContainer: {
    marginVertical: 60,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginVertical: 30,
    marginHorizontal: 40,
  },
  input: {
    color: "white",
    borderColor: "white",
    fontSize: 15,
  },
  button: {
    marginVertical: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  authSwitchText: {
    textDecorationLine: "underline",
    color: "#fff",
  },
  authSwitchTextContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
export default AuthScreen;
