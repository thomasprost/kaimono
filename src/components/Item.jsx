import React from "react";

function Item(props) {
  const item = props.item;

  const handleRemoveItem = (event) => {
    event.preventDefault();
    props.setEditing(false);
    props.removeItem(item.id);
  };

  return (
    <li>
      {item.name} - {item.quantity} -{" "}
      <button
        className="button"
        onClick={() => {
          props.editRow(item);
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
