import { useEffect, useState } from "react"
import { getCheeses, getSauces, getSizes, getToppings } from "../../../managers/optionsManager";

export const EditPizza = ({ index, pizza, setUpdatedObj, updatedObj }) => {
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
    <div>

        <div className="edit-size">
            <div>Size</div>
            <select onChange={(e) => {
                        const copy = {...updatedObj}
                        copy.orderPizzas[index].sizeId = e.target.value*1;
                        copy.orderPizzas[index].size = sizes.find(s => s.id === e.target.value*1)
                        setUpdatedObj(copy);
                    }}
                    value={updatedObj.orderPizzas[index].sizeId}
                    name="size"
                    >
                {sizes.map(s => { return( 
                    <option 
                        key={s.id} 
                        value={s.id}
                        name="size"
                    >{s.name} 
                </option>  )
                })}
            </select>
        </div>

        <div className="edit-cheese">
            <div>Cheese</div>
            <select onChange={(e) => {
                        const copy = {...updatedObj}
                        copy.orderPizzas[index].cheeseId = e.target.value*1;
                        copy.orderPizzas[index].cheese = cheeses.find(c => c.id === e.target.value*1)
                        setUpdatedObj(copy);
                    }}
                    value={updatedObj.orderPizzas[index].sauceId}
                    name="cheese"
                    >
                {cheeses.map(c => { return( 
                    <option 
                        key={c.id} 
                        value={c.id}
                        name="cheese"
                    >{c.name} 
                </option>  )
                })}
            </select>
        </div>

        <div className="edit-sauce">
            <div>Sauce</div>
            <select onChange={(e) => {
                        const copy = {...updatedObj}
                        copy.orderPizzas[index].sauceId = e.target.value*1;
                        copy.orderPizzas[index].sauce = sauces.find(sauce => sauce.id === e.target.value*1)
                        setUpdatedObj(copy);
                    }}
                    value={updatedObj.orderPizzas[index].sauceId}
                    name="sauce"
                    >
                {sauces.map(s => { return( 
                    <option 
                        key={s.id}
                        value={s.id}
                        name="sauce"
                        >{s.name} 
                </option> )
                })}
            </select>
        </div>
    </div>)
}