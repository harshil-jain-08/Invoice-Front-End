import React, { useContext } from "react";
import Modal from "../../components/Modal";
import { Basket2Fill, SaveFill, Trash } from "react-bootstrap-icons";
import "./invoiceForm.css";
import { InvoiceContext } from "../../context/InvoiceContext";
import { useNavigate } from "react-router-dom";

const NoCustomer = ({ setShow }) => {
  return (
    <>
      <button
        type="button"
        className="bill-to"
        onClick={() => {
          setShow(1);
        }}
      >
        Bill To
      </button>
      <Modal from="customer" />
    </>
  );
};

const DisplayCustomer = ({ setShow, customer }) => {
  return (
    <>
      <div className="change-button">
        {customer ? (
          <button
            type="button"
            className="bill-to"
            onClick={() => {
              setShow(1);
            }}
          >
            Change
          </button>
        ) : (
          <button
            type="button"
            className="bill-to"
            onClick={() => {
              setShow(1);
            }}
          >
            Select
          </button>
        )}
        <Modal from="customer" />
      </div>
      <div className="customer-info">
        <p>{customer.name}</p>
        <p>{customer.phone}</p>
        <p>{customer.email}</p>
      </div>
    </>
  );
};
// eslint-disable-next-line
Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

const InvoiceForm = () => {
  let navigate = useNavigate();
  const {
    issueRef,
    billTo,
    setShow,
    show,
    dueDateRef,
    refNo,
    itemList,
    setItemList,
    notesRef,
    saveInvoice,
  } = useContext(InvoiceContext);
  const onSubmit = (e) => {
    e.preventDefault();
    saveInvoice();
    navigate(-1);
  };
  const currDate = new Date().toISOString().substring(0, 16);
  const dDate = new Date().addDays(7).toISOString().substring(0, 10);
  const handleDelete = (index) => {
    setItemList(itemList.filter((v, i) => i !== index));
  };
  var totalAmount = 0;
  return (
    <>
      <div className="info-head">
        <h1>New Invoice</h1>
        <button type="button" onClick={onSubmit}>
          <SaveFill />
          Save Invoice
        </button>
      </div>
      <div className="info-body">
        <div className="bill-head">
          <div className="select-customer">
            <label htmlFor="billTo">Bill To</label>
            <div className="bill-to-body">
              {billTo ? (
                <DisplayCustomer
                  show={show}
                  setShow={setShow}
                  customer={billTo}
                />
              ) : (
                <NoCustomer show={show} setShow={setShow} />
              )}
            </div>
          </div>
          <div className="date-area">
            <div className="input-pair">
              <label htmlFor="issue">Issue Time</label>
              <input
                type="datetime-local"
                name="issue"
                ref={issueRef}
                required
                defaultValue={currDate}
              />
            </div>
            <div className="input-pair">
              <label htmlFor="due-date">Due Date</label>
              <input
                type="date"
                name="due-date"
                ref={dueDateRef}
                required
                defaultValue={dDate}
              />
            </div>
            <div className="input-pair">
              <label htmlFor="refno">Reference No.</label>
              <input type="text" name="refno" ref={refNo} />
            </div>
          </div>
        </div>
        <div className="item-list">
          <div className="list-header">
            <h5 className="sno">S.No. </h5>
            <h5 className="items">Items</h5>
            <h5 className="oe">Quantity</h5>
            <h5 className="oe">Price</h5>
            <h5 className="oe">Amount</h5>
          </div>
          <div className="list-body">
            {itemList.map((val, idx) => {
              const onClick = (e) => {
                if (+e.target.value < 1) e.target.value = 1;
                e.target.value = +e.target.value;
                let pre = [...itemList];
                let item = { ...pre[idx] };
                item.quantity = +e.target.value;
                pre[idx] = item;
                setItemList(pre);
              };
              return (
                <div className="item-row" key={idx}>
                  <p className="sno">{idx + 1}</p>
                  <p className="items">{val.name}</p>
                  <div className="oe">
                    <input
                      type="number"
                      Value={val.quantity}
                      onChange={onClick}
                    />
                  </div>
                  <p className="oe">{val.price}</p>
                  <p className="oe">{val.price * val.quantity}</p>
                  <Trash onClick={() => handleDelete(idx)} />
                </div>
              );
            })}
            <span
              className="add-item"
              onClick={() => {
                setShow(2);
              }}
            >
              <Basket2Fill />
              Add Item
            </span>
            <Modal from="item" />
          </div>
        </div>
        <div className="bill-foot">
          <div className="input-pair">
            <label htmlFor="notes">Notes</label>
            <textarea
              type="notes"
              name="notes"
              ref={notesRef}
              rows="3"
              cols="30"
              className="notes"
            />
          </div>
          <div className="brief">
            <div className="brief-item">
              {itemList.map((val, idx) => {
                totalAmount += val.price * val.quantity;
                return (
                  <span key={idx}>
                    <p>{val.name}</p>
                    <p>x{val.quantity}</p>
                    <p>{val.price * val.quantity}</p>
                  </span>
                );
              })}
            </div>
            <span className="total">
              Total Amount <p>{totalAmount}</p>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceForm;
