import "./Home.css";
import homeLogo from "../../images/Guiseppe_Joes_Logo.png";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();

    return(
    <div className="container">
        <div className="body">
            <section className="home-img-container">
                <h1>Guiseppe Joe's</h1>
                <img id="home-logo" alt="logo" src={homeLogo}/>
                <h2>Est. 1978</h2>
            </section>
            <section className="home-btn-container">
                <div className="btn-div">
                    <button className="green-btn" id="home-btn" onClick={(e) => navigate('orders')}>View Orders</button>
                </div>
                <div className="btn-div">
                    <button className="green-btn" id="home-btn" onClick={(e) => navigate('create/dinein')}>New Dine-In Order</button>
                </div>
                <div className="btn-div">
                    <button className="green-btn" id="home-btn" onClick={(e) => navigate('create/delivery')}>New Delivery Order</button>
                </div>
            </section>
        </div>
    </div>)
}