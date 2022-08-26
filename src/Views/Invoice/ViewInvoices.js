import React, { useContext, useEffect } from "react";
import { Plus } from "react-bootstrap-icons";
import Table from "../../components/Table";
import { NavLink } from "react-router-dom";
import { getInvoicesAPI } from "../../API";
import { AppContext } from "../../context/AppContext";

const ViewInvoices = () => {
  const { invoices, setInvoices } = useContext(AppContext);

  const getData = async () => {
    const data = await getInvoicesAPI();
    setInvoices(data);
  }
  useEffect(() => {
    getData()
  }, []);


  return (
    <div className="view-invoice">
      <div className="info-head">
        <h2>Invoices</h2>
        <NavLink to="/invoice/add">
          <button>
            <Plus />New Invoice
          </button>
        </NavLink>
      </div>
      <div className="info-body">
        <Table data={invoices} from="invoices" />
      </div>
    </div>
  )
}

export default ViewInvoices;