import { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import "./CreateOrder.css";
import { getCheeses, getSauces, getSizes, getToppings } from "../../../managers/optionsManager";
import { CreatePizza } from "./CreatePizza";

export const Create = ({ loggedInUser }) => {
    const [pizzaOpen, setPizzaOpen] = useState(false);
    const [newOrder, setNewOrder] = useState({
        employeeId: loggedInUser.id,
        sizeId: 0,
        sauceId: 0,
        cheeseId: 0,
        tableNumber: 0,
        delivery: false,
        address: null,
        orderPizzas: []
    });

    let pizzaCount = 0;

    return !newOrder.employeeId
    ? <div className="spinner-div">
        <RingLoader
            color="#11b351"
            loading
            size={80}
            speedMultiplier={2}
            />
    </div>
    
    :<div className="container">

        <div className="create-header"> 
            <h4>Create New Order</h4>
        </div>

        <div className="create-body">

                <form className="create-order-form">
                    <fieldset id="delivery" className="form-control create">
                        <div className="radios">
                            <h5>Type</h5>
                            <div>
                                <input 
                                    name="type" 
                                    type="radio" 
                                    onClick={() => {
                                        const copy = {...newOrder}
                                        copy.delivery = true
                                        setNewOrder(copy);
                                    }}
                                />Delivery
                            </div>
                            <div>
                                <input 
                                    name="type" 
                                    type="radio"
                                    onClick={() => {
                                        const copy = {...newOrder}
                                        copy.delivery = false;
                                        setNewOrder(copy);
                                    }}
                                />Dine-In/Take-Out
                            </div>
                        </div>
                    </fieldset>

                    {newOrder.delivery === false
                    ?<fieldset id="table" className="form-control create">
                        <h5>Table</h5>
                        <select 
                            name="table"
                            onChange={(e) => {
                                const copy = {...newOrder}
                                copy.tableNumber = e.target.value*1;
                                setNewOrder(copy);
                            }}
                        >
                            <option value={0}>Table #</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>Take-Out</option>
                        </select>
                    </fieldset>

                    :<fieldset id="address" className="form-control create">
                        <input 
                            id="address-input" 
                            className="text-input" 
                            type="text" 
                            placeholder="Delivery Address"
                            value={newOrder.address}
                            onChange={(e) => {
                                const copy = {...newOrder};
                                copy.address = e.target.value;
                                setNewOrder(copy);
                            }}
                        />          
                    </fieldset> }

                    <fieldset>
                        {pizzaOpen===false 
                        ?<button className="green-btn" onClick={(e) => {e.preventDefault(); setPizzaOpen(true)} }>Add Pizza</button>
                        :<button disabled className="green-btn" onClick={(e) => {e.preventDefault(); setPizzaOpen(true)} }>Add Pizza</button>}
                    </fieldset>

                    {/* ---------- create a new pizza -------- */}
                    {pizzaOpen===true 
                    ? <CreatePizza newOrder={newOrder} setNewOrder={setNewOrder} pizzaCount={pizzaCount}/> 
                    : null }

                </form>

        </div>
    </div>
}