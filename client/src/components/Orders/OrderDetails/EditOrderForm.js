import RingLoader from "react-spinners/RingLoader";

export const EditOrderForm = ({ setFormOpen, setOrder, order }) => {

    return !order 
    ? <div className="spinner-div">
        <RingLoader
            color="#11b351"
            loading
            size={80}
            speedMultiplier={2}
        />
    </div>
    : (<h2>Edit Order Form</h2>)
}