import React, { useState, useEffect } from "react";

function EditItemForm(props) {
  const initialFormState = props.currentItem;
  const [item, setItem] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    props.updateItem(item.id, item);
  };

  useEffect(() => {
    setItem(props.currentItem);
  }, [props]);

  return (
    <div>
      <h2>Edit an Item</h2>
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
        <button onClick={handleFormSubmit}>Update item</button>
        <button onClick={() => props.setEditing(false)}>Cancel</button>
      </form>
    </div>
  );
}

export default EditItemForm;
