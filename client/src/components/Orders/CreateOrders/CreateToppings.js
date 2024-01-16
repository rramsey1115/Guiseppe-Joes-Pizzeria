import { useEffect, useState } from "react"
import { getToppings } from "../../../managers/optionsManager";

export const CreateToppings = ({pizza, setPizza, pizzaCount}) => {
    const [toppings, setToppings] = useState([]);

    useEffect(() => {
        getAndSetToppings();
    }, []);

    const getAndSetToppings = () => {
        getToppings().then(setToppings);
    };

    const removeTopping = (id) => {
        const copy = {...pizza}
        var resArr = copy.pizzaToppings.filter(top => top.toppingId !== id);
        copy.pizzaToppings = resArr;
        setPizza(copy);
    }

    const addTopping = (id) => {
        const copy = {...pizza}
        const newTopping = toppings.filter(top => top.id === id);
        copy.pizzaToppings.push( {toppingId:newTopping[0].id} );
        setPizza(copy);
    }

    return(<>
        <h5 style={{textDecoration:'underline'}}>Toppings</h5>
        <div className="toppings-checkboxes">
            {toppings.map(t => {
                return ( 
                <div className="topping-checkbox" key={t.id}>
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
    </>)
}