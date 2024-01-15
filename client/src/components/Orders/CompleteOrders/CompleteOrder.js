import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../../managers/orderManager";
import RingLoader from "react-spinners/RingLoader";
import { DetailsTable } from "../OrderDetails/DetailsTable";
import { CompleteOrderForm } from "./CompleteOrderForm";
import { CompleteDetailsTable } from "../OrderDetails/CompleteDetailsTable";

export const CompleteOrder = () => {
        const id = useParams().id;
        const [order, setOrder] = useState({});
    
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
                    <CompleteDetailsTable order={order}/>
                </section>
    
                {/* form to open when button clicked - change values on left side */}
                <section className="body-right">



                <div className="hidden-div">
                    <CompleteOrderForm order={order}/>
                </div>
                
            </section>
    
            </section>
        </div>)
}