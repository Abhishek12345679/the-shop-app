import React from "react";
import { FlatList, View, StyleSheet, Platform } from "react-native";
import { useSelector } from "react-redux";
import { StatusBar } from "react-native";

import Product from "../components/shop/Product";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";

const ProductOverviewScreen = props => {
  const availableProducts = useSelector(state => state.products.products);

  const renderProductItem = itemData => {
    const selectProductHandler = () => {
      props.navigation.navigate({
        routeName: "productsDetail",
        params: {
          productId: itemData.item.id,
          productTitle: itemData.item.title
        }
      });
    };

    return (
      <Product
        image={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        onSelectProduct={selectProductHandler}
        productId={itemData.item.id}
        item={itemData.item}
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

ProductOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: "Products",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate('cartScreen')
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  screen: {
    padding: 0,
    marginHorizontal: 0
  }
});

export default ProductOverviewScreen;
