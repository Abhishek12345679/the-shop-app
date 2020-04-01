import React, { useState, useCallback } from "react";
import { View, FlatList, TouchableOpacity, Alert } from "react-native";
import { Icon } from "react-native-elements";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import { Snackbar } from "react-native-paper";
import * as productActions from "../store/actions/product";
import Colors from "../constants/Colors";

import Product from "../components/shop/Product";
import { useSelector, useDispatch } from "react-redux";

const UserProductsScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts);

  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(false);
  const [listener, setListener] = useState(false);
  const [error, setError] = useState();

  const renderUserProductItem = itemData => {
    // const deleteconfirmHandler = () => {
    //   dispatch(productActions.deleteUserProduct(itemData.item.id));
    //   setIsVisible(true);
    // };
    // const deleteconfirmHandler = useCallback(async () => {
    //   // console.log("LOAD");

    //   setError(null);
    //   try {
    //     await dispatch(productActions.deleteUserProduct(itemData.item.id));
    //   } catch (err) {
    //     setError(err.message);
    //   }
    //   setIsVisible(true);
    // }, [setIsVisible, setError, dispatch]);

    // const deleteconfirmHandlerWrapper = () => {
    //   deleteconfirmHandler();
    // };
    return (
      <Product
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
        }}
      >
        <TouchableOpacity
          onPress={() => {
            Alert.alert("Delete", "Do you really want to dewlete it oppa ?", [
              {
                text: "delete",
                style: "destructive",
                onPress: () => {
                  dispatch(productActions.deleteUserProduct(itemData.item.id));
                }
              },
              {
                text: "cancel",
                style: "cancel",
                onPress: () => {
                  setListener(true);
                }
              }
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
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        keyExtractor={item => item.id}
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
          onPress: () => {}
        }}
        style={{ backgroundColor: Colors.primaryColor, height: 50 }}
      >
        Item Deleted
      </Snackbar>
    </View>
  );
};

UserProductsScreen.navigationOptions = navData => {
  return {
    headerTitle: "Your Listings",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="add"
          iconName={Platform.OS === "ios" ? "ios-add" : "md-add"}
          onPress={() => {
            navData.navigation.navigate({
              routeName: "Modal"
            });
          }}
        />
      </HeaderButtons>
    )
  };
};

export default UserProductsScreen;
