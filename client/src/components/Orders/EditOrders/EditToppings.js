import { useEffect, useState } from "react"
import { getToppings } from "../../../managers/optionsManager";

export const EditToppings = ({index, updatedObj, setUpdatedObj}) => {
    const [toppings, setToppings] = useState([]);

    useEffect(() => {
        getAndSetToppings();
    }, [index]);

    const getAndSetToppings = () => {
        getToppings().then(setToppings);
    }

    const removeTopping = (toppingId) => {
        console.log(`Removed toppingId ${toppingId}`)
    }

    const addTopping = (toppingId) => {
        console.log(`added toppingId ${toppingId}`)
    }


    return(
        <div className="toppings-checkboxes">
            <p>Toppings</p>
            {toppings.map(t => {
                const arr = updatedObj.orderPizzas[index].pizzaToppings.filter(top => top.toppingId === t.id);
                return ( 
                <div key={t.id}>
                    <input
                        type="checkbox"
                        defaultChecked={ arr.length > 0 ? true : false }
                        value={t.id}
                        onChange={(e) => e.target.checked !== true ? removeTopping(e.target.value*1) : addTopping(e.target.value*1)}
                    /> {t.name}
                </div> )
            })}
        </div>
    )
}