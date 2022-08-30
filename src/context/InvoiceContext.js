import React, { createContext, useState, useRef } from "react";
import { addInvoiceAPI, EditInvoiceAPI, getInvoiceByIdAPI } from "../API";

export const InvoiceContext = createContext();
export const InvoiceProvider = (props) => {
  const [billTo, setBillTo] = useState();
  const issueRef = useRef();
  const dueDateRef = useRef();
  const notesRef = useRef();
  const refNo = useRef();
  const [show, setShow] = useState(0);
  const [itemList, setItemList] = useState([]);
  // const { invoices } = useContext(AppContext)

  const list = itemList.map((val) => {
    return {
      item_id: val.id,
      item_quantity: val.quantity,
    };
  });

  const saveInvoice = () => {
    var data = {
      due_date: +new Date(dueDateRef.current.value),
      issued_date: +new Date(issueRef.current.value),
      ref_no: refNo.current.value,
      customer_id: billTo.id,
      invoice_items: list,
      notes: notesRef.current.value,
    };
    addInvoiceAPI(data);
    setBillTo();
    setItemList([]);
  };

  const changeStat = async (idx, amount) => {
    let pre = await getInvoiceByIdAPI(idx);
    if (pre["paid_status"] === "Issued") {
      if (
        window.confirm(
          `Recieve payment for invoice Id:${pre.id} for amount ${amount}?`
        ) === true
      ) {
        pre["amount"] = amount;
        pre["paid_status"] = "Paid";
        EditInvoiceAPI(pre);
      }
    } else {
      if (
        window.confirm(`Change payment for invoice Id:${pre.id} to Issued?`) ===
        true
      ) {
        pre["amount"] = amount;
        pre["paid_status"] = "Issued";
        pre["due"] = amount;
        EditInvoiceAPI(pre);
      }
    }
  };

  return (
    <InvoiceContext.Provider
      value={{
        billTo: billTo,
        issueRef: issueRef,
        show: show,
        dueDateRef: dueDateRef,
        refNo: refNo,
        itemList: itemList,
        notesRef: notesRef,
        setShow,
        setBillTo,
        setItemList,
        saveInvoice,
        changeStat,
      }}
    >
      {props.children}
    </InvoiceContext.Provider>
  );
};
