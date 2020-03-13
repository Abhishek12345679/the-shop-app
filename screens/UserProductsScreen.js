import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

import Product from "../components/shop/Product";
import { useSelector } from "react-redux";

const UserProductsScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts);

  const renderUserProductItem = itemData => {
    return (
      <Product
        image={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        item={itemData.item}
        onSelectProduct={() => {
          props.navigation.navigate({
            routeName: "ProductDetailsScreen",
            params: {
              productId: itemData.item.id,
              productTitle: itemData.item.title
            }
          });
        }}
      />
    );
  };

  return (
    <FlatList
      keyExtractor={item => item.id}
      data={userProducts}
      renderItem={renderUserProductItem}
      contentContainerStyle={{ marginHorizontal: 10 }}
    />
  );
};

UserProductsScreen.navigationOptions = {
  headerTitle: "Your Listings"
};

export default UserProductsScreen;
