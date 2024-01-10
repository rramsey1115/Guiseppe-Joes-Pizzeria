export const getToppings = () => {
    return fetch(`/api/topping`).then(res => res.json());
}

export const getSauces = () => {
    return fetch(`/api/sauce`).then(res => res.json());
}

export const getCheeses = () => {
    return fetch(`/api/cheese`).then(res => res.json());
}

export const getSizes = () => {
    return fetch(`/api/size`).then(res => res.json());
}