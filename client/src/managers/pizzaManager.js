export const getPizzaById = (id) => {
    return fetch(`/api/pizza/${id}`).then(res => res.json());
}

export const editPizzaById = (obj, id) => {
    return fetch(`/api/pizza/${id}`, {
        method: "PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(obj)
    }).then(res => res.json());
}

export const deletePizza = (id) => {
    return fetch(`api/pizza/${id}`,{
        method: "DELETE"
    }).then(res => res.json());
}