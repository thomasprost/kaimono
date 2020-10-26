import React from "react";
import { useMutation, useQueryCache } from "react-query";

const deleteItem = async (id) => {
  const settings = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  try {
    const fetchResponse = await fetch(
      `http://localhost:1337/shopping-items/${id}`,
      settings
    );
    const data = await fetchResponse.json();
    return data;
  } catch (e) {
    return e;
  }
};

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
