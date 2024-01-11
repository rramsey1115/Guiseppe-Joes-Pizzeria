import { useEffect, useState } from "react"
import { getOrderById } from "../../../managers/orderManager";
import { useParams } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader"
import "./OrderDetails.css";

export const OrderDetails = () => {
    const id = useParams().id;
    const [order, setOrder] = useState({});

    useEffect(() => { 
        if(id) {
            getAndSetOrderById(id) 
        }
    }, [id])

    const getAndSetOrderById = (orderId) => {
        getOrderById(orderId * 1).then(setOrder);
    }
    
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
                <table>
                    <thead>
                        
                    </thead>
                </table>
            </section>

            {/* form to open when button clicked - change values on left side */}
            <section className="body-right">
                
            </section>

        </section>
    </div>)
}