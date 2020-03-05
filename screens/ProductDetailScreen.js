import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

const ProductsDetailScreen = props => {
  const productId = props.navigation.getParam("productId");

  const availableProducts = useSelector(state => state.products.products);
  const selectedProduct = availableProducts.find(
    product => product.id === productId
  );

  /* to avoid re-renders of the setParams, 
  in the absence of this method it loops unlimitedly*/
  useEffect(() => {
    props.navigation.setParams({ title: selectedProduct.title });
  }, [selectedProduct]);

  return (
    <View>
      <Text>{selectedProduct.title}</Text>
    </View>
  );
};

ProductsDetailScreen.navigationOptions = navData => {
  const headerTitle = navData.navigation.getParam("title");
  return {
    headerTitle: headerTitle
  };
};

export default ProductsDetailScreen;
