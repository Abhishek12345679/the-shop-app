import React from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";

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

  return <FlatList data={availableProducts} renderItem={renderProductItem} />;
};

ProductOverviewScreen.navigationOptions = {
  headerTitle: "Products"
};

export default ProductOverviewScreen;
