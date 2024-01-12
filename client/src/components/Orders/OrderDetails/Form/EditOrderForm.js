import RingLoader from "react-spinners/RingLoader";
import "./EditOrderForm.css";
import { useState } from "react";

export const EditOrderForm = ({ setFormOpen, setOrder, order }) => {
    const [delivery, setDelivery] = useState(order?.delivery);

    return !order 
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
        <fieldset className="form-control">
                <h5>Type</h5>
                <div className="radios">
                    <input 
                        name="type" 
                        type="radio" 
                        defaultChecked={order.delivery ? true : false }
                        onSelect={() => setDelivery(true)}
                    />Delivery
                    <input 
                        defaultChecked={order.delivery ? false : true }
                        name="type" 
                        type="radio"
                        onSelect={() => setDelivery(false)}
                    />Dine-In/Take-Out
                </div>
        </fieldset>
        <fieldset className="form-control">
            <label>Address
                <input type="text"/>
            </label>
        </fieldset>
    </form>)
}