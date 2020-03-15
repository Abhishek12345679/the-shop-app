export const DELETE_USER_PRODUCT = 'DELETE_USER_PRODUCT'

export const deleteUserProduct = (id) => {
    return { type: DELETE_USER_PRODUCT, ownerId: id }
}