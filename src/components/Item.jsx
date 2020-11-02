import React from "react";
import { useMutation, useQueryCache } from "react-query";
import { deleteItem } from "../Queries.js";

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
      <div className="flex-row">
        <div className="flex-large three-fourths">
          {item.Name} - {item.Quantity} -{item.Info}
        </div>
        <div className="flex-large one-fourths actions">
          <button
            onClick={() => {
              props.setEditingIndex(item.id);
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="css-i6dzq1"
            >
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
          </button>
          <button onClick={handleRemoveItem}>
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="css-i6dzq1"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
}

export default Item;
