import { useEffect, useState } from "react";
import { getCheeses, getSauces, getSizes } from "../../../managers/optionsManager";
import { CreateToppings } from "./CreateToppings";

export const CreatePizza = ({ newOrder, setNewOrder, pizzaCount, setPizzaOpen }) => {
    const [cheeses, setCheeses] = useState([]);
    const [sauces, setSauces] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [pizza, setPizza] = useState({
        sizeId: 0,
        cheeseId: 0,
        sauceId: 0,
        pizzaToppings: []
    });

    useEffect(() => {
        getCheeses().then(setCheeses);
        getSauces().then(setSauces);
        getSizes().then(setSizes);
    }, []);

return (
<>
    <fieldset id="size" className="form-control create">
        <h5>Size</h5>
        <select 
            value={pizza.sizeId}
            name="size"
            onChange={(e) => {
                const copy = {...pizza}
                copy.sizeId = e.target.value*1;
                setPizza(copy);
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
        <h5>Sauce</h5>
        <select 
            value={pizza.sauceId}
            name="sauce"
            onChange={(e) => {
                const copy = {...pizza}
                copy.sauceId = e.target.value*1;
                setPizza(copy);
            }}>
                <option name="sauce" value={0}>Pizza Sauce</option>
            {sauces.map(s => { return( 
                <option 
                    key={s.id}
                    value={s.id}
                    name="sauce"
                    >{s.name} 
            </option> )
            })}
        </select>
    </fieldset>

    <fieldset id="cheese" className="form-control create">
        <h5>Cheese</h5>
        <select 
            onChange={(e) => {
                const copy = {...pizza}
                copy.cheeseId = e.target.value*1;
                setPizza(copy);
            }}
            value={pizza.cheeseId}
            name="cheese"
            >
                <option name="size" value={0}>Pizza Cheese</option>
        {cheeses.map(c => { return( 
            <option 
                key={c.id} 
                value={c.id}
                name="cheese"
            >{c.name} 
        </option>  )
        })}
        </select>
    </fieldset>

    <fieldset id="toppings" className="form-control create">
            <CreateToppings pizza={pizza} setPizza={setPizza} pizzaCount={pizzaCount} />
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
            id="discard-btn"
            className="red-btn" 
            onClick={(e) => {
                e.preventDefault();
                setPizza({
                    sizeId: 0,
                    cheeseId: 0,
                    sauceId: 0,
                    toppings: []
                });
                setPizzaOpen(false);
            }}
            >Discard PIzza
        </button>}
    </fieldset>

    {/* generate submit button once all fields have a value */}
    {newOrder.orderPizzas.length > 0 ? <button className="green-btn">Submit Order</button> : <button disabled className="green-btn">Submit Order</button> }

</>)
}