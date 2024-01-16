import { useEffect, useState } from "react"
import { getPizzaToppings, getToppings } from "../../../managers/optionsManager";

export const EditToppings = ({index, updatedObj, setUpdatedObj}) => {
    const [toppings, setToppings] = useState([]);
    const [pizzaToppings, setPizzaToppings] = useState([]);
    const idCount = 0;

    useEffect(() => {
        getAndSetToppings();
        getAndSetPizzaToppings();
    }, [index]);

    const getAndSetToppings = () => {
        getToppings().then(setToppings);
    }

    const getAndSetPizzaToppings = () => {
        getPizzaToppings().then(setPizzaToppings);
    }

    const removeTopping = (id) => {
        const copy = {...updatedObj}
        var resArr = copy.orderPizzas[index].pizzaToppings.filter(top => top.toppingId !== id);
        copy.orderPizzas[index].pizzaToppings = resArr;
        setUpdatedObj(copy);
    }

    const addTopping = (tId) => {
        const copy = {...updatedObj}
        const newTopping = toppings.filter(top => top.id === tId)
        const newPT = { pizzaId:copy.orderPizzas[index].id, toppingId:tId, topping:newTopping[0] }
        copy.orderPizzas[index].pizzaToppings.push(newPT);
        setUpdatedObj(copy);
    }


    return(<>
        <h5 style={{marginTop:12}}>Toppings</h5>
        <div className="toppings-checkboxes">
            {toppings.map(t => {
                const arr = updatedObj.orderPizzas[index].pizzaToppings.filter(top => top.toppingId === t.id);
                return ( 
                <div key={t.id} className="topping-checkbox">
                    <input
                        type="checkbox"
                        defaultChecked={ arr.length > 0 ? true : false }
                        value={t.id}
                        onChange={(e) => e.target.checked !== true ? removeTopping(e.target.value*1) : addTopping(e.target.value*1)}
                    /> {t.name}
                </div> )
            })}
        </div>
    </>)
}