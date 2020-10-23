import React from "react";

function Item(props) {
  const item = props.item;

  const handleRemoveItem = (event) => {
    event.preventDefault();
    props.removeItem(item.id);
  };

  return (
    <li>
      {item.Name} - {item.Quantity} -{" "}
      <button
        className="button"
        onClick={() => {
          props.setEditingIndex(item.id);
        }}
      >
        Edit
      </button>
      <button className="button" onClick={handleRemoveItem}>
        Delete
      </button>
    </li>
  );
}

export default Item;
