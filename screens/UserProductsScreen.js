import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";

import * as productActions from "../store/actions/product";

import Product from "../components/shop/Product";
import { useSelector, useDispatch } from "react-redux";

const UserProductsScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts);

  const dispatch = useDispatch();

  const renderUserProductItem = itemData => {
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
        contentContainerStyle={{ marginHorizontal: 10, flexGrow: 1 }}
      />
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
