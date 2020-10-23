import React, { useState, useEffect } from "react";

function EditItemForm(props) {
  const [item, setItem] = useState();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    props.updateItem(props.editingIndex, item);
    props.setEditingIndex(null);
  };

  useEffect(() => {
    setItem(props.data.filter((i) => i.id === props.editingIndex)[0]);
  }, []);

  return (
    <div>
      <h2>Edit an Item</h2>
      {item && (
        <form onSubmit={handleFormSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="Name"
            value={item.Name}
            onChange={handleInputChange}
          />
          <label>Quantity</label>
          <input
            type="text"
            name="Quantity"
            value={item.Quantity}
            onChange={handleInputChange}
          />
          <label>Info</label>
          <input
            type="text"
            name="Info"
            value={item.Info}
            onChange={handleInputChange}
          />
          <button onClick={handleFormSubmit}>Update item</button>
          <button onClick={() => props.setEditingIndex(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
}

export default EditItemForm;
