import React from "react";
import Item from "./Item";
import { useQuery } from "react-query";

const fetchShoppingItems = async () => {
  const res = await fetch("http://localhost:1337/shopping-items");

  return res.json();
};

function ShoppingList(props) {
  const { status, data, error, refetch } = useQuery(
    "shopping",
    fetchShoppingItems
  );

  return (
    <div id="items-list">
      {status === "loading" ? (
        <span>Loading...</span>
      ) : status === "error" ? (
        <span>
          Error: {error.message}
          <br />
          <button onClick={() => refetch()}>Retry</button>
        </span>
      ) : (
        <ul>
          {data
            ? data.map((item) => {
                return (
                  <Item
                    key={item.id}
                    item={item}
                    setEditingIndex={props.setEditingIndex}
                  ></Item>
                );
              })
            : "Empty list"}
        </ul>
      )}
    </div>
  );
}

export default ShoppingList;
