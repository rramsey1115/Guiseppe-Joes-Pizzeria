import { CurrentOrders } from "./CurrentOrders";
import "./OrdersList.css";
import { PastOrders } from "./PastOrders";

export const OrdersList = () => {
    return(
    <div className="container">
        <div className="header">
            <h2>Orders List</h2>
        </div>
        <div className="body">
            <div className="current-orders">
                <div className="header">
                    <h4>Current Orders</h4>
                </div>
                <CurrentOrders />
            </div>
            <div className="current-orders">
                <div className="header">
                    <h4>Past Orders</h4>
                </div>
                <PastOrders />
            </div>
        </div>
    </div>)
}