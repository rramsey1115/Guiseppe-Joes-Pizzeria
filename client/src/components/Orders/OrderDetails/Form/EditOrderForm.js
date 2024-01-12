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
    : (
    <form className="edit-details-form">
        <fieldset>
            <label>Type
                <input type="text"/>
            </label>
            <label>Address
                <input type="text"/>
            </label>
            <label>Driver
                <input type="text"/>
            </label>
            <label>
                <input type="text"/>
            </label>
            <label>
                <input type="text"/>
            </label>
        </fieldset>
    </form>)
}