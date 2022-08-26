import React, { useContext } from 'react'
import { Plus } from "react-bootstrap-icons";
import Table from '../../components/Table';
import { NavLink } from "react-router-dom";
import { getCustomersAPI } from '../../API';
import { useEffect } from "react";
import { AppContext } from '../../context/AppContext';


const ViewCustomer = () => {
    const { customers, setCustomers } = useContext(AppContext);
    const getData = async () => {
        const data = await getCustomersAPI();
        setCustomers(data);
    }
    useEffect(() => {
        getData()
    }, []);

    return (
        <div className="view-customer">
            <div className="info-head">
                <h2>Customers</h2>
                <NavLink to="add">
                    <button >
                        <Plus />New Customer
                    </button>
                </NavLink>
            </div>
            <div className="info-body">
                <Table data={customers} from="customer" />
            </div>
        </div>
    )
}

export default ViewCustomer;