import { useEffect, useState } from "react";
import { getCheeses, getSauces, getSizes, getToppings } from "../../../managers/optionsManager";

export const CreatePizza = ({ newOrder, setNewOrder, pizzaCount, setPizzaOpen }) => {
    const [cheeses, setCheeses] = useState([]);
    const [sauces, setSauces] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [toppings, setToppings] = useState([]);
    const [pizza, setPizza] = useState({
        sizeId: 0,
        cheeseId: 0,
        sauceId: 0,
        toppings: []
    });

    useEffect(() => {
        getCheeses().then(setCheeses);
        getSauces().then(setSauces);
        getSizes().then(setSizes);
        getToppings().then(setToppings);
    }, []);

return (
<>
    <fieldset id="size" className="form-control create">
        <h5>Size</h5>
        <select 
            value={newOrder.orderPizzas[pizzaCount]?.sizeId}
            name="size"
            onChange={(e) => {
                const copy = {...newOrder}
                copy.pizza.sizeId = e.target.value*1;
                setNewOrder(copy);
            }}
        >
            <option name="size" value={0}>Pizza Size</option>
            {sizes?.map(s => { return ( 
                <option 
                    key={s.id} 
                    value={s.id}
                    name="size"
                >{s.name} 
            </option> )
            })}
        </select>
    </fieldset>

    <fieldset id="sauce" className="form-control create">
            
    </fieldset>

    <fieldset id="cheese" className="form-control create">
            
    </fieldset>

    <fieldset id="toppings" className="form-control create">
            
    </fieldset>

    <fieldset id="total" className="form-control create">
        
    </fieldset>

    <fieldset>
        {pizza.cheeseId && 
        pizza.sizeId && 
        pizza.sizeId 
        ? <button 
            id="add-to-order-btn"
            className="green-btn" 
            onClick={(e) => {
                e.preventDefault(); 
                const copy = {...newOrder};
                copy.orderPizzas.push(pizza);
                setNewOrder(copy);
                setPizzaOpen(false);
            }}>Add To Order
        </button>
        :<button 
            id="add-to-order-btn"
            className="green-btn" 
            disabled
            >Add To Order
        </button>}
    </fieldset>

</>)
}