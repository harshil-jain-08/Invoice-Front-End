import React, { useRef, useState } from "react";
import { SaveFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { addCustomerAPI } from "../../API";
import "../form.css";

const AddCustomer = () => {
  const nameRef = useRef("");
  const phoneRef = useRef("");
  const emailRef = useRef("");
  let navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const newCustomer = {
      id: 0,
      name: nameRef.current.value,
      phone: phoneRef.current.value,
      email: emailRef.current.value,
      created: 0,
    };
    addCustomerAPI(newCustomer);
    navigate(-1);
  };
  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div>
      <div className="info-head">
        <h2>New Customer</h2>
      </div>
      <form onSubmit={onSubmit}>
        <div className="input-pair">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            ref={nameRef}
            required
            pattern="[a-zA-Z][a-zA-Z0-9-_ ]{3,23}"
            focused={focused.toString()}
          />
          <span>
            Name should be minimum 4-24 characters long and not contain special
            characters.
          </span>
        </div>
        <div className="input-pair">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            ref={emailRef}
            required
            focused={focused.toString()}
          />
          <span>It should be a valid email address.</span>
        </div>
        <div className="input-pair">
          <label htmlFor="phone">Phone no.</label>
          <input
            type="text"
            name="phone"
            ref={phoneRef}
            required
            pattern="[1-9]{1}[0-9]{9}"
            onBlur={handleFocus}
            focused={focused.toString()}
          />
          <span>
            Phone number should be 10 digit long and only contain numbers.
          </span>
        </div>
        <div className="input-pair">
          <button type="submit">
            <SaveFill />
            Save Customer
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;
