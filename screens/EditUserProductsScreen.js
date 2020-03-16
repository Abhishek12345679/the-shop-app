import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "react-native-elements";
import Colors from "../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

import * as productActions from "../store/actions/product";

const EditUserProductsScreen = props => {
  const [arrowPressed, setArrowPressed] = useState(false);

  const dispatch = useDispatch();

  const availableProducts = useSelector(state => state.products.userProducts);
  const selectedProductId = props.navigation.getParam("productId");
  const selectedProduct = availableProducts.find(
    prod => prod.id === selectedProductId
  );

  const [title, setTitle] = useState(selectedProduct.title);
  const [price, setPrice] = useState(selectedProduct.price);
  const [description, setDescription] = useState(selectedProduct.description);
  const [imageUrl, setImageUrl] = useState(selectedProduct.imageUrl);

  const editProductsHandler = useCallback(() => {
    dispatch(
      productActions.updateProduct(title, description, imageUrl, +price)
    );
  }, [dispatch, title, description, imageUrl, price]);

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
            <TouchableOpacity onPress={editProductsHandler}>
              <Icon
                reverse
                name="ios-save"
                type="ionicon"
                size={25}
                color={Colors.primaryColor}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.formItem}>
            <Text style={styles.formText}>Title</Text>
            <TextInput
              style={styles.inputfield}
              value={title}
              onChangeText={newVal => setTitle(newVal)}
            />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.formText}>Price</Text>
            <TextInput style={styles.inputfield} value={price.toString()} />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.formText}>Image Url</Text>
            <TextInput
              style={styles.inputfield}
              value={imageUrl}
              onChangeText={newVal => setImageUrl(newVal)}
            />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.formText}>Description</Text>
            <TextInput
              style={styles.inputfield}
              onChangeText={newVal => setDescription(newVal)}
              value={description}
            />
          </View>
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
    height: 100,
    marginVertical: 10
  },
  formText: {
    fontFamily: "standard-apple-bold",
    fontSize: 20
  },
  headerText: {
    fontFamily: "standard-apple-bold",
    fontSize: 50
  },
  inputfield: {
    borderBottomWidth: 1,
    borderColor: "#000",
    height: 25
  },
  headerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  }
});

export default EditUserProductsScreen;
