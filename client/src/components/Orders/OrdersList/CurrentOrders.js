import { useEffect, useState } from "react"
import { Table } from "reactstrap"
import { getAllOrders, removeOrder } from "../../../managers/orderManager";
import { useNavigate } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";

export const CurrentOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => { getAndSetCurrentOrders() }, []);

    const getAndSetCurrentOrders = () => {
        getAllOrders().then((res) => {
            const filtered = res.filter(r => r.completedOnDate == null);
            setOrders(filtered);
        });
    };

    const getFormattedDate = (dateString) => {
        const date = new Date(dateString); // {object Date}
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();
        if (dd < 10) dd = "0" + dd;
        if (mm < 10) mm = "0" + mm;
        const formatted = mm + "/" + dd + "/" + yyyy;
        return formatted;
    };

    const getFormattedTime = (dateStr) => {
        const date = new Date(dateStr);
        let hh = date.getHours();
        let mm = date.getMinutes();
        if(mm < 10) {mm = `0${mm}`};
        if(hh >= 12) {return (`${hh - 12}:${mm} PM`)};
        if (hh < 12) {return (`${hh}:${mm} AM`)};
    };

    const navigate = useNavigate();
    
    return !orders 
    ? <div className="spinner-div">
        <RingLoader
        color="#11b351"
        loading
        size={80}
        speedMultiplier={2}
        />
        </div> 
    : (
        <Table>
            <thead>
                <tr>
                    <th>Placed On</th>
                    <th>Time</th>
                    <th>Type</th>
                    <th>Total</th>
                    <th>Details</th>
                    <th>Complete</th>
                    <th>Cancel</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(o => {
                    return(<tr key={o.id}>
                        <td>{getFormattedDate(o.placedOnDate)}</td>
                        <td>{getFormattedTime(o.placedOnDate)}</td>
                        <td>{o.delivery===true ? "Delivery" : o.tableNumber !== 10 ? "Dine-In" : "Take-Out" }</td>
                        <td>{`$${o.totalCost.toFixed(2)}`}</td>
                        <td>
                            <button 
                                className="light-btn" 
                                value={o.id} 
                                onClick={(e) => navigate(`details/${e.target.value}`)}
                                >Details
                            </button>
                        </td>
                        <td>
                            <button 
                                className="green-btn" 
                                value={o.id}
                                onClick={(e) => navigate(`complete/${e.target.value}`)}
                                >Complete
                            </button>
                        </td>
                        <td>
                            <button 
                                className="red-btn"
                                value={o.id}
                                onClick={(e) => {removeOrder(e.target.value*1).then(() => getAndSetCurrentOrders())}}
                                >Cancel
                            </button>
                        </td>
                    </tr>)
                })}
            </tbody>
        </Table>
    )
}