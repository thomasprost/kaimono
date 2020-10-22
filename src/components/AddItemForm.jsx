import React, { useState } from "react";

function AddItemForm(props) {
  const initialFormState = { id: null, name: "", quantity: "", info: "" };
  const [item, setItem] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    props.addItem(item);
    setItem(initialFormState);
  };

  return (
    <div>
      <h2>Add an Item</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={item.name}
          onChange={handleInputChange}
        />
        <label>Quantity</label>
        <input
          type="text"
          name="quantity"
          value={item.quantity}
          onChange={handleInputChange}
        />
        <label>Info</label>
        <input
          type="text"
          name="info"
          value={item.info}
          onChange={handleInputChange}
        />
        <button onClick={handleFormSubmit}>Add item</button>
      </form>
    </div>
  );
}

export default AddItemForm;
