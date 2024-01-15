import { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { getUserProfiles } from "../../../managers/userProfilesManager";

export const CompleteOrderForm = ({order}) => {
    const [employees, setEmployees] = useState([]);
    const [completeObj, setCompleteObj] = useState({
        id: order.id,
        driverId: 0,
        tip: 0
    });

    useEffect(() => { getAndSetEmployees() }, [])

    const getAndSetEmployees = () => {
        getUserProfiles().then(setEmployees);
    };

    return completeObj.id ? <div className="spinner-div">
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
                    <select>
                        {employees.map(e => {
                            return (
                            <option 
                                value={e.id}
                            >{`${e.firstName} ${e.lastName}`}
                            </option> )
                        })}
                    </select>
                </fieldset>
            : null}
            <fieldset className="form-control">
                <h5>Tip</h5>
                $<input  
                    type="number" 
                    step={1} 
                    min={0.00}
                    onChange={(e) => {
                        const copy = {...order};
                        copy.tip = e.target.value;
                        setCompleteObj(copy);
                    }}/>
            </fieldset>
        </form>

        <div className="complete-form-btn">
            <button className="green-btn">Complete</button>
        </div>
    </div>
}