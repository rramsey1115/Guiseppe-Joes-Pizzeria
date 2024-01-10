export const getAllOrders = () => {
    return fetch(`/api/order`).then(res => res.json());
}

export const getOrderById = (id) => {
    return fetch(`/api/order/${id}`).then(res => res.json());
}