import { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { getUserProfiles } from "../../../managers/userProfilesManager";
import { completeOrder } from "../../../managers/orderManager";
import { useNavigate } from "react-router-dom";
import "./CompleteOrders.css";

export const CompleteOrderForm = ({order}) => {
    const [employees, setEmployees] = useState([]);
    const [completeObj, setCompleteObj] = useState({});

    useEffect(() => {
        if(order) {
            const copy = {...order}
            setCompleteObj(copy)
        }
    }, [order])

    useEffect(() => { getAndSetEmployees() }, [])

    const getAndSetEmployees = () => {
        getUserProfiles().then(setEmployees);
    };

    const navigate = useNavigate();

    return !completeObj.id ? <div className="spinner-div">
    <RingLoader
        color="#11b351"
        loading
        size={80}
        speedMultiplier={2}
        />
     </div>

    : <div className="complete">
        <div className="complete-header"> 
            <h4>Complete Order Form</h4>
        </div>
        <form className="complete-form">
            {order.delivery === true 
            ?   <fieldset className="form-control">
                    <h5>Delivery Driver</h5>
                    <select 
                        id="driver-dropdown"
                        onChange={(e) => {
                            const copy = {...completeObj};
                            copy.driverId = e.target.value*1;
                            setCompleteObj(copy)
                        }}>
                            <option value={0} className="driver-option">Drivers</option>
                        {employees.map(e => {
                            return (
                            <option 
                                className="driver-option"
                                key={e.id}
                                value={e.id}
                            >{`${e.firstName} ${e.lastName}`}
                            </option> )
                        })}
                    </select>
                </fieldset>
            : null}
            <fieldset className="form-control">
                <h5>Tip</h5> <h5>$
                <input  
                    className="tip-input"
                    type="number" 
                    step={.01} 
                    min={0.00}
                    placeholder="0.00"
                    onChange={(e) => {
                        const copy = {...completeObj};
                        copy.tip = e.target.value*1;
                        setCompleteObj(copy);
                    }}/></h5>
            </fieldset>
        </form>

        <div className="complete-form-btn-div">
            <button 
                id="complete-form-btn"
                className="green-btn"
                onClick={(e) => {
                    completeOrder(completeObj.id, completeObj).then(() => navigate('/orders'))
                }}
                >Complete
            </button>
        </div>
    </div>
}