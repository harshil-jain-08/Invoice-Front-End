import React, { useContext, useRef, useState } from "react";
import { SaveFill } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";
import { EditItemAPI, getItemsAPI } from "../../API";
import { AppContext } from "../../context/AppContext";
import "../form.css";

const EditItem = () => {
  const { id } = useParams();
  const { items, setItems } = useContext(AppContext);
  const item = items.find((obj) => {
    return obj.id === +id;
  });
  const nameRef = useRef(item.name);
  const priceRef = useRef(item.price);
  const descriptionRef = useRef(item.description);
  let navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const newItem = {
      id: +id,
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      price: +priceRef.current.value,
    };
    EditItemAPI(newItem);
    const data = await getItemsAPI();
    setItems(data);
    navigate("/items");
  };
  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div>
      <div className="info-head">
        <h2>Edit Item</h2>
        <h3>ID : {id}</h3>
      </div>
      <form onSubmit={onSubmit}>
        <div className="input-pair">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            ref={nameRef}
            required
            defaultValue={item.name}
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
            defaultValue={item.price}
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
            defaultValue={item.description}
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

export default EditItem;
