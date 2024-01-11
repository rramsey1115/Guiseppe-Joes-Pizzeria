import RingLoader from "react-spinners/RingLoader";
import { Table } from "reactstrap";

export const DetailsTable = ({ order }) => {

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
    }
    let pizzaCount = 0;
    return !order.orderPizzas 
    ? <div className="spinner-div">
        <RingLoader
            color="#11b351"
            loading
            size={80}
            speedMultiplier={2}
        />
    </div>
    : (
    <div className="details">
        <header className="details-header">
            <h4>Order No. {order.id}</h4>
        </header>
        <Table id="details-table">
            <tbody>
                <tr>
                    <th>Date</th>
                    <td>
                        {getFormattedDate(order.placedOnDate)}{"    "}
                        {getFormattedTime(order.placedOnDate)}
                    </td>
                </tr>
                <tr>
                    <th>Employee</th>
                    <td>{`${order.employee.firstName} ${order.employee.lastName}`}</td>
                </tr>
                <tr>
                    <th>Complete</th>
                    {order.completedOnDate ? <td>Yes</td> : <td style={{color:'red'}}>No</td>}
                </tr>  
                <tr>
                    <th>Type</th>
                    {/* shows Deliver, Dine-In, or Take-Out based on delivery and table number */}
                    {order.delivery 
                    ? <td>Delivery</td> 
                    : order.tableNumber === 10 ? <td>Take-Out</td> : <td>Dine-In</td>}
                </tr>
                {/* shows delivery address and driver OR table number */}
                {order.delivery 
                ? <><tr>
                        <th>Address</th>
                        <td>{order.address}</td>
                    </tr> 
                    <tr>
                        <th>Driver</th>
                        <td>{`${order.driverId}. ${order.driver.firstName} ${order.driver.lastName}`}</td>
                    </tr>
                    </>
                : <tr>
                        <th>Table</th>
                        <td>{order.tableNumber}</td>
                    </tr>}
                {/* map over orderpizzas and make row for each pizza with all info about pizza */}
                {order.orderPizzas.map(p => {
                    pizzaCount++;
                    return (
                        <tr key={p.id}>
                            <th>{`Pizza ${pizzaCount}`}</th>
                            <td>
                                {p.size.name}<br/>
                                {p.cheese.name}<br/>
                                {p.sauce.name}<br/>
                                <span style={{textDecoration:"underline"}}>Toppings</span> <br/>
                                {p.pizzaToppings?.length > 0 
                                ? p.pizzaToppings?.map(t => {
                                    return <div key={t.id}>{" - "}{t.topping.name}<br/></div>
                                }) : " - None"}
                            </td>
                        </tr>
                    )
                })}
                <tr>
                    <th>Total</th>
                    <td>{`$${order.totalCost.toFixed(2)}`}</td>
                </tr>
            </tbody>
        </Table>
    </div>)
}