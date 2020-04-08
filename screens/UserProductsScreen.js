import React, { useState } from "react";
import { View, FlatList, TouchableOpacity, Alert, Text } from "react-native";
import { Icon } from "react-native-elements";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import { Snackbar } from "react-native-paper";
import * as productActions from "../store/actions/product";
import Colors from "../constants/Colors";

import Product from "../components/shop/Product";
import { useSelector, useDispatch } from "react-redux";

const UserProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);

  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(false);
  const [listener, setListener] = useState(false);

  const renderUserProductItem = (itemData) => {
    return (
      <View style={{ marginHorizontal: 15 }}>
        <Product
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          item={itemData.item}
          onSelectProduct={() => {
            props.navigation.navigate({
              routeName: "Modal",
              params: {
                productId: itemData.item.id,
              },
            });
          }}
        >
          <TouchableOpacity
            onPress={() => {
              Alert.alert("Delete", "Do you really want to dewlete it oppa ?", [
                {
                  text: "delete",
                  style: "destructive",
                  onPress: () => {
                    dispatch(
                      productActions.deleteUserProduct(itemData.item.id)
                    );
                  },
                },
                {
                  text: "cancel",
                  style: "cancel",
                  onPress: () => {
                    setListener(true);
                  },
                },
              ]);
              if (listener) {
                setIsVisible(true);
              }
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
      </View>
    );
  };

  if (userProducts.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "standard-apple-bold",
            fontSize: 15,
            color: Colors.primaryColor,
          }}
        >
          You don't have any of your own products 🛍
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={userProducts}
        renderItem={renderUserProductItem}
        contentContainerStyle={{ marginHorizontal: 10, flexGrow: 1 }}
      />
      <Snackbar
        visible={isVisible}
        onDismiss={() => setIsVisible(false)}
        duration={2000}
        action={{
          label: "UNDO",
          onPress: () => {},
        }}
        style={{ backgroundColor: Colors.primaryColor, height: 50 }}
      >
        Item Deleted
      </Snackbar>
    </View>
  );
};

UserProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Listings",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="add"
          iconName={"addfolder"}
          onPress={() => {
            navData.navigation.navigate({
              routeName: "Modal",
            });
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default UserProductsScreen;
