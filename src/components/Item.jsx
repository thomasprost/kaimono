import React from "react";
import { useMutation, useQueryCache } from "react-query";
import {deleteItem} from "../Queries.js"

function Item(props) {
  const cache = useQueryCache();
  const item = props.item;

  const handleRemoveItem = (event) => {
    event.preventDefault();
    mutate(item.id);
    props.setEditingIndex(null);
  };

  const [mutate, { status, error }] = useMutation(deleteItem, {
    onSuccess: () => {
      cache.invalidateQueries("shopping");
    },
  });

  return (
    <li>
      {item.Name} - {item.Quantity} -{item.Info}
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
