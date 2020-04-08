import Product from "../../models/product";

export const DELETE_USER_PRODUCT = "DELETE_USER_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
    return async(dispatch, getState) => {
        // WAIT FOR THIS TO LOAD
        console.log(getState());

        const userId = getState().auth.userId;
        try {
            const response = await fetch(
                "https://theshopapp-1ce92.firebaseio.com/products.json"
            );
            if (!response.ok) {
                throw new Error("something went wrong");
            }
            const resData = await response.json();

            // console.log(resData);
            const loadedData = [];

            for (const key in resData) {
                loadedData.push(
                    new Product(
                        key,
                        resData[key].ownerId,
                        resData[key].title,
                        resData[key].imageUrl,
                        resData[key].description,
                        resData[key].price
                    )
                );
            }

            dispatch({
                type: SET_PRODUCTS,
                products: loadedData,
                userProducts: loadedData.filter(prod => prod.ownerId === userId)
            });
        } catch (err) {
            throw err;
        }
    };
};

export const deleteUserProduct = id => {
    return async(dispatch, getState) => {
        const token = getState().auth.token;
        const response = await fetch(
            `https://theshopapp-1ce92.firebaseio.com/products/${id}.json?auth=${token}`, {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error("Something went wrong!");
        }

        dispatch({ type: DELETE_USER_PRODUCT, ownerId: id });
    };
};

export const updateProduct = (id, title, imageUrl, description) => {
    return async(dispatch, getState) => {
        // conso
        const token = getState().auth.token;
        const response = await fetch(
            `https://theshopapp-1ce92.firebaseio.com/products/${id}.json?auth=${token}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    imageUrl,
                    description
                })
            }
        );

        if (!response.ok) {
            throw new Error("Something went wrong!");
        }

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
    return async(dispatch, getState) => {
        // WAIT FOR THIS TO LOAD
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(
            `https://theshopapp-1ce92.firebaseio.com/products/.json?auth=${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    imageUrl,
                    description,
                    price,
                    ownerId: userId
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
                price,
                ownerId: userId
            }
        });
    };
};