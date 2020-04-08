import React, { useReducer, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Colors from "../../constants/Colors";

export const INPUT_CHANGE = "INPUT_CHANGE";
export const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true
      };
    default:
      return state;
  }
};

const Input = props => {
  //initial state snapshot (for the most part)
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initiallyValid,
    touched: false
  });

  const { onInputChange, id } = props;

  //getting values from the inputFields and its validity
  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const inputValueChangeHandler = input => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;

    //currently in use
    if (props.required && input.trim().length === 0) {
      isValid = false;
    }
    //...
    if (props.email && !emailRegex.test(input.toLowerCase())) {
      isValid = false;
    }

    //currently in use
    if (props.min != null && +input < props.min) {
      isValid = false;
    }
    //...

    if (props.max != null && +input > props.max) {
      isValid = false;
    }
    if (props.minLength != null && input.length < props.minLength) {
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, value: input, isValid: isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };
  return (
    <View style={styles.formItem}>
      <Text style={{ ...styles.formText, ...props.style }}>
        {props.inputLabel}
      </Text>
      <TextInput
        {...props}
        style={{ ...styles.inputfield, ...props.style }}
        value={inputState.value}
        onChangeText={inputValueChangeHandler}
        onBlur={lostFocusHandler}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formItem: {
    marginVertical: 10
  },
  formText: {
    fontFamily: "standard-apple-bold",
    fontSize: 15,
    color: Colors.primaryColor
  },
  inputfield: {
    borderBottomWidth: 2,
    borderColor: Colors.primaryColor,
    height: 25,
    color: "#000"
  },
  errorText: {
    color: "red",
    fontSize: 13
  }
});

export default Input;
