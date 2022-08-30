import React, { useRef, useState } from "react";
import { SaveFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { addItemAPI } from "../../API";
import "../form.css";

const AddItem = () => {
  const nameRef = useRef("");
  const priceRef = useRef("");
  const descriptionRef = useRef("");
  let navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const newItem = {
      id: 0,
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      price: +priceRef.current.value,
      added: 0,
    };
    addItemAPI(newItem);
    navigate("/items");
  };
  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div>
      <div className="info-head">
        <h2>New Item</h2>
      </div>
      <form onSubmit={onSubmit}>
        <div className="input-pair">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            ref={nameRef}
            required
            pattern="\b\w{1,20}\b"
            focused={focused.toString()}
          />
          <span>Name should be minimum 4-24 characters long.</span>
        </div>
        <div className="input-pair">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            ref={priceRef}
            required
            pattern="[1-9]{1}[0-9]{0,}"
            onBlur={handleFocus}
            focused={focused.toString()}
          />
          <span>Price should only contain numbers.</span>
        </div>
        <div className="input-pair">
          <label htmlFor="description">Description</label>
          <textarea
            type="description"
            name="description"
            ref={descriptionRef}
            required
            focused={focused.toString()}
            rows="3"
          />
        </div>

        <div className="input-pair">
          <button type="submit">
            <SaveFill />
            Save Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
