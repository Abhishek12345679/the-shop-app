import React, { useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions
} from "react-native";
import { Icon } from "react-native-elements";

import * as productActions from "../store/actions/product";

import Product from "../components/shop/Product";
import { useSelector, useDispatch } from "react-redux";

const UserProductsScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts);

  const dispatch = useDispatch();

  const [buttonPressed, setButtonPressed] = useState(false);

  const renderUserProductItem = itemData => {
    return (
      <Product
        longPressDelay={2000}
        image={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        item={itemData.item}
        onSelectProduct={() => {
          props.navigation.navigate({
            routeName: "Modal",
            params: {
              productId: itemData.item.id
            }
          });
          setButtonPressed(prevState => prevState);
        }}
      >
        <TouchableOpacity
          onPress={() => {
            dispatch(productActions.deleteUserProduct(itemData.item.id));
          }}
        >
          <Icon
            reverse
            name="ios-trash"
            type="ionicon"
            size={20}
            containerStyle={{ marginBottom: 8 }}
            color="red"
          />
        </TouchableOpacity>
      </Product>
    );
  };

  return (
    <View>
      <FlatList
        keyExtractor={item => item.id}
        data={userProducts}
        renderItem={renderUserProductItem}
        contentContainerStyle={{ marginHorizontal: 10 }}
      />
      {buttonPressed && (
        <View style={styles.MainContainer}>
          <View
            style={{
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height,
              backgroundColor: "#000",
              opacity: 0.7,
              marginBottom: 200
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: "center",
    alignItems: "stretch",
    flex: 1
  }
});

UserProductsScreen.navigationOptions = {
  headerTitle: "Your Listings"
};

export default UserProductsScreen;
