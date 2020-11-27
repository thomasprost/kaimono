import React from "react";
import Item from "./Item";
import { useQuery } from "react-query";
import { BoardMessagesLoader } from "./ItemLoader";
import { fetchShoppingItems } from "../Queries";

function ShoppingList(props) {
  const { status, data, error, refetch } = useQuery(
    "shopping",
    fetchShoppingItems
  );

  return (
    <div id="items-list">
      {status === "loading" ? (
        <BoardMessagesLoader />
      ) : status === "error" ? (
        <span>
          Error: {error.message}
          <br />
          <button onClick={() => refetch()}>Retry</button>
        </span>
      ) : (
        <ul>
          {data && data.length > 0
            ? data.map((item) => {
                return (
                  <Item
                    key={item.id}
                    item={item}
                    setEditingIndex={props.setEditingIndex}
                  ></Item>
                );
              })
            : "Nothing to buy"}
        </ul>
      )}
    </div>
  );
}

export default ShoppingList;
