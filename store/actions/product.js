import Product from "../../models/product";
import { applyMiddleware } from "redux";

export const DELETE_USER_PRODUCT = "DELETE_USER_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async dispatch => {
    // WAIT FOR THIS TO LOAD
    try {
      const response = await fetch(
        "https://theshopapp-1ce92.firebaseio.com/products.json"
      );
      if (!response.ok) {
        throw new Error("Error 400: CHHIVI SAYS ABBA DABBA JABBA");
      }
      const resData = await response.json();

      console.log(resData);
      const loadedData = [];

      for (const key in resData) {
        loadedData.push(
          new Product(
            key,
            "u1",
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({ type: SET_PRODUCTS, products: loadedData });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteUserProduct = id => {
  return async dispatch => {
    await fetch(`https://theshopapp-1ce92.firebaseio.com/products/${id}.json`, {
      method: "DELETE"
    });

    dispatch({ type: DELETE_USER_PRODUCT, ownerId: id });
  };
};

export const updateProduct = (id, title, imageUrl, description) => {
  return async dispatch => {
    // WAIT FOR THIS TO LOAD
    await fetch(`https://theshopapp-1ce92.firebaseio.com/products/${id}.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        imageUrl,
        description
      })
    });
    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        imageUrl,
        description
      }
    });
  };
};

export const createProduct = (title, imageUrl, description, price) => {
  //any async code you want!
  return async dispatch => {
    // WAIT FOR THIS TO LOAD
    const response = await fetch(
      "https://theshopapp-1ce92.firebaseio.com/products.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          imageUrl,
          description,
          price
        })
      }
    );
    // wait for this to load
    const resData = await response.json();

    //then dispatch (execute it) like this
    // like ES6 .then(dispatch({}))
    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        imageUrl,
        description,
        price
      }
    });
  };
};
