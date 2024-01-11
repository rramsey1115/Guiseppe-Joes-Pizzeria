import { useEffect, useState } from "react";
import { Spinner, Table } from "reactstrap"
import { getAllOrders } from "../../../managers/orderManager";

export const PastOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => { getAndSetCurrentOrders() }, []);

    const getAndSetCurrentOrders = () => {
        getAllOrders().then((res) => {
            const filtered = res.filter(r => r.completedOnDate !== null);
            setOrders(filtered);
        });
    }

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
        if(hh >= 12) {return (`${hh - 11}:${mm} PM`)};
        if (hh < 12) {return (`${hh}:${mm} AM`)};
    }
    
    return !orders ? <Spinner/> : (
        <Table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Type</th>
                    <th>Paid</th>
                    <th>Placed On</th>
                    <th>Time</th>
                    <th>Details</th>
                    <th>Completed On</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(o => {
                    return(<tr key={o.id}>
                        <td>{o.id}</td>
                        <td>{o.delivery===true ? "Delivery" : o.tableNumber !== 10 ? "Dine-In" : "Take-Out" }</td>
                        <td>{`$${o.totalCost.toFixed(2)}`}</td>
                        <td>{getFormattedDate(o.placedOnDate)}</td>
                        <td>{getFormattedTime(o.placedOnDate)}</td>
                        <td><button className="light-btn">Details</button></td>
                        <td>{getFormattedDate(o.completedOnDate)}</td>
                        <td>{getFormattedTime(o.completedOnDate)}</td>
                    </tr>)
                })}
            </tbody>
        </Table>
    )
}