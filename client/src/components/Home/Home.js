import "./Home.css";
import homeLogo from "../../images/Guiseppe_Joes_Logo.png";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();

    return(
    <div className="container">
        <div className="header">
            <h1>Home</h1>
        </div>
        <div className="body">
            <section className="home-img-container">
                <img id="home-logo" alt="logo" src={homeLogo}/>
            </section>
            <section className="home-btn-container">
                <div className="btn-div">
                    <button className="btn green-btn home-btn" onClick={(e) => navigate('orders')}>View Orders</button>
                </div>
                <div className="btn-div">
                    <button className="btn green-btn home-btn" onClick={(e) => navigate('create/dinein')}>New Dine-In Order</button>
                </div>
                <div className="btn-div">
                    <button className="btn green-btn home-btn" onClick={(e) => navigate('create/delivery')}>New Delivery Order</button>
                </div>
            </section>
        </div>
    </div>)
}