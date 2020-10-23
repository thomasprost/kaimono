import React from "react";
import Item from "./Item";

function ShoppingList(props) {
  return (
    <div id="item-list">
      <h2>Shopping List :</h2>
      <div id="item-list">
        {props.list
          ? props.list.map((item) => {
              return (
                <Item
                  key={item.id}
                  item={item}
                  removeItem={props.removeItem}
                  setEditingIndex={props.setEditingIndex}
                ></Item>
              );
            })
          : "Empty list"}
      </div>
    </div>
  );
}

export default ShoppingList;
