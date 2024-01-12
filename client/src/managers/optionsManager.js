export const getToppings = () => {
    return fetch(`/api/pizzaoptions/topping`).then(res => res.json());
}

export const getPizzaToppings = () => {
    return fetch(`/api/pizzaoptions/pizzatopping`).then(res => res.json());
}

export const getSauces = () => {
    return fetch(`/api/pizzaoptions/sauce`).then(res => res.json());
}

export const getCheeses = () => {
    return fetch(`/api/pizzaoptions/cheese`).then(res => res.json());
}

export const getSizes = () => {
    return fetch(`/api/pizzaoptions/size`).then(res => res.json());
}