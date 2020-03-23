import React, { useState, useCallback, useReducer } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "react-native-elements";
import Colors from "../constants/Colors";

import * as productActions from "../store/actions/product";
import { Alert } from "react-native";

const EditUserProductsScreen = props => {
  const [arrowPressed, setArrowPressed] = useState(false);

  const dispatch = useDispatch();

  const availableProducts = useSelector(state => state.products.userProducts);
  const selectedProductId = props.navigation.getParam("productId");
  const selectedProduct = availableProducts.find(
    prod => prod.id === selectedProductId
  );

  const addMode = !selectedProduct;

  const [title, setTitle] = useState(addMode ? "" : selectedProduct.title);
  const [titleIsValid, setTitleIsValid] = useState(false);
  const [price, setPrice] = useState(addMode ? "" : selectedProduct.price);
  const [description, setDescription] = useState(
    addMode ? "" : selectedProduct.description
  );
  const [imageUrl, setImageUrl] = useState(
    addMode ? "" : selectedProduct.imageUrl
  );

  const editorAddProductsHandler = useCallback(() => {
    if (!titleIsValid) {
      Alert.alert("Invalid Input", "Please do not leave the fields blank", [
        { text: "close" }
      ]);
      return;
    }
    if (addMode) {
      dispatch(
        productActions.createProduct(title, imageUrl, description, +price)
      );
    } else {
      dispatch(
        productActions.updateProduct(
          selectedProductId,
          title,
          imageUrl,
          description,
          +price
        )
      );
    }

    props.navigation.navigate("UserProductsScreen");
  }, [
    dispatch,
    selectedProductId,
    title,
    imageUrl,
    description,
    price,
    titleIsValid
  ]);

  const titleChangeHandler = title => {
    if (title.trim().length === 0) {
      setTitleIsValid(false);
    } else {
      setTitleIsValid(true);
    }

    setTitle(title);
  };

  return (
    <View
      style={{ flex: 1, flexDirection: "column", justifyContent: "flex-end" }}
    >
      <View style={{ width: "100%", alignItems: "center" }}>
        {arrowPressed ? (
          <Ionicons
            name="ios-arrow-down"
            size={50}
            color="black"
            onPress={() => {
              setArrowPressed(prevState => !prevState);
              props.navigation.navigate("UserProductsScreen");
            }}
          />
        ) : (
          <Ionicons
            name="ios-arrow-up"
            size={50}
            color="black"
            onPress={() => {
              setArrowPressed(prevState => !prevState);
              props.navigation.navigate("UserProductsScreen");
            }}
          />
        )}
      </View>
      <View
        style={{
          height: "85%",
          width: "100%",
          backgroundColor: "#fff",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: "#000",
          shadowOffset: {
            width: 10,
            height: 0
          },
          shadowOpacity: 0.5,
          shadowRadius: 10,
          padding: 20
        }}
      >
        <View style={styles.form}>
          <View style={styles.headerItem}>
            <View>
              <Text style={styles.headerText}>Edit</Text>
            </View>
            <TouchableOpacity onPress={editorAddProductsHandler}>
              <Icon
                reverse
                name="ios-save"
                type="ionicon"
                size={25}
                color={Colors.primaryColor}
              />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View>
              <View style={styles.formItem}>
                <Text style={styles.formText}>Title</Text>
                <TextInput
                  style={styles.inputfield}
                  value={title}
                  onChangeText={titleChangeHandler}
                  keyboardType="default"
                  autoCapitalize="sentences"
                  autoCorrect
                  returnKeyType="done"
                />
              </View>
              {!titleIsValid && addMode && (
                <Text style={{ color: "red", fontWeight: "bold" }}>
                  Invalid
                </Text>
              )}
              {addMode && (
                <View style={styles.formItem}>
                  <Text style={styles.formText}>Price</Text>
                  <TextInput
                    style={styles.inputfield}
                    value={price.toString()}
                    onChangeText={newVal => setPrice(newVal)}
                    keyboardType="decimal-pad"
                  />
                </View>
              )}
              <View style={styles.formItem}>
                <Text style={styles.formText}>Image Url</Text>
                <TextInput
                  style={styles.inputfield}
                  value={imageUrl}
                  onChangeText={newVal => setImageUrl(newVal)}
                  keyboardType="default"
                />
              </View>
              <View style={styles.formItem}>
                <Text style={styles.formText}>Description</Text>
                <TextInput
                  style={styles.inputfield}
                  onChangeText={newVal => setDescription(newVal)}
                  value={description}
                  keyboardType="default"
                  multiline
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    flexDirection: "column"
  },
  formItem: {
    marginVertical: 10
  },
  formText: {
    fontFamily: "standard-apple-bold",
    fontSize: 15,
    color: Colors.primaryColor
  },
  headerText: {
    fontFamily: "standard-apple-bold",
    fontSize: 50
  },
  inputfield: {
    borderBottomWidth: 2,
    borderColor: Colors.primaryColor,
    height: 25,
    color: "#ccc"
  },
  headerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  }
});

export default EditUserProductsScreen;
