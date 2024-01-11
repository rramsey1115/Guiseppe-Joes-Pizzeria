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
    
    return order 
    ? <div className="spinner-div"><RingLoader
    color="#11b351"
    loading
    size={80}
    speedMultiplier={2}
  /></div>
    : (
    <div className="container">
        {console.log('order', order)}
        <section className="body">

            <section className="body-left">

            </section>

            <section className="body-right">
                
            </section>

        </section>
    </div>)
}