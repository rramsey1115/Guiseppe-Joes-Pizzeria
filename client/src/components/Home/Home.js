import { Button } from "reactstrap"
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
                    <Button className="home-btn" color="success" onClick={(e) => navigate('orders')}>View Orders</Button>
                </div>
                <div className="btn-div">
                    <Button className="home-btn" color="success" onClick={(e) => navigate('create/dinein')}>New Dine-In Order</Button>
                </div>
                <div className="btn-div">
                    <Button className="home-btn" color="success" onClick={(e) => navigate('create/delivery')}>New Delivery Order</Button>
                </div>
            </section>
        </div>
    </div>)
}