import { Button } from "reactstrap"
import "./Home.css";
import homeLogo from "../../images/Guiseppe_Joes_Logo.png";

export const Home = () => {
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
                    <Button className="home-btn" color="success">View Orders</Button>
                </div>
                <div className="btn-div">
                    <Button className="home-btn" color="success">New Dine-In Order</Button>
                </div>
                <div className="btn-div">
                    <Button className="home-btn" color="success">New Delivery Order</Button>
                </div>
            </section>
        </div>
    </div>)
}