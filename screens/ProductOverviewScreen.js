import React from "react";
import { View, FlatList, StyleSheet, Text, Image } from "react-native";
import { useSelector } from "react-redux";

const ProductOverviewScreen = props => {
  const availableProducts = useSelector(state => state.products.products);

  const renderProductItem = itemData => {
    return (
      <View style={styles.productItem}>
        <Image source={{ uri: itemData.item.imageUrl }} style={styles.image} />
        <Text>{itemData.item.title}</Text>
      </View>
    );
  };

  return <FlatList data={availableProducts} renderItem={renderProductItem} />;
};

const styles = StyleSheet.create({
  productItem: {
    width:'100%',
    height:200,
    margin:10
  },
  image:{
    width:'100%',
    height:'100%'
  }
});

ProductOverviewScreen.navigationOptions = {
  headerTitle: "Products"
};

export default ProductOverviewScreen;
