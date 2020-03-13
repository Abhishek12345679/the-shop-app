import { PRODUCTS } from "../../data/dummy_data";

const initialState = {
    products: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === "u1")
};

const productsReducer = (state = initialState, action) => {
    return state;
};

export default productsReducer;