import React, { useEffect } from "react";
import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { Icon } from "react-native-elements";
import DefaultText from "../components/DefaultText";

const ProductsDetailScreen = props => {
  const productId = props.navigation.getParam("productId");

  const availableProducts = useSelector(state => state.products.products);
  const selectedProduct = availableProducts.find(
    product => product.id === productId
  );

  /* to avoid re-renders of the setParams, 
     in the absence of this method it loops unlimitedly */
  useEffect(() => {
    props.navigation.setParams({ title: selectedProduct.title });
  }, [selectedProduct]);

  return (
    <ScrollView>
      <View style={styles.screen}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: selectedProduct.imageUrl }}
            style={styles.image}
          />
          <View style={styles.iconContainer}>
            <Icon
              raised
              name="ios-heart"
              type="ionicon"
              color="green"
              onPress={() => console.log("hello")}
              style={styles.iconheart}
            />
          </View>
        </View>
        <View style={styles.textRowOne}>
          <DefaultText style={styles.title}>{selectedProduct.title}</DefaultText>
          <DefaultText style={{ color: "green" }}>₹{selectedProduct.price}</DefaultText>
          <Text style={styles.textdesc}>{selectedProduct.description}</Text>
          <Text style={styles.textdesc}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio vitae
            necessitatibus maiores inventore aut obcaecati itaque ab nisi
            architecto hic minima voluptates reiciendis iste saepe, impedit
            consequuntur laborum doloribus facere!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

ProductsDetailScreen.navigationOptions = navData => {
  const headerTitle = navData.navigation.getParam("title");
  return {
    headerTitle: headerTitle
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "flex-end"
  },
  screen: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 15,
    fontWeight: "bold"
  },
  textRowOne: {
    flexDirection: "column",
    paddingHorizontal: 10,
    position: "relative"
  },
  textdesc: {
    fontWeight: "bold",
    color: "black",
    marginVertical: 5
  },
  imageContainer: {
    height: 250
  },
  iconContainer: {
    bottom: 70,
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
  iconheart: {
    marginEnd: 10,
    marginBottom: 8
  }
});

export default ProductsDetailScreen;
