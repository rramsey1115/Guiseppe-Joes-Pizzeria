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
    <fieldset id="size" className="create">
        <h5>Pizza Size
        <select 
            className="create-dropdown"
            value={pizza.sizeId}
            name="size"
            onChange={(e) => {
                const copy = {...pizza}
                copy.sizeId = e.target.value*1;
                setPizza(copy);
            }}
        >
            <option name="size" value={0}>Sizes</option>
            {sizes?.map(s => { return ( 
                <option 
                    key={s.id} 
                    value={s.id}
                    name="size"
                >{s.name} 
            </option> )
            })}
        </select></h5>
    </fieldset>

    <fieldset id="sauce" className="create">
        <h5>Pizza Sauce
        <select 
            className="create-dropdown"
            value={pizza.sauceId}
            name="sauce"
            onChange={(e) => {
                const copy = {...pizza}
                copy.sauceId = e.target.value*1;
                setPizza(copy);
            }}>
                <option name="sauce" value={0}>Sauces</option>
            {sauces.map(s => { return( 
                <option 
                    key={s.id}
                    value={s.id}
                    name="sauce"
                    >{s.name} 
            </option> )
            })}
        </select></h5>
    </fieldset>

    <fieldset id="cheese" className="create">
        <h5>Pizza Cheese
        <select 
            className="create-dropdown"
            onChange={(e) => {
                const copy = {...pizza}
                copy.cheeseId = e.target.value*1;
                setPizza(copy);
            }}
            value={pizza.cheeseId}
            name="cheese"
            >
                <option name="size" value={0}>Cheeses</option>
        {cheeses.map(c => { return( 
            <option 
                key={c.id} 
                value={c.id}
                name="cheese"
            >{c.name} 
        </option>  )
        })}
        </select></h5>
    </fieldset>

    <fieldset id="toppings" className="create">
            <CreateToppings pizza={pizza} setPizza={setPizza} pizzaCount={pizzaCount} />
    </fieldset>

    <fieldset className="create">
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
            >Discard Pizza
        </button>}
    </fieldset>

</>)
}