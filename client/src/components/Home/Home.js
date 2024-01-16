import "./Home.css";
import homeLogo from "../../images/Guiseppe_Joes_Logo.png";
import { useNavigate } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";

export const Home = ({loggedInUser}) => {
    const navigate = useNavigate();

    return(loggedInUser.name ? <div className="spinner-div">
    <RingLoader
        color="#11b351"
        loading
        size={80}
        speedMultiplier={2}
    />
</div>:
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
                    <button className="green-btn" id="home-btn" onClick={(e) => navigate('create')}>New Order</button>
                </div>
            </section>
        </div>
    </div>)
}