import React, { useContext } from "react";
import { getCustomersAPI, getItemsAPI } from "../API";
import { AppContext } from "../context/AppContext";
import { InvoiceContext } from "../context/InvoiceContext";
import "./modal.css";
import Table from "./Table";

const Modal = () => {
  const { customers, setCustomers, items, setItems } = useContext(AppContext);
  const { show, setShow, setBillTo, itemList, setItemList } =
    useContext(InvoiceContext);
  if (show === 0) {
    return null;
  }

  var data = [];
  if (show === 1) {
    if (customers.length === 0) {
      (async () => {
        const data = await getCustomersAPI();
        setCustomers(data);
      })();
    }
    data = customers;
  } else if (show === 2) {
    if (items.length === 0) {
      (async () => {
        const data = await getItemsAPI();
        setItems(data);
      })();
    }
    data = items;
  }
  function getIndex(value, arr, prop) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  }
  const setter = async (row) => {
    if (show === 1) setBillTo(row);
    else if (show === 2) {
      const idx = getIndex(row.id, itemList, "id");
      if (idx === -1) {
        setItemList([...itemList, { ...row, quantity: 1 }]);
      } else {
        let pre = [...itemList].slice();
        let same = pre[idx];
        same.quantity = same.quantity + 1;
        pre[idx] = same;
        setItemList(pre);
      }
    }
  };

  return (
    <div
      className="modal"
      onClick={() => {
        setShow(0);
      }}
    >
      <div
        className="modal-content"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="modal-header">
          <h4>Select Customer</h4>
        </div>
        <div className="modal-body">
          <Table data={data} from="selector" setter={setter} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
