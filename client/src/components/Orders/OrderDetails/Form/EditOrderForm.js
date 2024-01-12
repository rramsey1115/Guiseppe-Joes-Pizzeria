import RingLoader from "react-spinners/RingLoader";
import "./EditOrderForm.css";
import { useEffect, useState } from "react";

export const EditOrderForm = ({ setFormOpen, setOrder, order }) => {
    const [updatedObj, setUpdatedObj] = useState({
        delivery: order.delivery,
    });

    const refreshOrder = () => {
        setOrder(updatedObj);
    }

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
        {console.log('order', order)}
        {console.log('del', order.delivery)}
        <fieldset className="form-control">
                <h5>Type</h5>
                <div className="radios">
                    {order.delivery===true 
                        ? <div>
                            <input 
                                name="type" 
                                type="radio" 
                                defaultChecked
                                onClick={() => {
                                    const copy = {...updatedObj}
                                    copy.delivery = true
                                    setUpdatedObj(copy).then(() => refreshOrder());
                                }}
                            />Delivery
                        </div>
                        : <div>
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
                    }
                    {order.delivery === false 
                    ? <div>
                        <input 
                            name="type" 
                            type="radio"
                            defaultChecked
                            onClick={() => {
                                const copy = {...updatedObj}
                                copy.delivery = false;
                                setUpdatedObj(copy);
                            }}
                        />Dine-In/Take-Out
                    </div>
                    : <div>
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
                    }
                </div>
        </fieldset>
        <fieldset className="form-control">
            <label>Address
                <input type="text"/>
            </label>
        </fieldset>
    </form>)
}