import RingLoader from "react-spinners/RingLoader";
import "./EditOrderForm.css";
import { useEffect } from "react";

export const EditOrderForm = ({ setFormOpen, setOrder, order, setUpdatedObj, updatedObj }) => {

    useEffect(() => {if(order.delivery)
        {
            updatedObj.delivery = order.delivery;
            updatedObj.address = order.address;
            
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
        <fieldset className="form-control">
            <h5>Table</h5>
            <select onSelect={(e) => {
                const copy = {...updatedObj}
                copy.tableNumber = e.target.value;
                setUpdatedObj(copy)
            }}>
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
 


    </form>)
}