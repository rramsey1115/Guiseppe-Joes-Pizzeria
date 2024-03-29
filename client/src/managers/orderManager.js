export const getAllOrders = () => {
    return fetch(`/api/order`).then(res => res.json());
}

export const getOrderById = (id) => {
    return fetch(`/api/order/${id}`).then(res => res.json());
}

export const postNewOrder = (obj) => {
    return fetch(`/api/order/create`, {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify(obj)
    }).then(res => res.json());
}

export const editOrderById = (id, obj) => {
    return fetch(`/api/order/${id}`, {
        method: "PUT",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify(obj)
    });
}

export const completeOrder = (orderId, obj) => {
    return fetch(`/api/order/${orderId}/complete`, {
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(obj)
    }).then(res => res.json());
}

export const removeOrder = (orderId) => {
    return fetch(`api/order/${orderId}`, {
        method: "DELETE"
    });
}

