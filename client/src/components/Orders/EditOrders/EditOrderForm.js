import RingLoader from "react-spinners/RingLoader";
import "./EditOrderForm.css";
import { useEffect } from "react";
import { EditPizza } from "./EditPizza";

export const EditOrderForm = ({ setFormOpen, setOrder, order, setUpdatedObj, updatedObj }) => {
    let pizzaCount = 0;
    useEffect(() => {if(order.delivery)
        {
            updatedObj.delivery = order.delivery;
            updatedObj.address = order.address;
            updatedObj.tableNumber = order.tableNumber*1;
        }
    }, [order]);

    return !updatedObj
    ? <div className="spinner-div">
        <RingLoader
            color="#11b351"
            loading
            size={80}
            speedMultiplier={2}
            />
    </div>
    : (
    <form autoComplete="true" className="edit-details-form">

        {/* ---------------------------------- change order type radio buttons ------------------------- */}
        {updatedObj.delivery === true 
        ? 
        <><fieldset className="form-control">
            <h5>Type</h5>
            <div className="radios">
                <div>
                    <input 
                        name="type" 
                        type="radio" 
                        defaultChecked
                        onClick={() => {
                            const copy = {...updatedObj}
                            copy.delivery = true
                            setUpdatedObj(copy);
                        }}
                    />Delivery
                </div>
                <div>
                    <input 
                        name="type" 
                        type="radio"
                        onClick={() => {
                            const copy = {...updatedObj}
                            copy.delivery = false;
                            setUpdatedObj(copy);
                        }}
                    />Dine-In/Take-Out
                </div>
            </div>
        </fieldset>

        {/* ---------------------------------- Change Address if order is delivery ------------------------------------- */}
        <fieldset className="form-control">
                <label>Address
                    <input 
                        type="text" 
                        value={updatedObj?.address}
                        onChange={(e) => {
                        const copy = {...updatedObj}
                        copy.address = e.target.value
                        setUpdatedObj(copy);
                    }}/>
                </label>
        </fieldset></>

        :<><fieldset className="form-control">
            <h5>Type</h5>
            <div className="radios">
                <div>
                    <input 
                    name="type" 
                    type="radio" 
                    onClick={() => {
                        const copy = {...updatedObj}
                        copy.delivery = true;
                        setUpdatedObj(copy);
                    }}
                    />Delivery
                </div>
                <div>
                    <input 
                        name="type" 
                        type="radio" 
                        defaultChecked
                        onClick={() => {
                            const copy = {...updatedObj}
                            copy.delivery = true;
                            setUpdatedObj(copy);
                        }}
                    />Dine-In/Take-Out
                </div>
            </div>
        </fieldset>

        {/* ------------------------- change table if order is dine-in/take-out ------------------------- */}
        <fieldset className="form-control">
            <h5>Table</h5>
            <select 
                onChange={(e) => {
                    const copy = {...updatedObj}
                    copy.tableNumber = e.target.value*1;
                    setUpdatedObj(copy);
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
        </>}

        {/* --------------- import the pizza editor for each pizza in the order -------------------------------- */}
        {updatedObj.orderPizzas?.map(pizza => {
            pizzaCount++;
            return (
                <fieldset key={pizza.id} className="form-control">
                <h5>Pizza {pizzaCount}</h5>
                    <EditPizza index={pizzaCount - 1} pizza={pizza} updatedObj={updatedObj} setUpdatedObj={setUpdatedObj}/>
                </fieldset>
            )
        })}
 

    </form>)
}