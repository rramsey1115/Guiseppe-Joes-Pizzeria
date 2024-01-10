export const getPizzaById = (id) => {
    return fetch(`/api/pizza/${id}`).then(res => res.json());
}