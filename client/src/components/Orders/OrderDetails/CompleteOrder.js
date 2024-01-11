import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../../managers/orderManager";
import RingLoader from "react-spinners/RingLoader";
import { DetailsTable } from "./DetailsTable";
import { CompleteOrderForm } from "./CompleteOrderForm";

export const CompleteOrder = () => {
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
            <section className="details-body">
    
                {/* table for order details to update with form on right side */}
                <section className="body-left"> 
                    <DetailsTable order={order}/>
                </section>
    
                {/* form to open when button clicked - change values on left side */}
                <section className="body-right">
                    <CompleteOrderForm setFormOpen={setFormOpen} setOrder={setOrder} order={order}/>
                </section>
    
            </section>
        </div>)
}