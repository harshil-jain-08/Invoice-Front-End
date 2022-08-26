import React, { useContext, useRef, useState } from "react";
import { SaveFill } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";
import { EditCustomerAPI, getCustomersAPI } from "../../API";
import { AppContext } from "../../context/AppContext";
import "../form.css"


const EditCustomer = () => {
  const { id } = useParams();
  const { customers, setCustomers } = useContext(AppContext);
  const Customer = customers.find(obj => {

    return obj.id === +id;
  });
  const nameRef = useRef(Customer.name);
  const emailRef = useRef(Customer.email);
  const phoneRef = useRef(Customer.phone);
  let navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const newCustomer = {
      id: +id,
      name: nameRef.current.value,
      phone: phoneRef.current.value,
      email: emailRef.current.value,
    }
    EditCustomerAPI(newCustomer);
    const data = await getCustomersAPI();
    setCustomers(data);
    navigate("/customer");
  }
  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    setFocused(true)
  }



  return (
    <div>
      <div className="info-head">
        <h2>Edit Customer</h2>
        <h3>ID : {id}</h3>
      </div>
      <form onSubmit={onSubmit}>
        <div className="input-pair">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" ref={nameRef} required defaultValue={nameRef.current}
            pattern="[a-zA-Z][a-zA-Z0-9-_ ]{3,23}" focused={focused.toString()} />
          <span>Name should be minimum 4-24 characters long and not contain special characters.</span>
        </div>
        <div className="input-pair">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" ref={emailRef} required defaultValue={emailRef.current}
            focused={focused.toString()} />
          <span>It should be a valid email address.</span>
        </div>
        <div className="input-pair">
          <label htmlFor="phone">Phone no.</label>
          <input type="text" name="phone" ref={phoneRef} required defaultValue={phoneRef.current}
            pattern="[1-9]{1}[0-9]{9}" onBlur={handleFocus} focused={focused.toString()} />
          <span>Phone number should be 10 digit long and only contain numbers.</span>
        </div>
        <div className="input-pair">
          <button type="submit"><SaveFill />Save Customer</button>
        </div>

      </form>
    </div>
  );

}

export default EditCustomer