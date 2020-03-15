import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const EditUserProductsScreen = props => {
  const [arrowPressed, setArrowPressed] = useState(false);

  const availableProducts = useSelector(state => state.products.userProducts);
  const selectedProductId = props.navigation.getParam("productId");
  const selectedProduct = availableProducts.find(
    prod => prod.id === selectedProductId
  );

  const [title, setTitle] = useState(selectedProduct.title);
  const [price, setPrice] = useState(selectedProduct.price);
  const [description, setDescription] = useState(selectedProduct.description);
  const [imageUrl, setImageUrl] = useState(selectedProduct.imageUrl);

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
        <View styles={styles.form}>
          <View styles={styles.formItem}>
            <Text style={styles.formText}>Title</Text>
            <TextInput value={title} onChange={newVal => newVal} />
          </View>
          <View styles={styles.formItem}>
            <Text style={styles.formText}>Title</Text>
            <TextInput value={price} onChange={newVal => newVal} />
          </View>
          <View styles={styles.formItem}>
            <Text style={styles.formText}>Title</Text>
            <TextInput value={imageUrl} onChange={newVal => newVal} />
          </View>
          <View styles={styles.formItem}>
            <Text style={styles.formText}>Title</Text>
            <TextInput value={description} onChange={newVal => newVal} Î />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    marginTop: 100
  },
  modalSampleText: {
    fontFamily: "standard-apple",
    fontSize: 15
  },
  form: {},
  formItem: {},
  formText: {}
});

export default EditUserProductsScreen;
