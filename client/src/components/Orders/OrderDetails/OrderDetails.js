import { useEffect, useState } from "react"
import { getOrderById } from "../../../managers/orderManager";
import { useParams } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader"
import "./OrderDetails.css";
import { DetailsTable } from "./DetailsTable";
import { EditOrderForm } from "./Form/EditOrderForm";

export const OrderDetails = () => {
    const id = useParams().id;
    const [order, setOrder] = useState({});
    const [formOpen, setFormOpen] = useState(false);
    const [updatedObj, setUpdatedObj] = useState({});

    useEffect(() => {  if(id){getAndSetOrderById(id)} }, [id]);

    useEffect(() => {setUpdatedObj({...order})}, [order]);

    const getAndSetOrderById = (orderId) => { getOrderById(orderId * 1).then(setOrder) };
    
    return !updatedObj 
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

        <section className="details-body">

                {/* table for order details to update with form on right side */}
            <section className="body-left"> 
                <DetailsTable order={order} updatedObj={updatedObj}/>
            </section>

                {/* form to open when button clicked - change values on left side */}
            <section className="body-right">

                <div className="body-right-btn">
                    {order.completedOnDate === null 
                    ?<div>
                        <button 
                            id="edit-form-btn"
                            className="light-btn"
                            onClick={() => setFormOpen(!formOpen)}
                            >Edit Order
                        </button> 
                        <button
                            id="edit-form-btn"
                            className="green-btn"
                            >Complete Order
                        </button>
                    </div>
                    : <h4>Order Complete</h4>}
                </div>

                <div className="hidden-div" hidden={formOpen ? false : true }>
                    <EditOrderForm setFormOpen={setFormOpen} setOrder={setOrder} order={order} updatedObj={updatedObj} setUpdatedObj={setUpdatedObj}/>
                </div>

            </section>

        </section>
    </div>)
}