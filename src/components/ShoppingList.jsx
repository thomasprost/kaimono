import React from "react";
import Item from "./Item";

const ShoppingList = (props) => (
  <div id="item-list">
    <h2>Shopping List :</h2>
    <div id="item-list">
      {props.list.length > 0
        ? props.list.map((item) => {
            return (
              <Item
                key={item.id}
                item={item}
                removeItem={props.removeItem}
                editRow={props.editRow}
                setEditing={props.setEditing}
              ></Item>
            );
          })
        : "Empty list"}
    </div>
  </div>
);

export default ShoppingList;
