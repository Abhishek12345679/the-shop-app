export const DELETE_USER_PRODUCT = "DELETE_USER_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";

export const deleteUserProduct = id => {
    return { type: DELETE_USER_PRODUCT, ownerId: id };
};

export const updateProduct = (id, title, imageUrl, description) => {
    return {
        type: UPDATE_PRODUCT,
        pid: id,
        productData: {
            title,
            imageUrl,
            description
        }
    };
};

export const createProduct = (title, imageUrl, description, price) => {
    return {
        type: CREATE_PRODUCT,
        productData: {
            title,
            imageUrl,
            description,
            price
        }
    };
};