import { PRODUCTS } from "../../data/dummy_data";

const initialState = {
    products: PRODUCTS,
    userProducts: []
};

const productsReducer = (state = initialState, action) => {
    return state;
};

export default productsReducer;