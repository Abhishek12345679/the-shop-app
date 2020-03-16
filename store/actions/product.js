export const DELETE_USER_PRODUCT = "DELETE_USER_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteUserProduct = id => {
    return { type: DELETE_USER_PRODUCT, ownerId: id };
};

export const updateProduct = (id, title, price, imageUrl, description) => {
    return {
        type: UPDATE_PRODUCT,
        productData: {
            id: id,
            title: title,
            price: price,
            imageUrl: imageUrl,
            description: description
        }
    };
};