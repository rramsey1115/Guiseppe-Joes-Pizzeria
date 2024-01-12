import { useEffect, useState } from "react"
import { getCheeses, getSauces, getSizes, getToppings } from "../../../managers/optionsManager";

export const EditPizza = ({ pizza, setUpdatedObj, updatedObj }) => {
    const [sauces, setSauces] = useState([]);
    const [cheeses, setCheeses] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [toppings, setToppings] = useState([]);

    useEffect(() => {
        getToppings().then(setToppings);
        getSauces().then(setSauces);
        getSizes().then(setSizes);
        getCheeses().then(setCheeses);
    }, []);

    return(
        <div className="edit-pizza">
            
        </div>
    )
}