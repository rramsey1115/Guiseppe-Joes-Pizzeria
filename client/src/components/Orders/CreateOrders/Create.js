import { useState } from "react";
import { RingLoader } from "react-spinners";
import "./CreateOrder.css";
import { CreatePizza } from "./CreatePizza";
import { useNavigate } from "react-router-dom";
import { postNewOrder } from "../../../managers/orderManager";

export const Create = ({ loggedInUser }) => {
    const [pizzaOpen, setPizzaOpen] = useState(false);
    const [newOrder, setNewOrder] = useState({
        employeeId: loggedInUser.id,
        tableNumber: 0,
        delivery: null,
        address: null,
        orderPizzas: []
    });

    let pizzaCount = 0;

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        postNewOrder(newOrder).then(() => navigate('/orders'))
    }


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

                    
                    {/* shows more options after choosing deliver or dine-in/take-out */}
                    {newOrder.delivery == null ? null : 
                    newOrder.delivery === false
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
                        <h5>Delivery Address</h5>
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

                    
                    {newOrder.orderPizzas.length === 0 ? null
                    :<fieldset>
                        {newOrder.orderPizzas.map(pizza => {
                            pizzaCount++;
                            return ( <div key={pizzaCount}>
                                <h5>
                                    {
                                        `Pizza ${pizzaCount}: 
                                        ${pizza.sizeId === 1 ? 'Small' : pizza.sizeId === 2 ? 'Medium' : 'Large'}
                                        ${pizza.pizzaToppings.length} Topping`
                                    }
                                </h5>
                            </div>)
                        })}
                    </fieldset>
                    }


                    {/* add pizza button opens CreatePizza form */}
                    <fieldset>
                        {(newOrder.tableNumber > 0 || newOrder.address?.length > 3) && (pizzaOpen===false)
                        ?<button 
                            id="add-pizza-btn" 
                            className="green-btn" 
                            onClick={(e) => {e.preventDefault(); setPizzaOpen(true)} }
                            >Add Pizza
                        </button>
                        :<button 
                            hidden 
                            disabled
                            id="hidden-add-pizza-btn" 
                            className="green-btn" 
                            >Add Pizza
                        </button>}
                    </fieldset>

                    {/* ---------- create a new pizza -------- */}
                    {pizzaOpen===true 
                    ?<CreatePizza 
                        newOrder={newOrder} 
                        setNewOrder={setNewOrder} 
                        pizzaCount={pizzaCount} 
                        setPizzaOpen={setPizzaOpen}
                    /> 
                    :null }

                {/* generate enabled once all fields have a value */}
                <fieldset>
                    {newOrder.orderPizzas.length > 0 
                        ? <button 
                            id="create-submit"
                            className="green-btn"
                            onClick={(e) => handleSubmit(e)}
                            >Submit Order
                        </button> 
                        : <button 
                            disabled 
                            id="create-submit-disabled"
                            className="green-btn"
                            >Submit Order
                        </button> 
                    }
                    {/* cancel button always visible to exit form at any time */}
                    <button
                        id="create-cancel-btn"
                        className="red-btn"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('/');
                        }}
                        >Cancel
                    </button>
                </fieldset>

                </form>

        </div>
    </div>
}