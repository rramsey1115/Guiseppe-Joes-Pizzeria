import { useNavigate } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";
import delivery from "../../../images/delivery.png";
import dineIn from "../../../images/dine-in-img.png";
import "./CreateOrder.css";

export const ChooseOrderType = ({ loggedInUser }) => {
    const navigate = useNavigate();

    return(loggedInUser.name ? <div className="spinner-div">
    <RingLoader
        color="#11b351"
        loading
        size={80}
        speedMultiplier={2}
    />
    </div>

    : <div className="container">
        <section className="choose-order-body">
            <div className="choose-side">
                <h4 id="choose-heading">Dine-In/Take-Out</h4>
                <img className="choose-type-img" alt="dine-in" src={dineIn}/>
                <button 
                    className="green-btn" 
                    id="home-btn" onClick={(e) => navigate('/create/dinein')}
                    >New Dine-In Order
                </button>
            </div>
            <div className="choose-side">
                <h4 id="choose-heading">Delivery</h4>
                <img className="choose-type-img" alt="delivery" src={delivery}/>
                <button 
                    className="green-btn" 
                    id="home-btn"
                    onClick={(e) => navigate('/create/delivery')}
                    >New Delivery Order
                </button>
            </div>
        </section>
    </div>)

}