import { useEffect, useState } from "react";
import { getCheeses, getSauces, getSizes, getToppings } from "../../../managers/optionsManager";

export const CreatePizza = ({ newOrder, setNewOrder, pizzaCount }) => {
    const [cheeses, setCheeses] = useState([]);
    const [sauces, setSauces] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [toppings, setToppings] = useState([]);

    useEffect(() => {
        getCheeses(setCheeses);
        getSauces(setSauces);
        getSizes(setSizes);
        getToppings(setToppings);
    }, []);

return (
<>
    <fieldset id="size" className="form-control create">
        <h5>Size</h5>
        <select 
            onChange={(e) => {
                const copy = {...newOrder}
                copy.orderPizzas[pizzaCount].sizeId = e.target.value*1;
                copy.orderPizzas[pizzaCount].size = sizes.find(s => s.id === e.target.value*1)
                setNewOrder(copy);
            }}
            value={newOrder.orderPizzas[pizzaCount]?.sizeId}
            name="size"
        >
            <option value={0}>Pizza Size</option>
        {sizes.map(s => { return( 
            <option 
                key={s.id} 
                value={s.id}
                name="size"
            >{s.name} 
        </option>  )
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

</>)
}