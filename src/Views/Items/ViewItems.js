import React, { useContext, useEffect } from "react";
import { Plus } from "react-bootstrap-icons";
import Table from "../../components/Table";
import { NavLink } from "react-router-dom";
import { getItemsAPI } from "../../API";
import { AppContext } from "../../context/AppContext";

const ViewItems = () => {
    const { items, setItems } = useContext(AppContext);
    const getData = async () => {
        const data = await getItemsAPI();
        setItems(data);
    }
    useEffect(() => {
        getData()
    }, []);


    return (
        <div className="view-item">
            <div className="info-head">
                <h2>Items</h2>
                <NavLink to="add">
                    <button>
                        <Plus />New Item
                    </button>
                </NavLink>
            </div>
            <div className="info-body">
                <Table data={items} from="items" />
            </div>
        </div>
    )
}

export default ViewItems;