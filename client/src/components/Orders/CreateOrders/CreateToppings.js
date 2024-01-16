import { useEffect, useState } from "react"
import { getPizzaToppings, getToppings } from "../../../managers/optionsManager";

export const CreateToppings = ({pizza, setPizza, pizzaCount}) => {
    const [toppings, setToppings] = useState([]);

    useEffect(() => {
        getAndSetToppings();
        // getAndSetPizzaToppings();
    }, [pizzaCount]);

    const getAndSetToppings = () => {
        getToppings().then(setToppings);
    };

    // const getAndSetPizzaToppings = () => {
    //     getPizzaToppings().then(setPizzaToppings);
    // };

    const removeTopping = (id) => {
        const copy = {...pizza}
        var resArr = copy.pizzaToppings.filter(top => top.toppingId !== id);
        copy.pizzaToppings = resArr;
        setPizza(copy);
    }

    const addTopping = (tId) => {
        const copy = {...pizza}
        const newTopping = toppings.filter(top => top.id === tId);
        copy.pizzaToppings.push(newTopping);
        setPizza(copy);
    }

    return(
        <div className="toppings-checkboxes">
            <p>Toppings</p>
            {toppings.map(t => {
                return ( 
                <div key={t.id}>
                    <input
                        type="checkbox"
                        value={t.id}
                        onChange={(e) => {
                            e.target.checked !== true 
                            ? removeTopping(e.target.value*1) 
                            : addTopping(e.target.value*1)}}
                    /> {t.name}
                </div> )
            })}
        </div>
    )
}