import { useEffect, useState } from "react"
import { getOrderById } from "../../../managers/orderManager";
import { useParams } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader"
import "./OrderDetails.css";
import { DetailsTable } from "./DetailsTable";
import { EditOrderForm } from "./EditOrderForm";

export const OrderDetails = () => {
    const id = useParams().id;
    const [order, setOrder] = useState({});
    const [formOpen, setFormOpen] = useState(false);

    useEffect(() => {  if(id){getAndSetOrderById(id)} }, [id]);

    const getAndSetOrderById = (orderId) => { getOrderById(orderId * 1).then(setOrder) };
    
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
    <div className="container">
        {console.log('order', order)}
        <section className="body">

            {/* table for order details to update with form on right side */}
            <section className="body-left"> 
                <DetailsTable order={order}/>
            </section>

            {/* form to open when button clicked - change values on left side */}
            <section className="body-right">
                <EditOrderForm setFormOpen={setFormOpen} setOrder={setOrder} order={order}/>
            </section>

        </section>
    </div>)
}