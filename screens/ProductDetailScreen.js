import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Icon } from "react-native-elements";

import * as cartActions from "../store/actions/cart";
import Colors from "../constants/Colors";

const ProductsDetailScreen = (props) => {
  const productId = props.route.params.productId;
  // const productTitle = props.navigation.getParam("productTitle");

  const dispatch = useDispatch();

  const availableProducts = useSelector((state) => state.products.products);
  const selectedProduct = availableProducts.find(
    (product) => product.id === productId
  );

  /* to avoid re-renders of the setParams, 
     in the absence of this method it loops unlimitedly */
  // useEffect(() => {
  //   props.navigation.setParams({ title: selectedProduct.title });
  // }, [selectedProduct]);

  return (
    <ScrollView>
      <View style={styles.screen}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: selectedProduct.imageUrl }}
            style={styles.image}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => {
              dispatch(cartActions.addToCart(selectedProduct));
            }}
          >
            <Icon
              reverse
              name="ios-cart"
              type="ionicon"
              color={Colors.primaryColor}
              style={styles.iconheart}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.textRowOne}>
          <Text style={styles.title} numberOfLines={2}>
            {selectedProduct.title}
          </Text>
          <Text style={styles.price}>₹{selectedProduct.price.toFixed(2)}</Text>
          <Text style={styles.textdesc}>{selectedProduct.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export const screenOptions = (navData) => {
  const headerTitle = navData.route.params.productTitle;
  return {
    headerTitle: headerTitle,
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  screen: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 25,
    fontFamily: "standard-apple-bold",
    marginTop: 10,
    color: Colors.primaryColor,
  },
  textRowOne: {
    flexDirection: "column",
    paddingHorizontal: 10,
    position: "relative",
  },
  textdesc: {
    fontFamily: "standard-apple",
    marginVertical: 10,
    fontSize: 15,
  },
  imageContainer: {
    height: 250,
  },
  iconContainer: {
    bottom: 70,
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
  iconheart: {
    marginEnd: 10,
    marginBottom: 8,
  },
  price: {
    color: "#A9a9a9",
  },
});

export default ProductsDetailScreen;
