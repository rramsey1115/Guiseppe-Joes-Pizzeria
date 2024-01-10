import { CurrentOrders } from "./CurrentOrders";
import "./OrdersList.css";
import { PastOrders } from "./PastOrders";

export const OrdersList = () => {
    return(
    <div className="container">
        <div className="header">
            <h2>Orders</h2>
        </div>
        <div className="body">
            <div className="current-orders">
                <div className="table-header">
                    <h4>Current Orders</h4>
                </div>
                <CurrentOrders />
            </div>
            <div className="past-orders">
                <div className="table-header">
                    <h4>Past Orders</h4>
                </div>
                <PastOrders />
            </div>
        </div>
    </div>)
}