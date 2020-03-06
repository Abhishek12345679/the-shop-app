import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { StatusBar } from "react-native";

import Product from "../components/Product";

const ProductOverviewScreen = props => {
  const availableProducts = useSelector(state => state.products.products);

  const renderProductItem = itemData => {
    const selectProductHandler = () => {
      props.navigation.navigate({
        routeName: "productsDetail",
        params: {
          productId: itemData.item.id
        }
      });
    };

    return (
      <Product
        image={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        onSelectProduct={selectProductHandler}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor="black" barStyle="dark-content" />
      <FlatList
        data={availableProducts}
        renderItem={renderProductItem}
        contentContainerStyle={{ marginHorizontal: 10 }}
      />
    </View>
  );
};

ProductOverviewScreen.navigationOptions = {
  headerTitle: "Products"
};

const styles = StyleSheet.create({
  screen: {
    padding: 0,
    marginHorizontal: 0
  }
});

export default ProductOverviewScreen;
