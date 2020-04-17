import React, { useState, useCallback, useReducer, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../constants/Colors";
import { Icon } from "react-native-elements";

import * as productActions from "../store/actions/product";
import Input from "../components/UI/Input";
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

const EditUserProductsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (error) Alert.alert("Error", error, [{ text: "close" }]);
  }, [error]);

  const dispatch = useDispatch();

  const availableProducts = useSelector((state) => state.products.userProducts);
  const selectedProductId = props.route.params
    ? props.route.params.productId
    : null;
  const selectedProduct = availableProducts.find(
    (prod) => prod.id === selectedProductId
  );

  const addMode = !selectedProduct;

  const [inputFormState, dispatchInputFormState] = useReducer(
    formInputReducer,
    {
      inputState: {
        title: addMode ? "" : selectedProduct.title,
        imageUrl: addMode ? "" : selectedProduct.imageUrl,
        description: addMode ? "" : selectedProduct.description,
        price: "",
      },
      inputValidities: {
        title: addMode ? false : true,
        imageUrl: addMode ? false : true,
        description: addMode ? false : true,
        price: addMode ? false : true,
      },
      formValidity: addMode ? false : true,
    }
  );

  const editorAddProductsHandler = useCallback(async () => {
    if (!inputFormState.formValidity) {
      Alert.alert("Invalid Input", "Please do not leave the fields blank", [
        { text: "close" },
      ]);
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      if (addMode) {
        await dispatch(
          productActions.createProduct(
            inputFormState.inputState.title,
            inputFormState.inputState.imageUrl,
            inputFormState.inputState.description,
            +inputFormState.inputState.price
          )
        );
      } else {
        await dispatch(
          productActions.updateProduct(
            selectedProductId,
            inputFormState.inputState.title,
            inputFormState.inputState.imageUrl,
            inputFormState.inputState.description
          )
        );
      }
      props.navigation.navigate("UserProductsScreen");
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, selectedProductId, inputFormState]);

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
    // <View>
    //   {/* <Modal animationType="slide" presentationStyle="formSheet"> */}
    //     <View style={styles.form}>
    //       <View style={styles.headerItem}>
    //         <View>
    //           <Text style={styles.headerText}>Edit</Text>
    //         </View>
    //         {!isLoading && (
    //           <TouchableOpacity
    //             onPress={editorAddProductsHandler}
    //             style={styles.savingIndicatorContainer}
    //           >
    //             <Icon
    //               reverse
    //               name="ios-save"
    //               type="ionicon"
    //               size={25}
    //               color={Colors.primaryColor}
    //             />
    //           </TouchableOpacity>
    //         )}
    //         {isLoading && (
    //           <View style={styles.savingIndicatorContainer}>
    //             <ActivityIndicator size="small" color="#ffffff" />
    //           </View>
    //         )}
    //       </View>
    //       <KeyboardAvoidingView behavior="position">
    //         <ScrollView>
    //           <View style={{ flex: 1 }}>
    //             {!inputFormState.formValidity && (
    //               <View style={styles.errRedBox}>
    //                 <View style={styles.errBlackBox}>
    //                   <Text style={{ color: "black" }}>
    //                     Please Do Not Leave Any Field Empty
    //                   </Text>
    //                 </View>
    //               </View>
    //             )}
    //             <View>
    //               <Input
    //                 id="imageUrl"
    //                 inputLabel="imageUrl"
    //                 keyboardType="default"
    //                 returnKeyType="done"
    //                 onInputChange={inputValueChangeHandler}
    //                 initialValue={addMode ? "" : selectedProduct.imageUrl}
    //                 initiallyValid={addMode ? false : true}
    //                 required
    //               />
    //               <Input
    //                 id="title"
    //                 inputLabel="title"
    //                 keyboardType="default"
    //                 returnKeyType="done"
    //                 autoCapitalize="sentences"
    //                 autoCorrect
    //                 onInputChange={inputValueChangeHandler}
    //                 initialValue={addMode ? "" : selectedProduct.title}
    //                 required
    //               />

    //               {addMode && (
    //                 <Input
    //                   id="price"
    //                   inputLabel="price"
    //                   keyboardType="decimal-pad"
    //                   returnKeyType="default"
    //                   onInputChange={inputValueChangeHandler}
    //                   required
    //                   min={0.1}
    //                 />
    //               )}
    //               <Input
    //                 id="description"
    //                 inputLabel="description"
    //                 keyboardType="default"
    //                 returnKeyType="done"
    //                 autoCapitalize="sentences"
    //                 autoCorrect
    //                 onInputChange={inputValueChangeHandler}
    //                 initialValue={addMode ? "" : selectedProduct.description}
    //                 initiallyValid={addMode ? false : true}
    //                 required
    //                 minLength={5}
    //               />
    //             </View>
    //           </View>
    //         </ScrollView>
    //       </KeyboardAvoidingView>
    //     </View>
    //   {/* </Modal> */}
    // </View>
    <View style={styles.screen}>
      <View style={styles.barCont}>
        <View style={styles.bar}></View>
      </View>
      <View style={styles.header}>
        {addMode ? (
          <Text style={styles.headerText}>Add New</Text>
        ) : (
          <Text style={styles.headerText}>Edit</Text>
        )}
        {!isLoading ? (
          <TouchableOpacity onPress={editorAddProductsHandler}>
            <Icon
              reverse
              name="upload"
              type="antdesign"
              size={22}
              color="#000"
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.savingIndicatorContainer}>
            <ActivityIndicator size="small" color="#fff" />
          </View>
        )}
      </View>

      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ flexGrow: 1 }}>
            {!inputFormState.formValidity && (
              <View style={styles.errRedBox}>
                <View style={styles.errBlackBox}>
                  <Text style={{ color: "black" }}>
                    Please Do Not Leave Any Field Empty
                  </Text>
                </View>
              </View>
            )}
            <View>
              <Input
                id="imageUrl"
                inputLabel="imageUrl"
                keyboardType="default"
                returnKeyType="done"
                onInputChange={inputValueChangeHandler}
                initialValue={addMode ? "" : selectedProduct.imageUrl}
                initiallyValid={addMode ? false : true}
                required
              />
              <Input
                id="title"
                inputLabel="title"
                keyboardType="default"
                returnKeyType="done"
                autoCapitalize="sentences"
                autoCorrect
                onInputChange={inputValueChangeHandler}
                initialValue={addMode ? "" : selectedProduct.title}
                required
              />

              {addMode && (
                <Input
                  id="price"
                  inputLabel="price"
                  keyboardType="decimal-pad"
                  returnKeyType="default"
                  onInputChange={inputValueChangeHandler}
                  required
                  min={0.1}
                />
              )}
              <Input
                id="description"
                inputLabel="description"
                keyboardType="default"
                returnKeyType="done"
                autoCapitalize="sentences"
                autoCorrect
                onInputChange={inputValueChangeHandler}
                initialValue={addMode ? "" : selectedProduct.description}
                initiallyValid={addMode ? false : true}
                required
                minLength={5}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    flexDirection: "column",
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontFamily: "standard-apple-bold",
    fontSize: 50,
  },
  bar: {
    height: 7,
    backgroundColor: "#ccc",
    borderRadius: 10,
    width: 40,
  },
  barCont: {
    alignItems: "center",
  },
  errRedBox: {
    width: "98%",
    borderWidth: 2,
    borderColor: "red",
    padding: 10,
  },
  errBlackBox: {
    width: "98%",
    borderWidth: 2,
    borderColor: "black",
    padding: 10,
  },
  savingIndicatorContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    backgroundColor: '#000',
    borderRadius: 25,
    padding: 10,
  },
});

export default EditUserProductsScreen;
